import React, { useMemo, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getTooltipPosition } from '../helpers/graph';
import { useCo2ColorScale } from '../hooks/theme';
import { useCurrentZoneHistory } from '../hooks/redux';

import MapCountryTooltip from './tooltips/mapcountrytooltip';
import AreaGraph from './graph/areagraph';
import { getSpeciesNumber } from '../helpers/zonedata';

const prepareGraphData = (historyData, co2ColorScale, electricityMixMode) => {
  if (!historyData || !historyData[0] || historyData.every((d) => !d.isValid)) {
    // Incomplete data
    return {};
  }

  const data = historyData.map((d) => ({
    carbonIntensity: getSpeciesNumber(d, electricityMixMode),
    datetime: new Date(d.stateDatetime),
    // Keep a pointer to original data
    meta: d,
  }));
  const layerKeys = ['carbonIntensity'];
  const layerFill = (key) => (d) => co2ColorScale(d.data[key]);
  return { data, layerKeys, layerFill };
};

const mapStateToProps = (state) => ({
  electricityMixMode: state.application.electricityMixMode,
  isMobile: state.application.isMobile,
});

// this is where data is not manipulated
const CountryHistorySpeciesGraph = ({ electricityMixMode, isMobile }) => {
  const [tooltip, setTooltip] = useState(null);
  const co2ColorScale = useCo2ColorScale();
  const historyData = useCurrentZoneHistory();
  // Recalculate graph data only when the history data is changed
  const { data, layerKeys, layerFill } = useMemo(
    () => prepareGraphData(historyData, co2ColorScale, electricityMixMode),
    [historyData, co2ColorScale, electricityMixMode]
  );
  useEffect(() => {
    console.log(historyData);
  }, )
  
  // Graph marker callbacks
  const markerUpdateHandler = useMemo(
    () => (position, datapoint) => {
      setTooltip({
        position: getTooltipPosition(isMobile, position),
        zoneData: datapoint.meta,
      });
    },
    [setTooltip, isMobile]
  );
  const markerHideHandler = useMemo(
    () => () => {
      setTooltip(null);
    },
    [setTooltip]
  );

  return (
    <React.Fragment>
      <AreaGraph
        testId="history-carbon-graph"
        data={data}
        layerKeys={layerKeys}
        layerFill={layerFill}
        valueAxisLabel="Species"
        markerUpdateHandler={markerUpdateHandler}
        markerHideHandler={markerHideHandler}
        isMobile={isMobile}
        height="8em"
      />
      {tooltip && (
        <MapCountryTooltip
          position={tooltip.position}
          zoneData={tooltip.zoneData}
          onClose={() => {
            setTooltip(null);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(CountryHistorySpeciesGraph);

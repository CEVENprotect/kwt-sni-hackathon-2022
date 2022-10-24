import React from 'react';
import { connect } from 'react-redux';

import { useTranslation } from '../../helpers/translation';
import styled from 'styled-components';

import CircularGauge from '../circulargauge';
import CarbonIntensitySquare from '../carbonintensitysquare';
import Tooltip from '../tooltip';
import { ZoneName } from './common';
import TooltipTimeDisplay from './tooltiptimedisplay';

const mapStateToProps = (state) => ({
  electricityMixMode: state.application.electricityMixMode,
});

const CountryTableHeaderInner = styled.div`
  display: flex;
  flex-basis: 33.3%;
  justify-content: space-between;
`;

const StyledTooltipTimeDisplay = styled(TooltipTimeDisplay)`
  margin-bottom: 5px;
  font-weight: ${(props) => (props.isZoneNameDisplayed ? '500' : '600')};
`;

const TooltipContent = React.memo(
  ({ isDataDelayed, hasParser, numberOfSpecies, treeOfLifeCoveredPercentage, endemicRatioPercentage }) => {
    const { __ } = useTranslation();
    if (!hasParser) {
      return (
        <div className="no-parser-text">
          <span
            dangerouslySetInnerHTML={{
              __html: __(
                'tooltips.noParserInfo',
                'https://github.com/tmrowco/electricitymap-contrib/wiki/Getting-started'
              ),
            }}
          />
        </div>
      );
    }
    if (!numberOfSpecies) {
      if (isDataDelayed) {
        return <div className="temporary-outage-text">{__('tooltips.dataIsDelayed')}</div>;
      }
      return <div className="temporary-outage-text">{__('tooltips.temporaryDataOutage')}</div>;
    }
    return (
      <div className="zone-details">
        <CountryTableHeaderInner>
          <CarbonIntensitySquare value={numberOfSpecies} />
          <div className="country-col country-lowcarbon-wrap">
            <div id="tooltip-country-lowcarbon-gauge" className="country-gauge-wrap">
              <CircularGauge percentage={treeOfLifeCoveredPercentage} />
            </div>
            <div className="country-col-headline">{__('country-panel.treeOfLifeCovered')}</div>
            <div className="country-col-subtext" />
          </div>
          <div className="country-col country-renewable-wrap">
            <div id="tooltip-country-renewable-gauge" className="country-gauge-wrap">
              <CircularGauge percentage={endemicRatioPercentage} />
            </div>
            <div className="country-col-headline">{__('country-panel.endemic')}</div>
          </div>
        </CountryTableHeaderInner>
      </div>
    );
  }
);

const MapCountryTooltip = ({ electricityMixMode, position, zoneData, onClose, isZoneNameDisplayed }) => {
  if (!zoneData) {
    return null;
  }

  const isDataDelayed = zoneData.delays && zoneData.delays.production;

  const numberOfSpecies = zoneData.numberOfSpecies;

  const treeOfLifeCovered = zoneData.treeOfLifeCovered;
  const treeOfLifeCoveredPercentage = treeOfLifeCovered !== null ? Math.round(100 * (1 - treeOfLifeCovered)) : '?';

  const endemicRatio = zoneData.endemicRatio;
  const endemicRatioPercentage = endemicRatio !== null ? Math.round(100 * endemicRatio) : '?';

  return (
    <Tooltip id="country-tooltip" position={position} onClose={onClose}>
      <div className="zone-name-header">
        {isZoneNameDisplayed && <ZoneName zone={zoneData.countryCode} />}
        <StyledTooltipTimeDisplay date={zoneData.stateDatetime} isZoneNameDisplayed={isZoneNameDisplayed} />
      </div>
      <TooltipContent
        hasParser={zoneData.hasParser}
        isDataDelayed={isDataDelayed}
        numberOfSpecies={numberOfSpecies}
        treeOfLifeCoveredPercentage={treeOfLifeCoveredPercentage}
        endemicRatioPercentage={endemicRatioPercentage}
      />
    </Tooltip>
  );
};

export default connect(mapStateToProps)(MapCountryTooltip);

import { useTable } from 'react-table'
import React, {useEffect, useMemo} from 'react'
import { connect } from 'react-redux';
import { useCurrentZoneHistory } from '../../../hooks/redux';

const mapStateToProps = (state) => ({
  electricityMixMode: state.application.electricityMixMode,
  isMobile: state.application.isMobile,
  zoneTimeIndex: state.application.selectedZoneTimeIndex,
});

const prepareData = (historyData) => {
  if (!historyData) return {};
  return historyData;
}

function CountrySpeciesTable({ electricityMixMode, isMobile, zoneTimeIndex }) {
  const historyData = useCurrentZoneHistory();
  const data = useMemo(() => prepareData(historyData), [historyData, zoneTimeIndex]);  
  
  const mapKeysToHeader = () => {
    if (!data[zoneTimeIndex]) return [{Header: 'Column 1', accessor: 'col1'},{Header: 'Column 2',accessor: 'col2'}];
    if (!data[zoneTimeIndex]["discoveredSpecies"]) return [{Header: 'Column 1', accessor: 'col1'},{Header: 'Column 2',accessor: 'col2'}];
    var headers = [];
    const headerTitles = Object.keys(data[zoneTimeIndex]["discoveredSpecies"][0]);
    for (var headerTitle in headerTitles) {
      
      if (["Family", "Species", "Number of Sequences", "Average of % of identical matches"].includes(headerTitles[headerTitle])){
        var colHeader = {}
        colHeader.Header = headerTitles[headerTitle]
        colHeader.accessor = headerTitles[headerTitle];
        headers.push(colHeader);
      }
    }
    
    return headers;
  }

  const createEmptyRow = () => {
    return [
      {
        col1: 'example',
        col2: 'example',
      },
      {
        col1: 'example',
        col2: 'example',
      },
      {
        col1: 'example',
        col2: 'example',
      },]
  }

  const mapDataToRows = () => {
    if (!data[zoneTimeIndex]) return createEmptyRow();
    if (!data[zoneTimeIndex]["discoveredSpecies"]) return createEmptyRow();

    return data[zoneTimeIndex]["discoveredSpecies"];
  }
  
  const tableData = React.useMemo(
    () => {
      const result = mapDataToRows();
      if (result) return result
      return []
    }, [historyData, zoneTimeIndex]
  )

  const columns = React.useMemo(
    () => {
      const result = mapKeysToHeader();
      if (result) return result
      return []
    }, [historyData, zoneTimeIndex]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData })

  if (!columns || !tableData) return (<div></div>)

  return (
    <table {...getTableProps()} style={{ /*border: 'solid 1px black' */}}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  // marginTop: '20px',
                  // borderBottom: 'solid 3px red',
                  // background: 'aliceblue',
                  // color: 'black',
                  // fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      // padding: '10px',
                      // border: 'solid 1px gray',
                      // background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default connect(mapStateToProps)(CountrySpeciesTable);
import React, {useMemo} from 'react'
import {useTable,usePagination} from 'react-table'
import './Table.scss'
import {Button} from '../../components';

function Table({input, COLUMNS}) {
  const columns = useMemo(() => COLUMNS, [COLUMNS]);
  const data = useMemo(() => input, [input])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow,
  } = useTable({
    columns,
    data
 },
 usePagination
)
 const {pageIndex} = state
  return (
    <div className='table__container'>
    
    <table {...getTableProps()}>
      <thead> 
        {
          headerGroups.map((headerGroup, index) =>(
            <tr key={index} {...headerGroup.getHeaderGroupProps()} className="table__head">
              {headerGroup.headers.map((column, index) =>(
                 <th key={index} {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
          </tr>
          ))
        }

      </thead>
      <tbody {...getTableBodyProps}>
      {page.map((row , index) => {
            prepareRow(row)
            return(
              <tr key={index} {...row.getRowProps()}>
                  {row.cells.map((cell, index) =>{
                    return <td key= {index} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
            </tr>
            )})}
      </tbody>
      </table>
      <div className="btn__container">
          <Button  Pagefunction={previousPage}  disabled={!canPreviousPage} value= '&#8249;'/>
          <Button   Pagefunction={nextPage}  disabled={!canNextPage} value= '&#8250;'/>
         
          
            <span className="btn__jump">
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length} 
              </strong>
          </span>
      </div>
    
    </div>
  )
}

export default Table
import React, { useState } from 'react';
import { useTable, usePagination } from 'react-table';

interface IDataItem {
  name: string;
  age: number;
  address: string;
  organization: string;
  userType: string;
  status: string; // Assuming 'status' represents the active status (online, offline, suspended)
}

const TableComponent: React.FC<{ columns: any[]; data: IDataItem[] }> = ({ columns, data }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'offline':
        return 'bg-red-500';
      case 'suspended':
        return 'bg-gray-500';
      default:
        return '';
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    gotoPage,
    state: { pageIndex },
  } = useTable({ columns, data, initialState: { pageIndex: 0 } }, usePagination);

  const [selectedPage, setSelectedPage] = useState(pageIndex);

  const handlePageChange = (newPageIndex: number) => {
    const adjustedPageIndex = Math.min(Math.max(newPageIndex, 0), pageCount - 1);
    setSelectedPage(adjustedPageIndex);
    gotoPage(adjustedPageIndex);
  };

  const getVisiblePages = () => {
    const visiblePages: number[] = [];
    for (let i = pageIndex - 2; i <= pageIndex + 2; i++) {
      if (i >= 0 && i < pageCount) {
        visiblePages.push(i);
      }
    }
    return visiblePages;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${getStatusColor(
                        cell.value
                      )}`}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="mr-2">
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageCount}
              </strong>{' '}
            </span>
            <span className="mr-2">|</span>
            <span className="mr-2">Go to page:</span>
            <select
              value={selectedPage + 1}
              onChange={(e) => handlePageChange(Number(e.target.value) - 1)}
              className="px-2 py-1 border border-gray-300 rounded-md"
            >
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              onClick={() => handlePageChange(pageIndex - 1)}
              disabled={!canPreviousPage}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm mr-2"
            >
              {'<'}
            </button>
            {getVisiblePages().map((pageNumber) => (
              <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 text-sm font-medium ${
                pageNumber === selectedPage
                  ? 'bg-black text-white font-bold'
                  : 'text-gray-700 bg-white border border-gray-300'
              } rounded-md shadow-sm mr-2`}
            >
              {pageNumber + 1}
            </button>
            
            ))}
            <button
              onClick={() => handlePageChange(pageIndex + 1)}
              disabled={!canNextPage}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;

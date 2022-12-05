import { t } from 'i18next'
import type { TableType } from '~/interface/Interface'

const Table = <T extends { id?: string }>({ columns, data }: TableType<T>) => {
  return (
    <table className=" w-full border-collapse rounded-lg border-gray-200 bg-white shadow-base">
      <thead className="relative">
        <tr>
          {columns.map((header) => (
            <th
              className="sticky top-0 bg-gray-100 py-4 px-12 text-left text-sm  font-bold text-gray-500"
              key={header.field}
            >
              {header.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="h-48 rounded-lg">
        {data.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center text-sm">
              {t('commonConstants.noRowsToShow')}
            </td>
          </tr>
        ) : (
          data.map((rowData: T) => (
            <tr
              className=" border-t border-solid border-gray-200 "
              key={rowData.id}
            >
              {columns.map((column) => (
                <>
                  {column.render ? (
                    <td
                      className={`break-word ${
                        column.width ? `w-[${column.width}]` : ``
                      } overflow-ellipsis px-12 py-8 text-left text-base text-gray-700`}
                      key={column.title}
                    >
                      {column?.render(rowData)}
                    </td>
                  ) : (
                    <td
                      className={`overflow-hidden ${
                        column.width ? `w-[${column.width}]` : ''
                      } truncate px-12 py-8 text-left text-base text-gray-700`}
                      key={column.title}
                      title={String(
                        rowData[column.field as keyof typeof rowData]
                      )}
                    >
                      {rowData[column.field as keyof typeof rowData]}
                    </td>
                  )}
                </>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

export default Table

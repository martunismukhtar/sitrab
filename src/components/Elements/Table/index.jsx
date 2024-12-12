import React from "react";
import Button from "../Button";

const Table = ({ data, header = [], onDelete }) => {
  return (
    <div className="relative overflow-x-auto">
      <table
        border="1"
        className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">'
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              No.
            </th>
            {Object.keys(data[0]).map((key) => (
              <th
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                key={key}
              >
                {key}
              </th>
            ))}
            {onDelete && (
              <th className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Aksi
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
              </td>
              {Object.values(row).map((value, i) => (
                <td
                  key={i}
                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {value}
                </td>
              ))}
              {onDelete && (
                <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <Button
                    className="text-red-600 hover:text-red-900 bg-white"
                    onClick={() => onDelete(row, index)}
                  >
                    Hapus
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

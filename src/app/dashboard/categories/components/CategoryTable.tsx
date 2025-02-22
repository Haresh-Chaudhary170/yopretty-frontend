/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel
} from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { Edit2Icon, Trash2Icon } from "lucide-react";

type Category = {
  id: string;
  name: string;

};

type Props = {
  data: Category[];
};

export default function CategoryTable({ data }: Props) {
  const columnHelper = createColumnHelper<Category>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("id", {
      header: "Action",
      cell: () => {
        return (
          <div className="flex gap-2 items-center">
            <button className="hover:text-white hover:bg-slate-700 py-1 px-2 rounded-lg">
              <Edit2Icon />
            </button>
            <button className="hover:text-white hover:bg-red-600 py-1 px-2 rounded-lg">
              <Trash2Icon />
            </button>
          </div>
        );

      },
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="overflow-auto">
      {
        //check if data is empty or not
        data.length === 0 ? (
          <div className="text-center text-gray-500 py-20">No Categorys found.</div>
        ) : (
          // render table if data is not empty
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border border-gray-300 px-4 py-2 bg-gray-100"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table> )     }


      {/* Pagination Controls */}
      <div className="flex justify-end items-center mt-4 gap-3">
        <button
          className="border-2 border-gray-600 px-2 rounded-lg"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          className="border-2 border-gray-600 px-2 rounded-lg"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
} from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from './components/Pagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: boolean;
  pageNo?: number;
  setPageNo?: (index: number) => void;
  pageSize?: number;
  setPageSize?: (size: number) => void;
  totalPages?: number;
  totalCount?: number;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  enableRowSelection?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  pageNo,
  setPageNo,
  pageSize,
  setPageSize,
  totalPages,
  totalCount,
  onRowSelectionChange,
  enableRowSelection = false,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const selectionColumn: ColumnDef<TData, TValue> = {
    id: 'select',
    header: ({ table }) => (
      <div className="pr-1 flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  };

  const table = useReactTable({
    data,
    columns: enableRowSelection ? [selectionColumn, ...columns] : columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    state: {
      pagination: {
        pageIndex: pageNo || 0,
        pageSize: pageSize || 10,
      },
      ...(enableRowSelection && { rowSelection }),
    },
    ...(enableRowSelection && { onRowSelectionChange: setRowSelection }),
    onPaginationChange: updater => {
      if (typeof updater === 'function') {
        const newState = updater({
          pageIndex: pageNo || 0,
          pageSize: pageSize || 10,
        });
        setPageNo?.(newState.pageIndex);
        setPageSize?.(newState.pageSize);
      }
    },
  });

  // Notify parent component of selected rows
  useEffect(() => {
    if (enableRowSelection && onRowSelectionChange) {
      const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
      onRowSelectionChange(selectedRows);
    }
  }, [rowSelection, onRowSelectionChange, table, enableRowSelection]);

  return (
    <div className="">
      <div className="rounded-t-md border overflow-x-auto">
        <Table wrapperClassName="h-[calc(100vh-23rem)] min-h-auto min-w-max z-10">
          <TableHeader className="sticky top-0 bg-muted">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} className="first:rounded-tl-md last:rounded-tr-md">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  className="h-12"
                  data-state={enableRowSelection && row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={enableRowSelection ? columns.length + 1 : columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <div className="p-4 border border-t-0 rounded-b-md">
          <DataTablePagination
            table={table}
            pageNo={pageNo}
            setPageNo={setPageNo}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalPages={totalPages}
            totalCount={totalCount}
          />
        </div>
      )}
    </div>
  );
}

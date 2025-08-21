"use client";

import type { ColumnDef, ColumnFiltersState, Row } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Sku } from "./columns";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from "lucide-react";

interface DataTableProps {
  columns: ColumnDef<Sku>[];
  data: Sku[];
  handleOpen: () => void;
  hasMore: boolean;
  handlePagination: (direction: "up" | "down") => void;
  page: number;
}

export function DataTable({
  columns,
  data,
  handleOpen,
  hasMore,
  handlePagination,
  page,
}: DataTableProps) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const table = useReactTable<Sku>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className="md:min-w-[50rem]">
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Filtrar por SKU"
          value={(table.getColumn("sku")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("sku")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Button onClick={handleOpen} size="sm">
          Adicionar SKU
        </Button>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: Row<Sku>) => (
                <React.Fragment key={row.id}>
                  <TableRow className="w-full">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <TableRow>
                      <TableCell colSpan={row.getVisibleCells().length}>
                        <div className="grid grid-cols-12">
                          <div className="col-span-6">
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                              Descrição:
                            </h3>
                            <p className="leading-7 [&:not(:first-child)]:mt-1">
                              {row.original.description}
                            </p>
                          </div>
                          <div className="col-span-6">
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                              Descrição Comercial:
                            </h3>
                            <p className="leading-7 [&:not(:first-child)]:mt-1">
                              {row.original.comercialDescription}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              disabled={page === 1}
              onClick={() => handlePagination("down")}
            >
              <ChevronLeftCircleIcon /> Anterior
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={() => handlePagination("up")}
              disabled={!hasMore}
            >
              Próxima <ChevronRightCircleIcon />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

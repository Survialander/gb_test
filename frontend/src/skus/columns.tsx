"use client";

import type { ColumnDef } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EyeClosedIcon, EyeIcon, MenuIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type Sku = {
  id?: string;
  description: string;
  comercialDescription: string;
  sku: string;
  state?:
    | "PRE-CADASTRO"
    | "CADASTRO-COMPLETO"
    | "ATIVO"
    | "DESATIVADO"
    | "CANCELADO";
};

export const columns: (
  handleUpdateDialogOpen: (row: Sku) => void,
  handleChangeStateDialogOpen: (row: Sku) => void,
) => ColumnDef<Sku>[] = (
  handleUpdateDialogOpen,
  handleChangeStateDialogOpen,
) => {
  return [
    {
      accessorKey: "state",
      header: "Fluxo",
      id: "state",
      size: 4,
      cell: ({ row }) => {
        return <Badge>{`${row.getValue("state")}`}</Badge>;
      },
    },
    // {
    //   accessorKey: "description",
    //   header: "Descrição",
    // },
    // {
    //   accessorKey: "comercialDescription",
    //   header: "Descrição Comercial",
    // },
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => row.toggleExpanded()}
            >
              {row.getIsExpanded() ? <EyeIcon /> : <EyeClosedIcon />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="flex justify-center">
                <Button variant="ghost" size="sm">
                  <MenuIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  onClick={() => handleUpdateDialogOpen(row.original)}
                >
                  Atualizar
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleChangeStateDialogOpen(row.original)}
                >
                  Mudar fluxo
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};

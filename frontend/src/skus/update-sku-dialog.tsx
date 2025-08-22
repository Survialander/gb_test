import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Sku } from "./columns";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const url = import.meta.env.VITE_API_URL;

export default function UpdateSkuDialog({
  sku,
  open,
  handleOpen,
  handleRefetch,
}: {
  sku: Sku;
  open: boolean;
  handleOpen: Dispatch<SetStateAction<boolean>>;
  handleRefetch: () => void;
}) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const formFields: {
    key: "description" | "comercialDescription" | "sku" | "state";
    placeholder: string;
    label: string;
    disabled?: boolean;
  }[] = [
    { key: "description", placeholder: "Descrição", label: "Descrição" },

    {
      key: "comercialDescription",
      placeholder: "Descrição Comercial",
      label: "Descrição Comercial",
    },
    { key: "sku", placeholder: "SKU", label: "SKU" },
    {
      key: "state",
      placeholder: "Fluxo Atual",
      label: "Fluxo Atual",
      disabled: true,
    },
  ];

  useEffect(() => {
    reset({
      description: sku.description,
      comercialDescription: sku.comercialDescription,
      sku: sku.sku,
      state: sku.state,
    });
  }, [sku, reset]);

  const handleOpenChange = () => {
    reset();
    setErrorMessage("");
    handleOpen(!open);
  };

  const onSubmit = async () => {
    const { description, comercialDescription, sku: skuCode } = getValues();

    const updateObject = {
      description: sku.description !== description ? description : undefined,
      comercialDescription:
        sku.comercialDescription !== comercialDescription
          ? comercialDescription
          : undefined,
      sku: sku.sku !== skuCode ? skuCode : undefined,
    };

    const response = await fetch(`${url}/skus/${sku.id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObject),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const message = await new Response(response.body).json();
      setErrorMessage(message.message);
      return;
    }

    handleRefetch();
    handleOpen(!open);
    setErrorMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Atualizar SKU:</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {sku &&
              formFields.map((form) => (
                <div key={form.key} className="grid gap-3">
                  <Label htmlFor={form.key}>{form.label}:</Label>
                  <Input
                    {...register(form.key, {
                      required: `O campo ${form.label} deve ser preenchido.`,
                      disabled: form.disabled ?? false,
                    })}
                    id={form.key}
                    name={form.key}
                  />
                  {errors[form.key] && (
                    <Alert variant="destructive" className="px-3 py-2">
                      <AlertCircleIcon />
                      <AlertTitle>{`${errors[form.key]!.message}`}</AlertTitle>
                    </Alert>
                  )}
                </div>
              ))}

            {errorMessage && (
              <div className="mt-2">
                <Alert variant="destructive" className="px-3 py-2">
                  <AlertCircleIcon />
                  <AlertTitle>{errorMessage}</AlertTitle>
                </Alert>
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => handleOpen}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              Atualizar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

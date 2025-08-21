import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AlertCircleIcon } from "lucide-react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import type { Sku } from "./columns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const url = import.meta.env.VITE_API_URL;

export default function ChangeStateDialog({
  open,
  handleOpen,
  sku,
  handleRefetch,
}: {
  open: boolean;
  sku: Sku;
  handleOpen: Dispatch<SetStateAction<boolean>>;
  handleRefetch: () => void;
}) {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [skuObject, setSkuObject] = useState<Sku>();
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    getValues,
    setValue,
  } = useForm();

  const states = [
    "PRE-CADASTRO",
    "CADASTRO-COMPLETO",
    "ATIVO",
    "DESATIVADO",
    "CANCELADO",
  ];

  useEffect(() => {
    setSkuObject(sku);
  }, [sku, reset]);

  const onSubmit = async () => {
    const { state } = getValues();

    const response = await fetch(`${url}/skus/${sku.id}/state`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state }),
    });

    if (response.status === 400) {
      const message = await new Response(response.body).json();
      setErrorMessage(message.message);
      return;
    }

    handleRefetch();
    handleOpen(!open);
  };

  const onOpenChange = () => {
    reset();
    setErrorMessage("");
    handleOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={() => onOpenChange()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Alterar Fluxo:</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="py-4 grid gap-4">
            <div key="state" className="grid gap-3">
              <Label htmlFor="state">Fluxo:</Label>
              <Select
                defaultValue={skuObject?.state}
                onValueChange={(value) => setValue("state", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um fluxo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fluxos</SelectLabel>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errorMessage && (
                <Alert variant="destructive" className="px-3 py-2">
                  <AlertCircleIcon />
                  <AlertTitle>{`${errorMessage}`}</AlertTitle>
                </Alert>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button disabled={isSubmitting} type="submit">
              Alterar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

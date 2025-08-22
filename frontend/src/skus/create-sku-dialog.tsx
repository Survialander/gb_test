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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircleIcon } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";

const url = import.meta.env.VITE_API_URL;

export default function CreateSkuDialog({
  handleRefetch,
  open,
  handleOpen,
}: {
  open: boolean;
  handleRefetch: () => void;
  handleOpen: Dispatch<SetStateAction<boolean>>;
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
    key: string;
    placeholder: string;
    label: string;
  }[] = [
    {
      key: "description",
      placeholder: "Descrição",
      label: "Descrição",
    },
    {
      key: "comercialDescription",
      placeholder: "Descrição Comercial",
      label: "Descrição Comercial",
    },
    { key: "sku", placeholder: "SKU", label: "SKU" },
  ];

  const onSubmit = async () => {
    const { description, comercialDescription, sku } = getValues();

    const response = await fetch(`${url}/skus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, comercialDescription, sku }),
    });

    if (!response.ok) {
      const message = await new Response(response.body).json();
      setErrorMessage(message.message);
      return;
    }

    reset();
    setErrorMessage("");
    handleOpen(!open);
    handleRefetch();
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
            <DialogTitle>Adicionar SKU:</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="py-4 grid gap-4">
            {formFields.map((form) => (
              <div key={form.key} className="grid gap-3">
                <Label htmlFor={form.key}>{form.label}:</Label>
                <Input
                  {...register(form.key, {
                    required: `O campo ${form.label} deve ser preenchido.`,
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
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button disabled={isSubmitting} type="submit">
              Criar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

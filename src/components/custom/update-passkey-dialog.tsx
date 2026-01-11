import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { nameSchema, updatePasskeySchema } from "@/lib/schemas";
import { useForm } from "@tanstack/react-form";
import { useRouteContext } from "@tanstack/react-router";
import { Edit2, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import z from "zod";

type UpdatePasskeyDialogProps = {
    passkey: {
        id: string;
        name?: string | null;
    };
};

export function UpdatePasskeyDialog({ passkey }: UpdatePasskeyDialogProps) {
    const { queryClient } = useRouteContext({ from: "/_protected/profile/" });
    const [isOpen, setIsOpen] = useState(false);
    const [newName, setNewName] = useState(passkey.name || "");
    const [isPending, startTransition] = useTransition();
    const form = useForm({
        defaultValues: {
            passkeyName: ""
        },
        validators: {
            onSubmit: updatePasskeySchema
        },
        onSubmit: ({ value }) => {
            startTransition(async () => {
                await authClient.passkey.updatePasskey({
                    id: passkey.id,
                    name: value.passkeyName,
                }, {
                    onError: (context) => {
                        toast.error(context.error.message || "Failed to update passkey");

                    },
                    onSuccess: async () => {
                        toast.success("Passkey updated successfully");
                        await queryClient.invalidateQueries({ queryKey: ["passkeys"] });
                        setIsOpen(false);
                    }

                });
            });
        }
    })


    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
                if (open) {
                    setNewName(passkey.name || "");
                }
            }}
        >
            <DialogTrigger render={
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                    <Edit2 size={14} />
                    <span className="sr-only">Edit</span>
                </Button>
            } />

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Passkey Name</DialogTitle>
                    <DialogDescription>
                        Give your passkey a memorable name.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-3">
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }} className="space-y-4">
                        <FieldGroup>
                            <form.Field
                                name="passkeyName"
                                children={(field) => {
                                    const errors = field.state.meta.errors;
                                    const isInvalid =
                                        errors.length > 0 && field.state.meta.isTouched;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Passkey Name</FieldLabel>
                                            <Input
                                                disabled={isPending}
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                autoComplete="name"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                aria-invalid={isInvalid}
                                                placeholder="e.g iphone 12 pro"
                                            />
                                            {isInvalid && <FieldError errors={errors} />}
                                        </Field>
                                    );
                                }}
                            />

                        </FieldGroup>
                        <div className="flex gap-2 justify-end">
                            <Button
                                type="submit"
                                variant="outline"
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={!newName.trim() || isPending}
                            >
                                {isPending ? (
                                    <Loader2 size={16} className="animate-spin mr-2" />
                                ) : null}
                                Update
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

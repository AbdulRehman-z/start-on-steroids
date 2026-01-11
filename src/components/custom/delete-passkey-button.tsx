import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouteContext } from "@tanstack/react-router";
import { Loader2, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type DeletePasskeyButtonProps = {
    passkeyId: string;
};

export function DeletePasskeyButton({ passkeyId }: DeletePasskeyButtonProps) {
    const { queryClient } = useRouteContext({ from: "/_protected/profile/" });
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            const { data, error } = await authClient.passkey.deletePasskey({
                id: passkeyId,
            });

            if (error) {
                toast.error(error.message || "Failed to delete passkey");
                return;
            }

            if (data) {
                toast.success("Passkey deleted successfully");
                await queryClient.invalidateQueries({ queryKey: ["passkeys"] });
            }
        });
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={handleDelete}
            disabled={isPending}
        >
            {isPending ? (
                <Loader2 size={14} className="animate-spin" />
            ) : (
                <Trash2 size={14} />
            )}
            <span className="sr-only">Delete</span>
        </Button>
    );
}

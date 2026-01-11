import { useForm } from "@tanstack/react-form";
import { useRouteContext } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Alert } from "../ui/alert";

// Add Passkey Form
type AddPasskeyFormProps = {
	onSuccess?: () => void;
};

export function AddPasskeyForm({ onSuccess }: AddPasskeyFormProps) {
	const { queryClient } = useRouteContext({ from: "/_protected/profile/" });
	const [loading, startTransition] = useTransition();

	const form = useForm({
		defaultValues: {
			name: "",
		},
		onSubmit: async ({ value }) => {
			startTransition(async () => {
				await authClient.passkey.addPasskey(
					{
						name: value.name || undefined,
					},
					{
						onSuccess: () => {
							toast.success("Passkey added successfully");
							queryClient.invalidateQueries({ queryKey: ["passkeys"] });
							form.reset();
							onSuccess?.();
						},
						onError: (context) => {
							toast.error(context.error.message || "Failed to add passkey");
						},
					},
				);
			});
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className="flex flex-col gap-4"
		>
			<Alert className="text-xs p-3 border-blue-500/20 bg-blue-500/5 text-blue-600">
				Passkeys allow you to sign in securely without passwords.
			</Alert>

			<FieldGroup>
				<form.Field
					name="name"
					children={(field) => (
						<Field data-invalid={field.state.meta.errors.length > 0}>
							<FieldLabel htmlFor="passkey-name">
								Passkey Name <span className="text-muted-foreground">(Optional)</span>
							</FieldLabel>
							<Input
								id="passkey-name"
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="e.g., MacBook Pro, iPhone 15"
								autoComplete="off"
								className="bg-background"
							/>
							{field.state.meta.errors.length > 0 && (
								<FieldError errors={field.state.meta.errors} />
							)}
						</Field>
					)}
				/>
			</FieldGroup>

			<div className="flex justify-end gap-2">
				<Button type="submit" disabled={loading} size="sm">
					{loading ? (
						<Loader2 size={14} className="animate-spin mr-2" />
					) : null}
					Save Passkey
				</Button>
			</div>
		</form>
	);
}

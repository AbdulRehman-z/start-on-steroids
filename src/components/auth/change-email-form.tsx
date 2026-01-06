import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { changeEmailSchema } from "@/lib/schemas";
import { FormWrapper } from "../custom/forms-wrapper";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";

type Props = {
	onSuccess: () => void;
};

export const ChangeEmailForm = ({ onSuccess }: Props) => {
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			email: "",
			confirmEmail: "",
		},
		validators: {
			onSubmit: changeEmailSchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.changeEmail(
				{
					newEmail: value.email,
					callbackURL: "/profile",
				},
				{
					onSuccess: () => {
						toast.success("Verification email sent. Please check your inbox.");
						// onSuccess();
					},
					onError: (ctx) => {
						toast.error(ctx.error.message || "Failed to update email");
					},
				},
			);
		},
	});

	const isLoading = form.state.isSubmitting;

	return (
		<Card className="gap-y-5">
			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.Field
							name="email"
							children={(field) => {
								const errors = field.state.meta.errors;
								const isInvalid =
									errors.length > 0 && field.state.meta.isTouched;

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>New Email</FieldLabel>
										<Input
											disabled={isLoading}
											id={field.name}
											name={field.name}
											type="email"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="m@example.com"
											autoComplete="email"
										/>
										{isInvalid && <FieldError errors={errors} />}
									</Field>
								);
							}}
						/>

						<form.Field
							name="confirmEmail"
							children={(field) => {
								const errors = field.state.meta.errors;
								const isInvalid =
									errors.length > 0 && field.state.meta.isTouched;

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											Confirm New Email
										</FieldLabel>
										<Input
											disabled={isLoading}
											id={field.name}
											name={field.name}
											type="email"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="m@example.com"
											autoComplete="email"
										/>
										{isInvalid && <FieldError errors={errors} />}
									</Field>
								);
							}}
						/>

						<Field>
							<Button
								disabled={isLoading}
								type="submit"
								className="w-full relative"
							>
								{form.state.isSubmitting ? (
									<>
										<Loader2 className="size-4 animate-spin" />
										Updating...
									</>
								) : (
									"Change Email"
								)}
							</Button>
						</Field>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
};

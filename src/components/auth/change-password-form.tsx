import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { changePasswordSchema } from "@/lib/schemas";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { PasswordInput } from "../ui/password-input";

type Props = {
	onSuccess: () => void;
};

export const ChangePasswordForm = ({ onSuccess }: Props) => {
	const form = useForm({
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
		validators: {
			onSubmit: changePasswordSchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.changePassword(
				{
					newPassword: value.newPassword,
					currentPassword: value.currentPassword,
					revokeOtherSessions: true,
				},
				{
					onSuccess: () => {
						toast.success("Password changed successfully");
						onSuccess();
					},
					onError: (ctx) => {
						toast.error(ctx.error.message || "An unknown error occurred");
					},
				},
			);
		},
	});

	const isSubmitting = form.state.isSubmitting;

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
							name="currentPassword"
							children={(field) => {
								const errors = field.state.meta.errors;
								const isInvalid =
									errors.length > 0 && field.state.meta.isTouched;

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											Current Password
										</FieldLabel>
										<PasswordInput
											disabled={isSubmitting}
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="********"
											autoComplete="current-password"
										/>
										{isInvalid && <FieldError errors={errors} />}
									</Field>
								);
							}}
						/>

						<form.Field
							name="newPassword"
							children={(field) => {
								const errors = field.state.meta.errors;
								const isInvalid =
									errors.length > 0 && field.state.meta.isTouched;

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>New Password</FieldLabel>
										<PasswordInput
											disabled={isSubmitting}
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="********"
											autoComplete="new-password"
										/>
										{isInvalid && <FieldError errors={errors} />}
									</Field>
								);
							}}
						/>

						<form.Field
							name="confirmPassword"
							children={(field) => {
								const errors = field.state.meta.errors;
								const isInvalid =
									errors.length > 0 && field.state.meta.isTouched;

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											Confirm Password
										</FieldLabel>
										<PasswordInput
											disabled={isSubmitting}
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="********"
											autoComplete="new-password"
										/>
										{isInvalid && <FieldError errors={errors} />}
									</Field>
								);
							}}
						/>

						<Field>
							<Button
								variant="default"
								disabled={isSubmitting}
								type="submit"
								className="w-full relative"
							>
								{isSubmitting ? (
									<>
										<Loader2 className="size-4 animate-spin" />
										Changing password...
									</>
								) : (
									"Change Password"
								)}
							</Button>
						</Field>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
};

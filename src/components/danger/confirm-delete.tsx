import { useForm } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getUserAccountsFn } from "@/functions/get-user-accounts-fn";
import { authClient } from "@/lib/auth-client";
import { passwordSchema } from "@/lib/schemas";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { PasswordInput } from "../ui/password-input";

export const ConfirmDelete = () => {
	const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
	const { data } = useSuspenseQuery({
		queryKey: ["user-accounts"],
		queryFn: getUserAccountsFn,
	});

	const hasPasswordAccount = data?.accounts.some(
		(account) =>
			account.providerId === "credential" ||
			account.providerId === "email-password",
	);

	const form = useForm({
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
		onSubmit: async ({ value }) => {
			const payload = hasPasswordAccount
				? { password: value.password, callbackURL: "/sign-up" }
				: { callbackURL: "/sign-up" };

			await authClient.deleteUser(payload, {
				onError: (error) => {
					console.error("Delete failed:", error);
					toast.error(error.error.message || "Failed to delete account");
				},
				onSuccess: () => {
					setShowEmailConfirmation(true);
					toast.success("Account deleted successfully!");
				},
			});
		},
	});

	const isLoading = form.state.isSubmitting;

	return (
		<>
			{hasPasswordAccount ? (
				<Card className="gap-y-5">
					<CardContent>
						{showEmailConfirmation && (
							<p className="text-center text-base text-muted-foreground">
								Please check your mail, we have send you verification email to
								perform this action.
							</p>
						)}
						{!showEmailConfirmation && (
							<form
								onSubmit={(e) => {
									e.preventDefault();
									e.stopPropagation();
									form.handleSubmit();
								}}
							>
								<FieldGroup>
									<form.Field
										name="password"
										validators={{
											onChange: passwordSchema,
										}}
										children={(field) => {
											const errors = field.state.meta.errors;
											const isInvalid =
												errors.length > 0 && field.state.meta.isTouched;

											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>Password</FieldLabel>
													<PasswordInput
														disabled={isLoading}
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

									<Field>
										<Button
											disabled={isLoading}
											type="submit"
											className="w-full relative"
											variant="destructive"
										>
											{isLoading ? (
												<>
													<Loader2 className="size-4 animate-spin mr-2" />
													Deleting...
												</>
											) : (
												"Delete Account"
											)}
										</Button>
									</Field>
								</FieldGroup>
							</form>
						)}
					</CardContent>
				</Card>
			) : (
				<Button
					variant="destructive"
					disabled={isLoading}
					onClick={() => form.handleSubmit()}
					className="w-full"
				>
					{isLoading ? (
						<>
							<Loader2 className="size-4 animate-spin mr-2" />
							Deleting...
						</>
					) : (
						"Delete Account"
					)}
				</Button>
			)}
		</>
	);
};

import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { FormWrapper } from "../custom/forms-wrapper";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "../ui/field";
import { PasswordInput } from "../ui/password-input";

const formSchema = z.object({
	email: z.email(),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
});

export const LoginForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			setIsSubmitting(true);
			await authClient.signIn.email(
				{
					email: value.email,
					password: value.password,
				},
				{
					onError: (error) => {
						toast.error("Login failed!", {
							description: `Error: ${error.response.text}. Status: ${error.error.statusText}`,
						});
						navigate({
							to: "/",
						});
						setIsSubmitting(false);
					},
					onSuccess: () => {
						toast.success("Login successful!", {
							description: "You have been logged in successfully.",
						});
						navigate({
							to: "/",
						});
						setIsSubmitting(false);
					},
				},
			);
		},
	});

	const handleSocialLogin = async (provider: "google" | "github") => {
		setIsSubmitting(true);
		await authClient.signIn.social(
			{
				provider,
				callbackURL: "/",
			},
			{
				onError: (error) => {
					toast.error("Login failed!", {
						description: `Error: ${error.error.error}.
						Status: ${error.error.statusText}`,
					});
					navigate({
						to: "/",
					});
					setIsSubmitting(false);
				},
				onSuccess: () => {
					toast.success("Login successful!", {
						description: "You have been logged in successfully.",
					});
					navigate({
						to: "/",
					});
					setIsSubmitting(false);
				},
			},
		);
	};

	return (
		<FormWrapper>
			<Card className="gap-y-10 ">
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
							<form.Field
								name="email"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Email</FieldLabel>
											<Input
												disabled={isSubmitting}
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder="Enter your email"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
							<form.Field
								name="password"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Password</FieldLabel>
											<PasswordInput
												disabled={isSubmitting}
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder="********"
												autoComplete="off"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
							<Field>
								<Button
									disabled={isSubmitting}
									type="submit"
									className="w-full"
								>
									Login
								</Button>
							</Field>
							<FieldSeparator>Or continue with</FieldSeparator>
							<Field>
								<Button
									disabled={isSubmitting}
									onClick={() => handleSocialLogin("github")}
									variant="outline"
									type="button"
									className="w-full"
								>
									<Image
										src="/github.svg"
										height={15}
										width={15}
										alt="github_logo"
									/>
									Continue with GitHub
								</Button>
								<Button
									disabled={isSubmitting}
									onClick={() => handleSocialLogin("google")}
									variant="outline"
									type="button"
									className="w-full"
								>
									<Image
										src="/google.svg"
										height={15}
										width={15}
										alt="google_logo"
									/>
									Continue with Google
								</Button>
								<FieldDescription className="text-center">
									Don&apos;t have an account?{" "}
									<Link
										to="/sign-up"
										className="underline underline-offset-4 font-semibold"
									>
										Sign up
									</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</FormWrapper>
	);
};

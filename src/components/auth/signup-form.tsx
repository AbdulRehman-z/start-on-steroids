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
import {
	PasswordInput,
	PasswordInputStrengthChecker,
} from "../ui/password-input";

const formSchema = z
	.object({
		fullName: z
			.string()
			.min(2, { message: "Full name must be at least 2 characters" }),
		email: z.email(),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" }),
		confirmPassword: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const SignupForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			setIsSubmitting(true);
			await authClient.signUp.email(
				{
					name: value.fullName,
					email: value.email,
					password: value.password,
					callbackURL: "/",
				},
				{
					onError: (error) => {
						toast.error("Signup failed!", {
							description: `Error: ${error.error.message} Status: ${error.error.statusText}`,
						});
						setIsSubmitting(false);
					},
					onSuccess: () => {
						toast.success("Signup successful!", {
							description: "You have been signed up successfully.",
						});
						setIsSubmitting(false);
						navigate({
							to: "/",
						});
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
					setIsSubmitting(false);
				},
				onSuccess: () => {
					toast.success("Login successful!", {
						description: "You have been logged in successfully.",
					});
					setIsSubmitting(false);
				},
			},
		);
	};

	return (
		<FormWrapper>
			<Card className="gap-y-10">
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Create your account</CardTitle>
					<CardDescription>
						Fill in the form below to create your account
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
								name="fullName"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
											<Input
												disabled={isSubmitting}
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder="David"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>

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
												placeholder="david@example.com"
											/>
											<FieldDescription>
												We will never share your email with anyone else. We will
												use it to send you important updates and notifications.
											</FieldDescription>
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
											>
												<PasswordInputStrengthChecker />
											</PasswordInput>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
							<form.Field
								name="confirmPassword"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
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
									type="submit"
									className="w-full"
									disabled={isSubmitting}
								>
									Sign Up
								</Button>
							</Field>
							<FieldSeparator>Or continue with</FieldSeparator>
							<Field>
								<Button
									variant="outline"
									type="button"
									className="w-full"
									disabled={isSubmitting}
									onClick={() => handleSocialLogin("github")}
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
									variant="outline"
									type="button"
									className="w-full"
									disabled={isSubmitting}
									onClick={() => handleSocialLogin("google")}
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
									Already have an account?{" "}
									<Link
										to="/login"
										className="underline underline-offset-4 font-semibold"
									>
										Login
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

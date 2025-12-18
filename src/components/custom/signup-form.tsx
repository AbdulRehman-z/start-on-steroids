import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "../ui/field";
import { FormWrapper } from "./forms-wrapper";

export const SignupForm = () => {
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
					<form>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="name">Full Name</FieldLabel>
								<Input id="name" type="text" placeholder="John Doe" required />
							</Field>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
								/>
								<FieldDescription>
									We&apos;ll use this to contact you. We will not share your
									email with anyone else.
								</FieldDescription>
							</Field>
							<Field>
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<Input id="password" type="password" required />
								<FieldDescription>
									Must be at least 8 characters long.
								</FieldDescription>
							</Field>
							<Field>
								<FieldLabel htmlFor="confirm-password">
									Confirm Password
								</FieldLabel>
								<Input id="confirm-password" type="password" required />
								<FieldDescription>
									Please confirm your password.
								</FieldDescription>
							</Field>
							<Field>
								<Button type="submit" className="w-full">
									Create Account
								</Button>
							</Field>
							<FieldSeparator>Or continue with</FieldSeparator>
							<Field>
								<Button variant="outline" type="button" className="w-full">
									<Image
										src="/github.svg"
										height={15}
										width={15}
										alt="GitHub Logo"
									/>
									Sign up with GitHub
								</Button>
								<FieldDescription className="px-6 text-center">
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

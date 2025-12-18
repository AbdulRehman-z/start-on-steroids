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

export const LoginForm = () => {
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
					<form>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
								/>
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Password</FieldLabel>
									<Link
										to="/forgot-password"
										className="ml-auto text-sm underline-offset-4 hover:underline"
									>
										Forgot your password?
									</Link>
								</div>
								<Input id="password" type="password" required />
							</Field>
							<Field>
								<Button type="submit" className="w-full">
									Login
								</Button>
							</Field>
							<FieldSeparator>Or continue with</FieldSeparator>
							<Field>
								<Button variant="outline" type="button" className="w-full">
									<Image
										src="/github.svg"
										height={15}
										width={15}
										alt="github_logo"
									/>
									Login with GitHub
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

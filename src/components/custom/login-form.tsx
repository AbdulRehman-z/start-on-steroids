import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "../ui/field";
import { BorderWrapper } from "./broder-wrapper";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	return (
		<BorderWrapper>
			<form className={cn("flex flex-col gap-6", className)} {...props}>
				<FieldGroup>
					<div className="flex flex-col items-center gap-1 text-center">
						<h1 className="text-2xl font-bold">Login to your account</h1>
						<p className="text-muted-foreground text-sm text-balance">
							Enter your email below to login to your account
						</p>
					</div>
					<Field>
						<FieldLabel htmlFor="email">Email</FieldLabel>
						<Input id="email" type="email" placeholder="m@example.com" required />
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
						<Button type="submit">Login</Button>
					</Field>
					<FieldSeparator>Or continue with</FieldSeparator>
					<Field>
						<Button variant="outline" type="button">
							<Image src="/github.svg" height={24} width={24} alt="github_logo" />
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
		</BorderWrapper>
	);
}

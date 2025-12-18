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

export function SignupForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	return (
		<BorderWrapper>
			<form className={cn("flex flex-col gap-6", className)} {...props}>
				<FieldGroup className="p-20">
					<div className="flex flex-col items-center gap-1 text-center">
						<h1 className="text-2xl font-bold">Create your account</h1>
						<p className="text-muted-foreground text-sm text-balance">
							Fill in the form below to create your account
						</p>
					</div>
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
							We&apos;ll use this to contact you. We will not share your email
							with anyone else.
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
						<FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
						<Input id="confirm-password" type="password" required />
						<FieldDescription>Please confirm your password.</FieldDescription>
					</Field>
					<Field>
						<Button type="submit">Create Account</Button>
					</Field>
					<FieldSeparator>Or continue with</FieldSeparator>
					<Field>
						<Button variant="outline" type="button">
							<Image
								src="/github.svg"
								height={24}
								width={24}
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
		</BorderWrapper>
	);
}

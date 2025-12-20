import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "@/components/auth/signup-form";
export const Route = createFileRoute("/_authLayout/sign-up/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <SignupForm />;
}

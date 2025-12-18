import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/custom/login-form";

export const Route = createFileRoute("/_authLayout/login/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <LoginForm />;
}

import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";
import { requireAuthMiddleware } from "@/lib/middlewares";

export const getUserSessionsFn = createServerFn()
	.middleware([requireAuthMiddleware])
	.handler(async ({ context }) => {
		const currentSessionToken = context.session.session.token;
		const sessions = await auth.api.listSessions({
			headers: getRequestHeaders(),
		});

		return { currentSessionToken, sessions };
	});

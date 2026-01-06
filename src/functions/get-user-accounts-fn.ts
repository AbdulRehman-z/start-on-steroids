import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";
import { requireAuthMiddleware } from "@/lib/middlewares";

export const getUserAccountsFn = createServerFn()
	.middleware([requireAuthMiddleware])
	.handler(async () => {
		const accounts = await auth.api.listUserAccounts({
			headers: getRequestHeaders(),
		});
		const nonCredentialAccounts = accounts.filter(
			(account) => account.providerId !== "credential",
		);
		return { nonCredentialAccounts, accounts };
	});

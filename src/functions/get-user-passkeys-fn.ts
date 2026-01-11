import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";
import { requireAuthMiddleware } from "@/lib/middlewares";

export const getUserPasskeysFn = createServerFn()
	.middleware([requireAuthMiddleware])
	.handler(async () => {
		const passkeys = await auth.api.listPasskeys({
			headers: getRequestHeaders(),
		});

		return passkeys;
	});

import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { user } from "@/db/schemas/auth-schema";
import { requireAuthMiddleware } from "@/lib/middlewares";

export const getUserDetailsFn = createServerFn()
	.middleware([requireAuthMiddleware])
	.handler(async ({ context }) => {
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
		const { id } = context.session.user;
		const [userDetails] = await db.select().from(user).where(eq(user.id, id));

		return userDetails;
	});

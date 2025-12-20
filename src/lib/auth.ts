import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as authSchema from "@/db/schemas/auth-schema";
import { env } from "@/env";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		schema: authSchema,
		provider: "pg",
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
	},
	session: {
		cookieCache: {
			enabled: true,
		},
	},
	rateLimit: {
		storage: "database",
		maxAttempts: 1000,
		timeWindow: 60 * 60 * 1000, // 1 hour
	},
	socialProviders: {
		github: {
			clientId: env.VITE_GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_SECRET,
		},
		google: {
			clientId: env.VITE_GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_SECRET,
		},
	},
});

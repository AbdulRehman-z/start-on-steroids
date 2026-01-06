import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { lastLoginMethod, twoFactor } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "@/db";
import * as authSchema from "@/db/schemas/auth-schema";
import { env } from "@/env";
import {
	sendChangeEmailVerificationEmailTrigger,
	sendDeleteAccountVerificationEmailTrigger,
	sendPasswordResetEmailTrigger,
	sendVerificationEmailTrigger,
} from "./triggers";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: authSchema,
	}),
	user: {
		deleteUser: {
			enabled: true,
			sendDeleteAccountVerification: async ({ user, url }) => {
				void sendDeleteAccountVerificationEmailTrigger(
					{
						email: user.email,
						name: user.name,
					},
					url,
				);
			},
		},
		changeEmail: {
			enabled: true,
			sendChangeEmailConfirmation: async ({ newEmail, url, user }) => {
				void sendChangeEmailVerificationEmailTrigger(
					{
						email: user.email,
						name: user.name,
					},
					newEmail,
					url,
				);
			},
		},
	},
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url }) => {
			void sendPasswordResetEmailTrigger(
				{ email: user.email, name: user.name },
				url,
			);
		},
	},
	emailVerification: {
		afterEmailVerification: async (user) => {
			// TODO: send user welcome email
		},
		autoSignInAfterVerification: true,
		sendOnSignIn: true,
		sendOnSignUp: true,
		sendVerificationEmail: async ({ url, user }) => {
			void sendVerificationEmailTrigger(
				{ email: user.email, name: user.name },
				url,
			);
		},
	},
	// session: {
	// 	cookieCache: {
	// 		enabled: true,
	// 	},
	// },
	rateLimit: {
		enabled: true,
		storage: "database",
		customRules: {
			"/get-session": false,
			"/sign-in/email": {
				max: 200,
				window: 60, // 1 minute
			},
		},
	},
	socialProviders: {
		github: {
			clientId: env.VITE_GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_SECRET,
			scope: ["user:image"],
		},
		google: {
			clientId: env.VITE_GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_SECRET,
			scope: ["profile", "email"],
			mapProfileToUser: async (profile) => {
				return {
					image: profile.picture,
				};
			},
		},
	},
	experimental: {
		joins: true,
	},
	plugins: [tanstackStartCookies(), lastLoginMethod(), twoFactor()],
});

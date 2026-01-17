import { createFileRoute } from "@tanstack/react-router";
import { serve } from "@upstash/workflow/tanstack";
import { deleteAccountTemplate } from "@/components/email-templates/delete-account-email";
import { sendEmail } from "@/lib/resend-client";

type Input = {
	user: {
		email: string;
		name: string;
	}
	url: string;
};

export const Route = createFileRoute(
	"/api/send-delete-account-verification-email/route",
)({
	server: {
		handlers: serve<Input>(async (ctx) => {
			const input = ctx.requestPayload;

			await ctx.run("send-delete-account-verification-email", async () => {
				await sendEmail({
					email: input.user.email,
					subject: `Delete Account Verification Email for ${input.user.name}`,
					html: () =>
						deleteAccountTemplate({ user: input.user, url: input.url }),
				})
			})
		}),
	},
});

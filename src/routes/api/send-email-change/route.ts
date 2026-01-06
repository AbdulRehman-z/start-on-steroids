import { createFileRoute } from "@tanstack/react-router";
import { serve } from "@upstash/workflow/tanstack";
import { verifyChangeEmailTemplate } from "@/components/email-templates/verify-change-email";
import { sendEmail } from "@/lib/resend-client";

type Input = {
	user: {
		email: string;
		name: string;
	};
	newEmail: string;
	url: string;
};

export const Route = createFileRoute("/api/send-email-change")({
	server: {
		handlers: serve<Input>(async (ctx) => {
			const input = ctx.requestPayload;

			await ctx.run("send-email-change", async () => {
				await sendEmail({
					email: input.user.email,
					subject: `Approve email change`,
					html: () =>
						verifyChangeEmailTemplate({
							user: input.user,
							newEmail: input.newEmail,
							url: input.url,
						}),
				});
			});
		}),
	},
});

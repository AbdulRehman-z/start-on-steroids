import {
	KeyIcon,
	Link2Icon,
	Trash2Icon,
	TriangleAlertIcon,
	UserIcon,
} from "lucide-react";

export const menuItems = [
	{
		title: "Profile",
		path: "/profile",
		icon: UserIcon,
	},
	{
		title: "Sessions",
		path: "/sessions",
		icon: KeyIcon,
	},
	{
		title: "Accounts",
		path: "/accounts",
		icon: Link2Icon,
	},
	{
		title: "Danger",
		path: "/danger",
		icon: TriangleAlertIcon,
	},
];

export type SupportedSocialProvider = "github" | "google";

export type ProviderConfig = {
	icon: string;
	label: string;
	description?: string;
};

export const PROVIDERS_CONFIG: Record<SupportedSocialProvider, ProviderConfig> =
	{
		google: {
			label: "Google",
			icon: "/google.svg",
			description:
				"Connect to your Google account for easy sign-in and email integration.",
		},
		github: {
			label: "GitHub",
			icon: "/github.svg",
			description: "Connect to your GitHub account.",
		},
	};

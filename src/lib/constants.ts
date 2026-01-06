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

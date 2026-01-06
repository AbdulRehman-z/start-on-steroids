import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type IResult, UAParser } from "ua-parser-js";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export const getUserAgentDetails = (userAgent: string | undefined | null) => {
	const parser = new UAParser(userAgent ?? undefined);
	const { browser, device } = parser.getResult();

	return {
		browserName: browser.name,
		isMobile: device.type === "mobile" || device.type === "tablet",
	};
};

export const formatDate = (date: Date) => {
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(date);
};

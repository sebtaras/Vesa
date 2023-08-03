export enum ThemeType {
	DAY = "day",
	NIGHT = "night",
}

export type Theme = {
	type: ThemeType;
	backgroundColor1: string;
	backgroundColor2: string;
	text: string;
	primary: string;
	secondary?: string;
	green?: string;
	red?: string;
	grey: string;
	icons: string;
};

export const dayTheme: Theme = {
	type: ThemeType.DAY,
	backgroundColor1: "#ededed",
	backgroundColor2: "#d6d6d6",
	text: "#171717",
	primary: "#7da6ff",
	// green: "#08A045", good green
	green: "#79ff4d",
	grey: "#a1a1a1",
	icons: "black",
	red: "#eb4034",
};

export const nightTheme: Theme = {
	type: ThemeType.NIGHT,
	backgroundColor1: "#313638",
	backgroundColor2: "#232627",
	text: "#E8E9EB",
	primary: "#edd182",
	green: "#08A045",
	grey: "#707070",
	icons: "white",
};

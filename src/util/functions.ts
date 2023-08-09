import { TBudget } from "./type";

export const capitalizeFirst = (s: string) => {
	if (s.length > 1) {
		return s.substring(0, 1).toUpperCase() + s.substring(1, s.length);
	} else {
		return s.toUpperCase();
	}
};

export const getDatePickerText = (day: number) => {
	let title = "Budget will restart on the " + day.toString();
	if (title.endsWith("1") && day.toString() != "11") {
		title += "st";
	} else if (title.endsWith("2") && day.toString() != "12") {
		title += "nd";
	} else if (title.endsWith("3") && day.toString() != "13") {
		title += "rd";
	} else {
		title += "th";
	}
	return title + " of the month";
};

export const getDateForDatePicker = (day: number) => {
	const date = new Date();
	date.setDate(day);
	return date;
};

export const parseTextInputToNumber = (s: string) => {
	return s ? parseFloat(s!) : 0;
};

export const budgetSum = (b: TBudget): number => {
	console.log("sub da budget", b);
	let sum = 0;
	for (const key in b) {
		if (key !== "restart_day" && b[key as keyof TBudget]) {
			try {
				sum += b[key as keyof TBudget]
					? parseFloat(b[key as keyof TBudget]?.toString()!)
					: 0;
			} catch {}
		}
	}
	return sum;
};

export const getBudgetContainerWidth = (v: number | null, sum: number, size: number) => {
	const res = size === 0 ? 0 : v ? (parseFloat(v.toString()) * size) / sum : 0;
	console.log("res", res);
	return res;
};

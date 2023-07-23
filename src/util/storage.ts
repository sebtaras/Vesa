import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme } from "./constants";
import { TExpense } from "./type";

export const loadTheme = async () => {
	const value = await AsyncStorage.getItem("theme");
	return value ? value : Theme.DARK;
};

export const saveTheme = async (theme: Theme) => {
	await AsyncStorage.setItem("theme", theme.toString());
};

export const saveExpense = async (expense: TExpense) => {
	const result = await AsyncStorage.getItem("expenses");
	const expenses = result ? (JSON.parse(result) as TExpense[]) : [];
	expenses.push(expense);
	await AsyncStorage.setItem("expenses", JSON.stringify(expenses));
};

const randomExpenses: TExpense[] = [
	{
		amount: 24.29,
		category: "Fun",
		date: new Date(),
	},
	{
		amount: 19.98,
		category: "Shopping",
		date: new Date(),
	},
	{
		amount: 2.58,
		category: "Transportation",
		date: new Date(),
	},
];

export const loadLastThree = async () => {
	const result = await AsyncStorage.getItem("expenses");
	const expenses = result ? (JSON.parse(result) as TExpense[]) : randomExpenses;
	if (expenses.length > 3) {
		return expenses.slice(expenses.length - 4, expenses.length - 1);
	} else {
		return expenses;
	}
};

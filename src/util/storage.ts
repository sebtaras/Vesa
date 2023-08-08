import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme } from "./constants";
import { TBudget, TExpense } from "./type";

//theme
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

//expenses
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

export const initialBudget: TBudget = {
	bills: null,
	eating_out: null,
	fun: null,
	groceries: null,
	health: null,
	other: null,
	rent: null,
	shopping: null,
	subscriptions: null,
	transportation: null,
	restart_day: 1,
};

//budget
export const loadBudget = async (): Promise<TBudget> => {
	const result = await AsyncStorage.getItem("budget");
	return result ? (JSON.parse(result) as TBudget) : initialBudget;
};

export const loadHasBudget = async (): Promise<boolean> => {
	const result = await AsyncStorage.getItem("hasBudget");
	return result ? JSON.parse(result) : false;
};

export const saveBudget = async (budget: TBudget): Promise<void> => {
	await AsyncStorage.setItem("budget", JSON.stringify(budget));
	await AsyncStorage.setItem("hasBudget", JSON.stringify(true));
};

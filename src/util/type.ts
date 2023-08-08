export type TExpense = {
	date: Date;
	category: string;
	amount: number;
};

export type TBudget = {
	rent: number | null;
	bills: number | null;
	groceries: number | null;
	transportation: number | null;
	shopping: number | null;
	subscriptions: number | null;
	eating_out: number | null;
	health: number | null;
	fun: number | null;
	other: number | null;
	restart_day: number;
};

import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { sharedStyles } from "../util/commonStyles";
import { useEffect, useState } from "react";
import { TBudget } from "../util/type";
import { initialBudget, loadBudget, loadHasBudget } from "../util/storage";
import BudgetEditor from "../components/BudgetEditor";
import BudgetViewer from "../components/BudgetViewer";

const Budget = () => {
	const [budget, setBudget] = useState<TBudget>(initialBudget);
	const [isLoading, setIsLoading] = useState(false);
	const [hasBudget, setHasBudget] = useState(false);

	const initialize = async () => {
		setIsLoading(true);
		let r1 = await loadBudget();
		if (r1) {
			setBudget(r1);
		}
		const r2 = await loadHasBudget();
		setHasBudget(r2);
		setIsLoading(false);
	};

	useEffect(() => {
		initialize();
	}, []);

	return (
		<View style={sharedStyles.screenContainer}>
			<View style={styles.topContainer}>
				{isLoading ? (
					<ActivityIndicator />
				) : hasBudget ? (
					<>
						<BudgetViewer budget={budget} initialize={initialize} />
					</>
				) : (
					<>
						<Text style={sharedStyles.normalText}>Start by creating a budget!</Text>
						<BudgetEditor budget={budget} initialize={initialize} />
					</>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	topContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Budget;

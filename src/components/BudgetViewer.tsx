import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { budgetCategories } from "../util/constants";
import { useTheme } from "../hooks/useTheme";
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from "react-native-responsive-screen";
import { sharedStyles } from "../util/commonStyles";
import Separator from "./Separator";
import { TBudget } from "../util/type";
import { useEffect } from "react";
import { initialBudget, saveBudget } from "../util/storage";
import {
	budgetSum,
	capitalizeFirst,
	getDateForDatePicker,
	getDatePickerText,
} from "../util/functions";
import RNDateTimePicker from "@react-native-community/datetimepicker";

interface Props {
	budget: TBudget | null;
	initialize: () => Promise<void>;
}

const BudgetViewer = ({ budget, initialize }: Props) => {
	const { theme } = useTheme();
	const [isChanged, setIsChanged] = useState(false);
	const [myBudget, setMyBudget] = useState<TBudget>(initialBudget);
	const [isOpen, setIsOpen] = useState(false);
	const [dateError, setDateError] = useState(false);
	const [totalBudget, setTotalBudget] = useState(0);

	// const [date, setDate] = useState(new Date());
	// const [open, setOpen] = useState(false);

	const handleEditBudget = () => {
		const toSave: TBudget = initialBudget;
		Object.keys(myBudget).forEach((key, index) => {
			if (key !== "restart_day") {
				toSave[key as keyof TBudget] = myBudget[key as keyof TBudget]
					? parseFloat(myBudget[key as keyof TBudget]?.toString()!)
					: 0;
			} else {
				toSave.restart_day = myBudget.restart_day;
			}
		});
		saveBudget(myBudget);
		initialize();
		setIsChanged(false);
	};

	useEffect(() => {
		if (budget) {
			setMyBudget(budget);
			setTotalBudget(budgetSum(budget));
		}
	}, [budget]);

	console.log("myBudget", myBudget, "total", totalBudget);

	return (
		<View style={styles.screen}>
			{isOpen && (
				<RNDateTimePicker
					mode="date"
					display="calendar"
					value={getDateForDatePicker(myBudget["restart_day"])}
					onChange={(e, d) => {
						setIsOpen(false);
						if (e.type === "set" && d && d?.getDate() < 29) {
							if (!isChanged) setIsChanged(true);
							setMyBudget((prev) => {
								return { ...prev, restart_day: d.getDate() };
							});
						}
					}}
				/>
			)}

			<View>
				{Object.keys(myBudget).map((key, index) => {
					if (key != "restart_day") {
						return (
							<View style={styles.categoryContainer} key={index}>
								<View style={styles.leftCategoryContainer}>
									<Text style={sharedStyles.normalText}>
										{capitalizeFirst(key.replace("_", " "))}
									</Text>
									<TextInput
										style={[
											styles.input,
											{
												fontFamily: "Ubuntu_400Regular",
												borderBottomColor: theme.grey,
												borderBottomWidth: 1,
											},
										]}
										keyboardType="number-pad"
										placeholder="$$$"
										value={
											myBudget[key as keyof TBudget]
												? myBudget[key as keyof TBudget]?.toString()
												: ""
										}
										placeholderTextColor={theme.backgroundColor2}
										onChangeText={(text) => {
											if (!isChanged) setIsChanged(true);
											setMyBudget((prev) => {
												return { ...prev, [key as keyof TBudget]: text };
											});
										}}
									/>
								</View>
								<View style={styles.rightCategoryContainer}></View>
							</View>
						);
					}
				})}
			</View>
			<Separator
				width={widthPercentageToDP("100%")}
				marginVertical={heightPercentageToDP("1%")}
			/>
			<TouchableOpacity
				style={[sharedStyles.button, { borderWidth: 2, borderColor: theme.primary }]}
				onPress={() => setIsOpen(true)}
			>
				<Text style={sharedStyles.normalText}>
					{getDatePickerText(myBudget["restart_day"])}
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[
					sharedStyles.button,
					{
						backgroundColor: isChanged ? theme.primary : theme.grey,
						marginTop: heightPercentageToDP("1%"),
					},
				]}
				onPress={() => {
					handleEditBudget();
				}}
			>
				<Text style={sharedStyles.normalText}>Save budget!</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		alignItems: "center",
	},
	categoryContainer: {
		flexDirection: "row",
		width: widthPercentageToDP("95%"),
		alignItems: "center",
	},
	leftCategoryContainer: {
		flex: 1,
		flexDirection: "row",
		padding: widthPercentageToDP("0.5%"),
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "space-between",
	},
	rightCategoryContainer: {
		flex: 1,
		backgroundColor: "grey",
		padding: widthPercentageToDP("3"),
		marginLeft: widthPercentageToDP("1%"),
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
	},
	input: {},
});

export default BudgetViewer;

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { budgetCategories } from "../util/constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Theme, ThemeType } from "../util/themes";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from "react-native-responsive-screen";

interface Props {
	selected: string;
	changeCategory: (category: string) => void;
}

const iconSize = 30;

const getIcon = (category: string, theme: Theme) => {
	switch (category) {
		case "Rent":
			return <FontAwesome5 name="home" size={iconSize} color={theme.icons} />;
		case "Bills":
			return <Ionicons name="receipt" size={iconSize} color={theme.icons} />;
		case "Groceries":
			return <FontAwesome5 name="shopping-cart" size={iconSize} color={theme.icons} />;
		case "Transportation":
			return <FontAwesome5 name="car-side" size={iconSize} color={theme.icons} />;
		case "Shopping":
			return <Ionicons name="shirt" size={iconSize} color="black" />;
		case "Health":
			return <MaterialIcons name="medical-services" size={iconSize} color="black" />;
		case "Subscriptions":
			return <Ionicons name="apps-sharp" size={iconSize} color={theme.icons} />;
		case "Eating out":
			return <Ionicons name="fast-food" size={iconSize} color="black" />;
		case "Fun":
			return <MaterialCommunityIcons name="party-popper" size={iconSize} color="black" />;
		case "Other":
			return <MaterialIcons name="money-off" size={iconSize} color="black" />;
	}
};

const Categories = ({ selected, changeCategory }: Props) => {
	const { theme } = useTheme();
	return (
		<View
			style={{
				flexDirection: "row",
				flexWrap: "wrap",
				alignItems: "center",
				justifyContent: "space-between",
				marginVertical: heightPercentageToDP("0.5%"),
			}}
		>
			{budgetCategories.map((category, index) => {
				return (
					<TouchableOpacity
						key={index}
						onPress={() => changeCategory(category)}
						style={{
							flexDirection: "column",
							flexGrow: 1,
							borderWidth: widthPercentageToDP("0.4%"),
							// borderColor: category === selected ? theme.primary : theme.text,
							backgroundColor:
								category === selected ? theme.primary : theme.backgroundColor1,

							borderRadius: heightPercentageToDP("2.25%"),
							alignItems: "center",
							justifyContent: "center",
							padding: heightPercentageToDP("0.5%"),
							paddingHorizontal: heightPercentageToDP("1.5%"),
							margin: heightPercentageToDP("0.5%"),
							elevation: 3,
						}}
					>
						<Text
							style={[
								{
									color: theme.text,
									fontFamily: "Ubuntu_400Regular",
									marginBottom: heightPercentageToDP("0.2%"),
								},
							]}
						>
							{category}
						</Text>
						{getIcon(category, theme)}
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default Categories;

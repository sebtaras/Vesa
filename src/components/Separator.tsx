import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "../hooks/useTheme";
import { heightPercentageToDP } from "react-native-responsive-screen";

const Separator = () => {
	const { theme } = useTheme();
	return (
		<View
			style={{
				borderWidth: heightPercentageToDP("0.25%"),
				borderColor: theme.backgroundColor2,
			}}
		></View>
	);
};

export default Separator;

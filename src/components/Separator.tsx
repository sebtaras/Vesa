import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "../hooks/useTheme";
import { heightPercentageToDP } from "react-native-responsive-screen";

interface Props {
	marginVertical?: number;
	width?: number;
}

const Separator = ({ marginVertical, width }: Props) => {
	const { theme } = useTheme();
	return (
		<View
			style={{
				borderWidth: heightPercentageToDP("0.25%"),
				borderColor: theme.backgroundColor2,
				marginVertical: marginVertical,
				width: width,
			}}
		></View>
	);
};

export default Separator;

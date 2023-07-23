import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

export const sharedStyles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		padding: widthPercentageToDP("1%"),
	},
});

export const debugStyles = StyleSheet.create({
	border1: {
		borderWidth: 1,
		borderColor: "black",
	},
	border2: {
		borderWidth: 1,
		borderColor: "red",
	},
	border3: {
		borderWidth: 1,
		borderColor: "blue",
	},
});

import { StyleSheet } from "react-native";
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from "react-native-responsive-screen";

export const logoFont = heightPercentageToDP("4%");
export const largeFont = heightPercentageToDP("2.5%");
export const normalFont = heightPercentageToDP("2%");

export const sharedStyles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		padding: widthPercentageToDP("1%"),
	},
	sectionContainer: {
		flexDirection: "row",
		flex: 1,
		margin: widthPercentageToDP("2%"),
		marginTop: widthPercentageToDP("0%"),
	},
	normalText: {
		fontFamily: "Ubuntu_400Regular",
		fontSize: normalFont,
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

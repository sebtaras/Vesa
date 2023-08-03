import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { View } from "react-native";
import { Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../hooks/useTheme";
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { largeFont, logoFont } from "../util/commonStyles";
import { useRoute } from "@react-navigation/native";

interface Props {
	showBackComponent: boolean;
	navigation: any;
}

const Header = ({ showBackComponent, navigation }: Props) => {
	const { theme } = useTheme();
	const { name: routeName } = useRoute();
	return (
		<View
			style={{
				height: heightPercentageToDP("12%"),
				backgroundColor: theme.backgroundColor1,
				elevation: 2,
			}}
		>
			<View style={{ flex: 1 }}>
				<StatusBar backgroundColor={theme.primary} translucent={true} />
			</View>
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					backgroundColor: theme.primary,
				}}
			>
				{showBackComponent ? (
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={{ marginLeft: widthPercentageToDP("2%"), flex: 1 }}
					>
						<Ionicons name="arrow-back-sharp" size={30} color="black" />
					</TouchableOpacity>
				) : (
					<View style={{ marginLeft: widthPercentageToDP("2%"), flex: 1 }}></View>
				)}
				<View style={{ flex: 10, alignItems: "center" }}>
					<Text
						style={{
							color: theme.text,
							fontSize: logoFont,
							fontFamily: "Ubuntu_700Bold_Italic",
							minWidth: widthPercentageToDP("50%"),
							textAlign: "center",
						}}
					>
						{routeName === "Home" ? "VE$A" : routeName}
					</Text>
				</View>
				{routeName === "Settings" ? (
					<View style={{ marginLeft: widthPercentageToDP("2%"), flex: 1 }}></View>
				) : (
					<TouchableOpacity
						style={{ marginRight: widthPercentageToDP("2%"), flex: 1 }}
						onPress={() => navigation.navigate("Settings")}
					>
						<FontAwesome5 name="cog" size={27} color="black" />
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default Header;

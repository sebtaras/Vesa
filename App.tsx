import "react-native-gesture-handler";
import { useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
	useFonts,
	Ubuntu_300Light,
	Ubuntu_300Light_Italic,
	Ubuntu_400Regular,
	Ubuntu_400Regular_Italic,
	Ubuntu_500Medium,
	Ubuntu_500Medium_Italic,
	Ubuntu_700Bold,
	Ubuntu_700Bold_Italic,
} from "@expo-google-fonts/ubuntu";
import * as SplashScreen from "expo-splash-screen";
import { NativeBaseProvider, extendTheme } from "native-base";
import { StackNavigator } from "./src/navigation/StackNavigator";
import { ThemeProvider } from "./src/context/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
	let [fontsLoaded] = useFonts({
		Ubuntu_400Regular,
		Ubuntu_500Medium,
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
			<ThemeProvider>
				<NavigationContainer>
					<StackNavigator />
				</NavigationContainer>
			</ThemeProvider>
		</View>
	);
}

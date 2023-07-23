import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme } from "./constants";

export const getTheme = async () => {
	const value = await AsyncStorage.getItem("theme");
	return value ? value : Theme.DARK;
};

export const saveTheme = async (theme: Theme) => {
	await AsyncStorage.setItem("theme", theme.toString());
};

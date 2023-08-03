import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { useTheme } from "../hooks/useTheme";
import Header from "../components/Header";
import History from "../screens/History";
import Period from "../screens/Period";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
	const { theme } = useTheme();
	const navigation = useNavigation();
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen
				name="Home"
				component={Home}
				options={{
					header: () => <Header showBackComponent={false} />,
				}}
			/>
			<Stack.Screen
				name="Period"
				component={Period}
				options={{
					header: () => <Header navigation={navigation} showBackComponent={true} />,
				}}
			/>
			<Stack.Screen
				name="History"
				component={History}
				options={{
					header: () => <Header navigation={navigation} showBackComponent={true} />,
				}}
			/>
		</Stack.Navigator>
	);
};

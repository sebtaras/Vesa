import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { useTheme } from "../hooks/useTheme";
import Header from "../components/Header";
import History from "../screens/History";
import Budget from "../screens/Budget";
import { useNavigation } from "@react-navigation/native";
import Settings from "../screens/Settings";

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
					header: () => <Header navigation={navigation} showBackComponent={false} />,
				}}
			/>
			<Stack.Screen
				name="Budget"
				component={Budget}
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
			<Stack.Screen
				name="Settings"
				component={Settings}
				options={{
					header: () => <Header navigation={navigation} showBackComponent={true} />,
				}}
			/>
		</Stack.Navigator>
	);
};

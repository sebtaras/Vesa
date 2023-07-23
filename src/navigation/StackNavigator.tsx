import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { useTheme } from "../hooks/useTheme";
import Header from "../components/Header";

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
	const { theme } = useTheme();

	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen
				name="Home"
				component={Home}
				options={{
					header: () => <Header showBackComponent={false} />,
				}}
			/>
		</Stack.Navigator>
	);
};

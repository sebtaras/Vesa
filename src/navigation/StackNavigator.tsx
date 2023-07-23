import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="Drawer">
			<Stack.Screen name="Drawer" component={DrawerNavigator} />
		</Stack.Navigator>
	);
};

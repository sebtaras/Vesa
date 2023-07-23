import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import { useTheme } from "../hooks/useTheme";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
	const { theme } = useTheme();
	return (
		<Drawer.Navigator
			initialRouteName="Home"
			screenOptions={{
				drawerStyle: {
					backgroundColor: theme.backgroundColor1,
				},
			}}
		>
			<Drawer.Screen name="Home" component={Home} options={{ header: () => <></> }} />
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;

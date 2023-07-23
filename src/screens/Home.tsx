import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { debugStyles, sharedStyles } from "../util/commonStyles";
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withDecay,
	withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useTheme } from "../hooks/useTheme";
import Categories from "../components/Categories";
import { useState } from "react";

const SLIDER_WIDTH = widthPercentageToDP("58%");
const SLIDER_HEIGHT = heightPercentageToDP("8%");
const INNER_SLIDER_WIDTH = heightPercentageToDP("6.5%");
const INNER_SLIDER_HEIGHT = heightPercentageToDP("6.5%");
const SLIDER_MARGIN = (SLIDER_HEIGHT - INNER_SLIDER_HEIGHT) / 2;
const SLIDER_END = SLIDER_WIDTH - INNER_SLIDER_WIDTH - 2 * SLIDER_MARGIN;

const Home = (): JSX.Element => {
	const { theme } = useTheme();
	const X = useSharedValue(0);

	const [selectedCategory, setSelectedCategory] = useState("");
	const [value, setValue] = useState("");

	const handleChangeCategory = (category: string) => {
		setSelectedCategory(selectedCategory === category ? "" : category);
	};

	const handleGestureEvent = useAnimatedGestureHandler({
		onStart: (_, context: any) => {
			context.startX = X.value;
			context.endX = SLIDER_END;
		},
		onActive: (event, context: any) => {
			if (
				context.startX + event.translationX < context.endX &&
				context.startX + event.translationX > 0
			) {
				X.value = context.startX + event.translationX;
			}
		},
		onEnd: (_, __) => {
			X.value = withSpring(0, { mass: 0.5 });
		},
	});

	const animatedStyles = {
		swipeStyle: useAnimatedStyle(() => {
			return {
				transform: [
					{
						translateX: X.value,
					},
				],
			};
		}),
		textStyle: useAnimatedStyle(() => {
			return {
				opacity: interpolate(X.value, [0, SLIDER_END], [1, 0], Extrapolation.CLAMP),
			};
		}),
	};

	return (
		<View
			style={[sharedStyles.screenContainer, { backgroundColor: theme.backgroundColor1 }]}
		>
			<View style={styles.newExpenseContainer}>
				<TextInput
					style={[
						styles.input,
						{
							fontFamily: "Ubuntu_500Medium",
							color: theme.primary,
							// borderBottomColor: value ? theme.primary : theme.text,
						},
					]}
					keyboardType="number-pad"
					placeholder="$$$"
					placeholderTextColor={theme.grey}
					onChangeText={(text) => setValue(text)}
				/>
				<Categories selected={selectedCategory} changeCategory={handleChangeCategory} />

				<View
					style={{
						width: SLIDER_WIDTH,
						height: SLIDER_HEIGHT,
						elevation: 3,
						backgroundColor: theme.backgroundColor2,
						justifyContent: "center",
						alignItems: "center",
						borderRadius: 25,
					}}
				>
					<PanGestureHandler onGestureEvent={handleGestureEvent}>
						<Animated.View
							style={[
								{
									height: INNER_SLIDER_HEIGHT,
									width: INNER_SLIDER_WIDTH,
									position: "absolute",
									left: SLIDER_MARGIN,
									backgroundColor: theme.primary,
									alignItems: "center",
									justifyContent: "center",
									borderRadius: 20,
									elevation: 3,
								},
								animatedStyles.swipeStyle,
							]}
						>
							<View style={{ elevation: 10 }}>
								<MaterialIcons name="double-arrow" size={40} color="black" />
							</View>
						</Animated.View>
					</PanGestureHandler>
					<Animated.Text
						style={[
							{
								color: theme.primary,
								fontFamily: "Ubuntu_500Medium",
								fontSize: heightPercentageToDP("2.5%"),
							},
							animatedStyles.textStyle,
						]}
					>
						CONFIRM
					</Animated.Text>
				</View>
			</View>
			<View style={styles.periodContainer}>
				<Text style={[{ color: theme.text, fontFamily: "Ubuntu_400Regular" }]}>
					Current period
				</Text>
			</View>
			<View style={styles.recentContainer}>
				<Text style={[{ color: theme.text, fontFamily: "Ubuntu_400Regular" }]}>
					Recent expenses
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	newExpenseContainer: {
		flex: 3.4,
		alignItems: "center",
	},
	input: {
		fontSize: heightPercentageToDP("8.5%"),
		// borderRadius: heightPercentageToDP("1%"),
		// padding: heightPercentageToDP("1%"),
		borderBottomWidth: 2,
	},
	periodContainer: {
		flex: 1,
	},
	recentContainer: {
		flex: 2,
	},
});

export default Home;

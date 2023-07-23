import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { debugStyles, largeFont, normalFont, sharedStyles } from "../util/commonStyles";
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, {
	Extrapolation,
	interpolate,
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useTheme } from "../hooks/useTheme";
import Categories from "../components/Categories";
import { useState, useEffect } from "react";
import * as Haptics from "expo-haptics";
import { loadLastThree, saveExpense } from "../util/storage";
import { TExpense } from "../util/type";
import { Entypo } from "@expo/vector-icons";
import Separator from "../components/Separator";
import CurrentSection from "../components/CurrentSection";

const SLIDER_WIDTH = widthPercentageToDP("55%");
const SLIDER_HEIGHT = heightPercentageToDP("8%");
const INNER_SLIDER_WIDTH = heightPercentageToDP("6.5%");
const INNER_SLIDER_HEIGHT = heightPercentageToDP("6.5%");
const SLIDER_MARGIN = (SLIDER_HEIGHT - INNER_SLIDER_HEIGHT) / 2;
const SLIDER_END = SLIDER_WIDTH - INNER_SLIDER_WIDTH - 2 * SLIDER_MARGIN;
const SLIDER_THRESHOLD = SLIDER_WIDTH - 20;

const Home = (): JSX.Element => {
	const { theme } = useTheme();
	const X = useSharedValue(0);

	const [selectedCategory, setSelectedCategory] = useState("");
	const [value, setValue] = useState("");
	const [lastThreeExpenses, setLastThreeExpenses] = useState<TExpense[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const initialize = async () => {
		setIsLoading(true);
		const result = await loadLastThree();
		if (result) {
			setLastThreeExpenses(result);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		initialize();
	}, []);

	const handleChangeCategory = (category: string) => {
		setSelectedCategory(selectedCategory === category ? "" : category);
	};

	const trigger = () => {
		console.log("triggering");
		//check
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
		//create expense
		createExpense();
		initialize();
	};

	const createExpense = () => {
		if (value && selectedCategory) {
			saveExpense({
				amount: parseInt(value),
				category: selectedCategory,
				date: new Date(),
			});
		}
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
			if (X.value > SLIDER_THRESHOLD) {
				runOnJS(trigger)();
			}
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
			style={[sharedStyles.screenContainer, { backgroundColor: theme.backgroundColor2 }]}
		>
			<View
				style={[styles.newExpenseContainer, { backgroundColor: theme.backgroundColor1 }]}
			>
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
					placeholderTextColor={theme.backgroundColor2}
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
								fontSize: largeFont,
							},
							animatedStyles.textStyle,
						]}
					>
						CONFIRM
					</Animated.Text>
				</View>
			</View>
			<Separator />
			<View style={[styles.periodContainer, { backgroundColor: theme.backgroundColor1 }]}>
				<Text style={[styles.sectionText, { color: theme.text }]}>Current period</Text>
				<CurrentSection />
			</View>
			<Separator />
			<View style={[styles.recentContainer, { backgroundColor: theme.backgroundColor1 }]}>
				<Text style={[styles.sectionText, { color: theme.text }]}>Recent</Text>
				<View
					style={{
						flexDirection: "row",
						flex: 1,
						margin: widthPercentageToDP("2%"),
						marginTop: widthPercentageToDP("1%"),
					}}
				>
					{isLoading ? (
						<View
							style={{
								flex: 5,
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<ActivityIndicator />
						</View>
					) : (
						<View
							style={{
								flex: 5,
								flexDirection: "column",
								marginRight: widthPercentageToDP("2%"),
							}}
						>
							{lastThreeExpenses.map((expense, index) => {
								return (
									<View
										key={index}
										style={{
											flex: 1,
											backgroundColor: theme.backgroundColor2,
											marginBottom: index === 2 ? 0 : widthPercentageToDP("3%"),
											borderRadius: 10,
											alignItems: "center",
											justifyContent: "space-between",
											flexDirection: "row",
											paddingHorizontal: widthPercentageToDP("2%"),
											elevation: 3,
										}}
									>
										<Text style={[sharedStyles.normalText, { color: theme.text }]}>
											{expense.category}
										</Text>
										<Text
											style={[
												{
													color: theme.red,
													fontFamily: "Ubuntu_400Regular",
													fontSize: largeFont,
													backgroundColor: theme.backgroundColor1,
													padding: heightPercentageToDP("0.5%"),
													paddingHorizontal: heightPercentageToDP("1%"),
													borderRadius: 10,
													elevation: 2,
												},
											]}
										>
											-{expense.amount}
										</Text>
									</View>
								);
							})}
						</View>
					)}
					<TouchableOpacity
						style={{
							flex: 1,
							backgroundColor: theme.primary,
							borderRadius: 10,
							alignItems: "center",
							justifyContent: "center",
							elevation: 3,
						}}
					>
						<Entypo name="arrow-right" size={35} color="black" />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	newExpenseContainer: {
		flex: 3.4,
		alignItems: "center",
		borderRadius: 5,
	},
	input: {
		fontSize: heightPercentageToDP("8.5%"),
		// borderRadius: heightPercentageToDP("1%"),
		// padding: heightPercentageToDP("1%"),
		borderBottomWidth: 1.5,
	},
	periodContainer: {
		flex: 1.25,
		borderRadius: 5,
	},
	recentContainer: {
		flex: 1.75,
		borderRadius: 5,
	},
	sectionText: {
		fontFamily: "Ubuntu_400Regular",
		fontSize: normalFont,
		padding: widthPercentageToDP("1%"),
	},
});

export default Home;

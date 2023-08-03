import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from "react-native-responsive-screen";
import { useTheme } from "../hooks/useTheme";
import { normalFont, sharedStyles } from "../util/commonStyles";
import { Entypo } from "@expo/vector-icons";
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	Easing,
} from "react-native-reanimated";
import { useState, useEffect, useRef } from "react";

const CurrentSection = () => {
	const { theme } = useTheme();
	const [maxWidth, setMaxWidth] = useState(0);
	// const [progress, setProgress] = useState(new Animated.Value(0));
	const widthP = 113.65 / 200;
	const width = useSharedValue(0);

	// const fadeAnim = useRef(new Animated.Value(0)).current;

	// const fadeIn = () => {
	// 	// Will change fadeAnim value to 1 in 5 seconds
	// 	Animated.timing(fadeAnim, {
	// 		toValue: widthP * maxWidth,
	// 		duration: 5000,
	// 	}).start();
	// };

	// const fadeAnim = useRef(new Animated.Value(0)).current;

	const setWidth = () => {
		width.value = withTiming(widthP * maxWidth, {
			duration: 1500,
			easing: Easing.out(Easing.ease),
		});
	};

	useEffect(() => {
		// fadeIn();
		setWidth();
	}, []);

	const animatedStyles = {
		progressBar: useAnimatedStyle(() => {
			return {
				width: interpolate(widthP, [0, 1], [0, maxWidth], Extrapolate.CLAMP),
				// width: width.value,
			};
		}),
	};

	return (
		<View style={sharedStyles.sectionContainer}>
			<View
				style={{
					flex: 5,
					flexDirection: "column",
					marginRight: widthPercentageToDP("2%"),
				}}
			>
				<View style={{ flexDirection: "row" }}>
					<Text style={[sharedStyles.normalText, { color: theme.text }]}>
						July 5th -{" "}
					</Text>
					<Text style={[sharedStyles.normalText, { color: theme.text }]}>
						August 5th (13 days left)
					</Text>
				</View>
				<Text style={[sharedStyles.normalText, { color: theme.text }]}>
					Available: 179.4/300
				</Text>
				<Text
					style={[
						sharedStyles.normalText,
						{ color: theme.text, paddingBottom: heightPercentageToDP("1%") },
					]}
				>
					Free to spend: 13.8/day
				</Text>
				{/* parent bar */}
				<View
					onLayout={(event) => {
						var { width } = event.nativeEvent.layout;
						setMaxWidth(width);
						console.log("width", width);
					}}
					style={{
						flex: 1,
						backgroundColor: theme.backgroundColor2,
						borderRadius: 10,
						borderTopLeftRadius: 0,
						borderBottomLeftRadius: 0,
						justifyContent: "center",
					}}
				>
					{/* inner bar */}
					<Animated.View
						style={[
							{
								width: width,
								flex: 1,
								borderRadius: 10,
								borderTopLeftRadius: 0,
								borderBottomLeftRadius: 0,
								backgroundColor: theme.green,
								position: "relative",
							},
							// animatedStyles.progressBar,
						]}
					></Animated.View>
					<Text
						style={[
							sharedStyles.largeText,
							{
								color: theme.text,
								position: "absolute",
								alignSelf: "center",
								textAlignVertical: "center",
							},
						]}
					>
						`{(widthP * 100).toFixed(2)}%
					</Text>
				</View>
			</View>
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
	);
};

export default CurrentSection;

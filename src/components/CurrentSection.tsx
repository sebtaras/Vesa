import { View, Text, TouchableOpacity, Easing, EasingFunction } from "react-native";
import React from "react";
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from "react-native-responsive-screen";
import { useTheme } from "../hooks/useTheme";
import { normalFont, sharedStyles } from "../util/commonStyles";
import { Entypo } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { useState, useEffect, useRef } from "react";

const CurrentSection = () => {
	const { theme } = useTheme();
	// const [progress, setProgress] = useState(new Animated.Value(0));
	const fadeAnim = new Animated.Value(0);

	// Animated.timing(fadeAnim, {
	// 	toValue: 75,
	// 	duration: 2000,
	// 	easing: Easing.back(5),
	// }).start();

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
				<View
					style={{ flex: 1, backgroundColor: theme.backgroundColor2, borderRadius: 10 }}
				>
					<Animated.View
						style={{
							width: 100,
							backgroundColor: theme.green,
							position: "relative",
						}}
					></Animated.View>
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

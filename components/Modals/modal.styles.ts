import { Platform, StyleSheet } from "react-native";
import Layout from "../../constants/Layout";

export const modalStyles = StyleSheet.create({
  modalBackdrop: {
    height: Layout.window.height,
    opacity: 0.8,
  },
  screenOverlay: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 'auto',
	},
	dialogPrompt: {
		...Platform.select({
			ios: {
				opacity: 0.9,
				// backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
			},
			android: {
        opacity: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
				// backgroundColor: "white"
			}
		}),
		padding: 10,
    width: '100%',
		flexDirection: "column",
		justifyContent: "flex-start",
	},
})

import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: COLORS.LIGHT_BLUE,
    borderRadius: 200,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: COLORS.WHITE,
    fontWeight: "500",
    textAlign: "center",
  },
});

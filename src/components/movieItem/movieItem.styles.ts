import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  movieItem: {
    width: "48%",
    margin: "1%",
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    overflow: "hidden",
    borderColor: COLORS.LIGHT_GREY,
    borderWidth: 1,
  },
  fakePoster: {
    width: "100%",
    height: 200,
    backgroundColor: COLORS.LIGHT_GREY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  information: {
    padding: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 3,
  },
  format: {
    fontSize: 11,
    color: COLORS.ORANGE,
  },
  icon: {
    width: 35,
    height: 35,
    opacity: 0.3
  }
});

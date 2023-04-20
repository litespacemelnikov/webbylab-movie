import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  movie: {
    marginTop: 20,
  },
  fakePoster: {
    width: "40%",
    height: 200,
    backgroundColor: COLORS.LIGHT_GREY,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
  },
  icon: {
    width: 35,
    height: 35,
    opacity: 0.3,
  },
  inputReadOnly: {
    padding: 0,
    paddingLeft: 0,
    borderColor: "transparent",
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.BLACK,
  },
  year: {
    fontSize: 16,
    color: COLORS.BLACK,
    opacity: 0.6,
  },
  format: {
    fontSize: 14,
    color: COLORS.ORANGE,
  },
  actor: {
    fontSize: 13,
    color: COLORS.LIGHT_BLUE,
  },
  actorsText: {
    fontSize: 16,
    fontWeight: "500",
    opacity: 0.4
  },
  movieHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15,
    backgroundColor: COLORS.WHITE,
    paddingTop: 15,
    paddingBottom: 15,
  },
  smallLink: {
    padding: 8,
    borderRadius: 100,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 15
  },
  actorsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  actorFields: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

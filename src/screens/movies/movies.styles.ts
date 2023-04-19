import { StyleSheet } from "react-native";

export default StyleSheet.create({
  moviesList: {
    width: '100%',
    paddingBottom: 20,
    flexDirection: "column",
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    opacity: 0.6
  },
  moviesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15,
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 15,
  },
  smallLink: {
    padding: 8,
    borderRadius: 100,
    paddingLeft: 15,
    paddingRight: 15
  }
});

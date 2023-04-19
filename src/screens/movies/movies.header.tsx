import { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/colors";
import words from "../../constants/words.json";
import styles from "./movies.styles";

const MoviesHeader = () => (
  <View style={styles.moviesHeader}>
    <TouchableOpacity style={[styles.smallLink, {backgroundColor: COLORS.LIGHT_BLUE}]}>
      <Text style={{color: COLORS.WHITE}}>+ Create movie</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.smallLink, {backgroundColor: COLORS.SILVER}]}>
      <Text style={{opacity: 0.5}}>Import</Text>
    </TouchableOpacity>
  </View>
);

export default memo(MoviesHeader);

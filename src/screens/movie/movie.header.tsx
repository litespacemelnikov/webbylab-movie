import { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/colors";
import words from "../../constants/words.json";
import styles from "./movie.styles";

interface IPropsMovieHeader {
  onPressEdit: () => void;
  onPressRemove: () => void;
}

const MovieHeader = ({ onPressEdit, onPressRemove }: IPropsMovieHeader) => {
  return (
    <View style={styles.movieHeader}>
      <TouchableOpacity
        onPress={onPressEdit}
        style={[styles.smallLink, { backgroundColor: COLORS.LIGHT_BLUE }]}
      >
        <Text style={{ color: COLORS.WHITE }}>Edit movie</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressRemove}
        style={[styles.smallLink, { backgroundColor: COLORS.RED }]}
      >
        <Text style={{ color: COLORS.WHITE }}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(MovieHeader);

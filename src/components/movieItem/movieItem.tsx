import { memo } from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import styles from "./movieItem.styles";

export interface IMovieItemProps {
  title: string;
  year: number;
  format: string;
}

const MovieItem = ({ title, year, format }: IMovieItemProps) => {
  return (
    <TouchableOpacity style={styles.movieItem} activeOpacity={0.7}>
      <View style={styles.fakePoster}>
        <Image style={styles.icon} source={require('../../../assets/icons/cam.png')} />
      </View>
      <View style={styles.information}>
        <Text style={styles.title}>
          {title} - {year}
        </Text>
        <Text style={styles.format}>{format}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(MovieItem);

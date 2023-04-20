import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { memo } from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { StackParamList } from "../../navigation/types";
import styles from "./movieItem.styles";

export interface IMovieItemProps {
  title: string;
  id: string;
  year: number;
  format: string;
}

const MovieItem = ({ id, title, year, format }: IMovieItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const gotoMovieInformation = () =>
    navigation.navigate("Movie", { movieId: id });

  return (
    <TouchableOpacity
      style={styles.movieItem}
      activeOpacity={0.7}
      onPress={gotoMovieInformation}
    >
      <View style={styles.fakePoster}>
        <Image
          style={styles.icon}
          source={require("../../../assets/icons/cam.png")}
        />
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

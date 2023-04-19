import { Image, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import words from "../constants/words.json";
import { searchSchema } from "../schemas/searchSchema";
import { setSearch } from "../store/movies";
import styles from "./header.styles";

const HeaderLeft = () => {
  const dispatch = useDispatch();

  const debounced = useDebouncedCallback(async (value) => {
    try {
      if (value !== "") await searchSchema.validate({ search: value });

      dispatch(setSearch(value));
    } catch (error) {
      console.log(error);
    }
  }, 800);

  return (
    <View style={styles.headerLeft}>
      <Image style={styles.logo} source={require("../../assets/sm-icon.png")} />
      <TextInput
        style={styles.searchInput}
        placeholder={words.search}
        onChangeText={debounced}
      />
    </View>
  );
};

export default HeaderLeft;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, Alert, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { STORAGE_SESSION_TOKEN } from "../constants/storage";
import { setSessionToken } from "../store/user";
import words from "../constants/words.json";
import styles from "./header.styles";

const HeaderRight = () => {
  const dispatch = useDispatch();

  // Logout
  const onPress = () => {
    Alert.alert(words.logout.alert.title, words.logout.alert.ask, [
      {
        text: words.no,
      },
      {
        text: words.yes,
        onPress: async () => {
          await AsyncStorage.removeItem(STORAGE_SESSION_TOKEN);
          dispatch(setSessionToken(null));
        },
      },
    ]);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={styles.logoutIcon}
        resizeMode="contain"
        source={require("../../assets/icons/power.png")}
      />
    </TouchableOpacity>
  );
};

export default HeaderRight;

import { memo } from "react";
import { View, ActivityIndicator } from "react-native";
import { COLORS } from "../../constants/colors";
import styles from "./globalLoader.styles";

const GlobalLoader = () => (
  <View style={styles.loader}>
    <ActivityIndicator color={COLORS.LIGHT_BLUE} size="large" />
  </View>
);

export default memo(GlobalLoader);

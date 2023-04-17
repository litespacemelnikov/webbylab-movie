import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { selectAlertMessage } from "../../store/alert";
import styles from "./alert.styles";

const Alert = () => {
  const message = useSelector(selectAlertMessage);

  if (!message) return null;

  return (
    <View style={styles.alertBox}>
      <Text>{message}</Text>
    </View>
  );
};

export default Alert;

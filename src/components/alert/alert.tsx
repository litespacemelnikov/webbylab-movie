import { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectAlertMessage, showAlert } from "../../store/alert";
import styles from "./alert.styles";

const Alert = () => {
  const message = useSelector(selectAlertMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(showAlert(null));
    }, 5000);

    return () => clearTimeout(timer);
  });

  if (!message) return null;

  return (
    <View style={styles.alertBox}>
      <Text>{message}</Text>
    </View>
  );
};

export default Alert;

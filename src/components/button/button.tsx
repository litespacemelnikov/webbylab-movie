import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TextStyle,
  StyleProp,
} from "react-native";
import styles from "./button.styles";

interface IButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loader?: boolean;
  style?: StyleProp<TextStyle>;
}

const Button = ({
  label,
  onPress,
  disabled = false,
  loader = false,
  style = {},
}: IButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, (disabled || loader) && { opacity: 0.7 }, style]}
    activeOpacity={0.8}
    disabled={disabled || loader}
  >
    {loader ? (
      <ActivityIndicator size="small" color="white" />
    ) : (
      <Text style={styles.label}>{label}</Text>
    )}
  </TouchableOpacity>
);

export default Button;

import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import styles from "./button.styles";

interface IButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loader?: boolean;
}

const Button = ({
  label,
  onPress,
  disabled = false,
  loader = false,
}: IButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, (disabled || loader) && { opacity: 0.7 }]}
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

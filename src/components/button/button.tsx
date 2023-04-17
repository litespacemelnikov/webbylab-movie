import { TouchableOpacity, Text } from "react-native";
import styles from "./button.styles";

interface IButtonProps {
  label: string;
  onPress: () => void;
}

const Button = ({ label, onPress }: IButtonProps) => (
  <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.8}>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

export default Button;

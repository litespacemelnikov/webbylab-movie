import { memo } from "react";
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  StyleProp,
  TextStyle,
} from "react-native";
import styles from "./input.styles";

interface IInputProps {
  error?: string | null;
  inputStyles?: StyleProp<TextStyle>;
  editable?: boolean;
}

const Input = ({
  error = null,
  inputStyles = {},
  editable = true,
  ...props
}: TextInputProps & IInputProps) => (
  <View style={props.style} pointerEvents={editable ? "auto" : "none"}>
    <TextInput
      {...props}
      style={[styles.input, error && styles.errorBorder, inputStyles]}
    />
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

export default memo(Input);

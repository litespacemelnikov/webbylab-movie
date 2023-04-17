import { memo } from "react";
import { TextInput, TextInputProps, View, Text } from "react-native";
import styles from "./input.styles";

interface IInputProps {
  error?: string | null;
}

const Input = ({
  error = null,
  ...props
}: TextInputProps & IInputProps) => (
  <View style={props.style}>
    <TextInput {...props} style={[styles.input, error && styles.errorBorder]} />
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

export default memo(Input);

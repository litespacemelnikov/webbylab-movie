import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import Container from "../../components/container/container";
import RegisterForm from "./register.form";
import words from "../../constants/words.json";
import styles from "./register.styles";

const Register = () => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Container>
        <View style={styles.register}>
          <Text style={styles.description}>{words.loremIpsum}</Text>
          <RegisterForm />
        </View>
      </Container>
    </ScrollView>
  );
};

export default Register;

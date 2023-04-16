import { View, Text, Image } from "react-native";
import Container from "../../components/container/container";
import words from "../../constants/words.json";
import styles from "./login.styles";

const Login = () => {
  return (
    <Container>
      <View style={styles.login}>
        <Image
          style={styles.icon}
          resizeMode="contain"
          source={require("../../../assets/adaptive-icon.png")}
        />
        <Text style={styles.title}>{words.screens.login.title}</Text>
        <Text style={styles.description}>
          {words.screens.login.description}
        </Text>
      </View>
    </Container>
  );
};

export default Login;

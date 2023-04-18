import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Container from "../../components/container/container";
import words from "../../constants/words.json";
import { StackParamList } from "../../navigation/types";
import LoginForm from "./login.form";
import styles from "./login.styles";

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const gotoRegisterScreen = () => navigation.navigate("Register");

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
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
          <LoginForm />
          <Text style={styles.or}>{words.screens.login.or}</Text>
          <TouchableOpacity
            style={{ width: "100%" }}
            activeOpacity={0.5}
            onPress={gotoRegisterScreen}
          >
            <Text style={styles.registerLink}>
              {words.screens.login.registerLink}
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    </ScrollView>
  );
};

export default Login;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/loginSchema";
import Input from "../../components/input/input";
import words from "../../constants/words.json";
import styles from "./login.styles";
import Button from "../../components/button/button";
import { login } from "../../api/api";
import { STORAGE_SESSION_TOKEN } from "../../constants/storage";
import { useDispatch } from "react-redux";
import { setSessionToken } from "../../store/user";

const LoginForm = () => {
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      const loginResponse = await login(values);

      AsyncStorage.setItem(
        STORAGE_SESSION_TOKEN,
        JSON.stringify(loginResponse.data.token)
      );

      dispatch(setSessionToken(loginResponse.data.token));
    } catch (error) {
      console.log(error);
    }
  };

  const { handleSubmit, handleChange, handleBlur, errors, values } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <View style={styles.form}>
      <Input
        style={{ marginBottom: 20 }}
        error={errors.email}
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        placeholder={words.screens.login.form.email}
      />
      <Input
        style={{ marginBottom: 20 }}
        error={errors.password}
        onChangeText={handleChange("password")}
        onBlur={handleBlur("password")}
        placeholder={words.screens.login.form.password}
        secureTextEntry={true}
      />
      <Button
        onPress={handleSubmit}
        label={words.screens.login.form.loginButton}
      />
    </View>
  );
};

export default LoginForm;

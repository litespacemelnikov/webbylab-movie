import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Keyboard } from "react-native";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { STORAGE_SESSION_TOKEN } from "../../constants/storage";
import { setSessionToken, selectUserLoader, setLoader } from "../../store/user";
import { loginSchema } from "../../schemas/loginSchema";
import Input from "../../components/input/input";
import words from "../../constants/words.json";
import styles from "./login.styles";
import Button from "../../components/button/button";
import { login } from "../../api/api";

const LoginForm = () => {
  const dispatch = useDispatch();
  const loader = useSelector(selectUserLoader);

  const onSubmit = async () => {
    try {
      Keyboard.dismiss();

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
        placeholder={words.forms.email}
      />
      <Input
        style={{ marginBottom: 20 }}
        error={errors.password}
        onChangeText={handleChange("password")}
        onBlur={handleBlur("password")}
        placeholder={words.forms.password}
        secureTextEntry={true}
      />
      <Button
        loader={loader}
        onPress={handleSubmit}
        label={words.forms.loginButton}
      />
    </View>
  );
};

export default LoginForm;

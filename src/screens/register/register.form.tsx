import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Keyboard } from "react-native";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { STORAGE_SESSION_TOKEN } from "../../constants/storage";
import { setSessionToken, selectUserLoader, setLoader } from "../../store/user";
import { registerSchema } from "../../schemas/registerSchema";
import Input from "../../components/input/input";
import words from "../../constants/words.json";
import styles from "./register.styles";
import Button from "../../components/button/button";
import { register } from "../../api/api";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const loader = useSelector(selectUserLoader);

  const onSubmit = async () => {
    try {
      Keyboard.dismiss();
      dispatch(setLoader(true));

      const loginResponse = await register(values);

      AsyncStorage.setItem(
        STORAGE_SESSION_TOKEN,
        JSON.stringify(loginResponse.data.token)
      );

      dispatch(setSessionToken(loginResponse.data.token));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const { handleSubmit, handleChange, handleBlur, errors, values } = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema: registerSchema,
    onSubmit,
  });

  return (
    <View style={styles.form}>
      <Input
        style={{ marginBottom: 20 }}
        error={errors.name}
        onChangeText={handleChange("name")}
        onBlur={handleBlur("name")}
        placeholder={words.forms.name}
      />
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
      <Input
        style={{ marginBottom: 20 }}
        error={errors.confirmPassword}
        onChangeText={handleChange("confirmPassword")}
        onBlur={handleBlur("confirmPassword")}
        placeholder={words.forms.repeatPassword}
        secureTextEntry={true}
      />
      <Button
        loader={loader}
        onPress={handleSubmit}
        label={words.forms.createAccountButton}
      />
    </View>
  );
};

export default RegisterForm;

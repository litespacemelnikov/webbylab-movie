import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLoader, setLoader, setSessionToken } from "../store/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_SESSION_TOKEN } from "../constants/storage";
import { StackParamList } from "./types";
import login from "../screens/login/login";
import { selectSessionToken } from "../store/user";
import Test from "../screens/test";
import GlobalLoader from "../components/globalLoader/globalLoader";
import { useEffect } from "react";

const Stack = createNativeStackNavigator<StackParamList>();

const Navigation = () => {
  const sessionToken = useSelector(selectSessionToken);

  const dispatch = useDispatch();
  const loader = useSelector(selectUserLoader);

  useEffect(() => {
    // checkAndSetSessionToken();
  }, []);

  const checkAndSetSessionToken = async () => {
    try {
      dispatch(setLoader(true));
      const getToken = await AsyncStorage.getItem(STORAGE_SESSION_TOKEN);
      dispatch(setSessionToken(getToken));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoader(false));
    }
  };

  if (loader) return <GlobalLoader />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {sessionToken ? (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Test" component={Test} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Login" component={login} options={{headerShown: false}} />
            <Stack.Screen name="Register" component={Test} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

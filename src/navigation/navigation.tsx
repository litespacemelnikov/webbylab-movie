import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { selectUserGlobalLoader, setGlobalLoader, setSessionToken } from "../store/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_SESSION_TOKEN } from "../constants/storage";
import { StackParamList } from "./types";
import { selectSessionToken } from "../store/user";
import GlobalLoader from "../components/globalLoader/globalLoader";
import HeaderRight from "./headerRight";
import HeaderLeft from "./headerLeft";

import login from "../screens/login/login";
import Register from "../screens/register/register";
import Movies from "../screens/movies/movies";
import Movie from "../screens/movie/movie";

const Stack = createNativeStackNavigator<StackParamList>();

const Navigation = () => {
  const sessionToken = useSelector(selectSessionToken);

  const dispatch = useDispatch();
  const loader = useSelector(selectUserGlobalLoader);

  useEffect(() => {
    checkAndSetSessionToken();
  }, []);

  const checkAndSetSessionToken = async () => {
    try {
      dispatch(setGlobalLoader(true));
      const getToken = await AsyncStorage.getItem(STORAGE_SESSION_TOKEN);
      dispatch(setSessionToken(getToken));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setGlobalLoader(false));
    }
  };

  if (loader) return <GlobalLoader />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {sessionToken ? (
          <Stack.Group
            screenOptions={{
              headerRight: () => <HeaderRight />,
            }}
          >
            <Stack.Screen
              name="Movies"
              component={Movies}
              options={{ headerLeft: () => <HeaderLeft />, headerTitle: "" }}
            />
            <Stack.Screen
              name="Movie"
              component={Movie}
              options={{ headerRight: () => null }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="Login"
              component={login}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

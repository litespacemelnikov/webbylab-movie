import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamList } from "./types";
import login from "../screens/login/login";
import { useSelector } from "react-redux";
import { selectSessionToken } from "../store/user";
import Test from "../screens/test";

const Stack = createNativeStackNavigator<StackParamList>();

const Navigation = () => {
  const sessionToken = useSelector(selectSessionToken);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {sessionToken ? (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Test" component={Test} />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={login} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

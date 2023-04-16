import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { SafeAreaView } from "react-native";
import { store } from "./src/store/store";
import Navigation from "./src/navigation/navigation";
import {
  STATUSBAR_BACKGROUND,
  STATUSBAR_STYLE,
} from "./src/constants/statusbar";

const App = () => (
  <Provider store={store}>
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        style={STATUSBAR_STYLE}
        backgroundColor={STATUSBAR_BACKGROUND}
        translucent={false}
      />
      <Navigation />
    </SafeAreaView>
  </Provider>
);

export default App;

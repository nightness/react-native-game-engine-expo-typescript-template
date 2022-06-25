import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppView from "./AppView";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="orange" hidden={true} />
      <SafeAreaProvider>
        <AppView />
      </SafeAreaProvider>
    </>
  );
}

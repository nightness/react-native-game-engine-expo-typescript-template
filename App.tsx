import 'regenerator-runtime/runtime';
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import GameEngine from "./game/systems/GameEngine";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="orange" hidden={true} />
      <SafeAreaProvider>
        <SafeView />
      </SafeAreaProvider>
    </>
  );
}

function SafeView() {
  const { top, bottom, left, right } = useSafeAreaInsets();
  const topInset = top.valueOf();
  global.topInset = topInset;
  global.bottomInset = bottom;
  global.leftInset = left;
  global.rightInset = right;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GameEngine />
    </SafeAreaView>
  );
}


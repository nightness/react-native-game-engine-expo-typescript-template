import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Logs } from 'expo'
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import GameEngine from "./game/systems/GameEngine";

export default function App() {
  Logs.enableExpoCliLogging()

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
    <SafeAreaView>
      <GameEngine />
    </SafeAreaView>
  );
}


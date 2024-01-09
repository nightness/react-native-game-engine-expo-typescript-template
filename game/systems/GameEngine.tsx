import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { GameEngine as ReactGameEngine } from "react-native-game-engine";

import { entities } from "@entities";
import { GameLoop } from "@systems";
import { GameEngineEvent, IGameEngine } from "@types";

export default function GameEngine() {
  const [isRunning, setIsRunning] = React.useState(true);
  const [score, setScore] = useState(0);
  const [gameEngine, setGameEngine] = useState<IGameEngine | null>(null);
  const [top, bottom, left, right] = [global.topInset, global.bottomInset, global.leftInset, global.rightInset]

  const gameEntities = entities();
  // const { engine, world } = gameEntities.physics;
  // const gameEntities = entities();

  useEffect(() => {
    if (gameEngine) {
      gameEngine.swap(entities());
    }
    global.gameEngine = gameEngine;
  }, [gameEngine]);

  return (
    <ReactGameEngine
      ref={(ref) => setGameEngine(ref as IGameEngine)}
      systems={[GameLoop]}
      entities={gameEntities}
      running={isRunning}
      onEvent={({ type }: GameEngineEvent) => {
        switch (type) {
          case "addToScore": {
            setScore(score => score + 1);
            break;
          }
          case "subtractFromScore": {
            setScore(score => score - 1);
            break;
          }
        }
      }}
      style={{ position: "absolute", top, left, right, bottom }}
    >
      <TouchableOpacity
        onPress={() => {
          // gameEngine?.swap(entities());
          if (isRunning) {
            gameEngine?.stop();
            setIsRunning(false);
          } else {
            gameEngine?.start();
            setIsRunning(true);
          }
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 55,
          width: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 40,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          {isRunning ? score : "Press to Resume"}
        </Text>
      </TouchableOpacity>
    </ReactGameEngine>
  );
}

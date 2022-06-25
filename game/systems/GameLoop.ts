import Matter, { Vector } from "matter-js";
import { GameEngineUpdateEventOptionType, TouchEvent } from "react-native-game-engine";

import { windowHeight, windowWidth } from "@game";

export const GameLoop = (
  entities: any,
  { touches, time, dispatch }: GameEngineUpdateEventOptionType
) => {
  let engine = entities.physics.engine;
  let world = entities.physics.world;

  touches
    .filter((t: TouchEvent) => t.type === "press")
    .forEach((t: TouchEvent) => {
      let balloonPos = entities.Balloon.body.position;
      console.log('Touch:', t, balloonPos);
      // Matter.Body.setVelocity(something, { x: something.velocity.x + 20, y: something.velocity.y - 20 });
    });

  Matter.Engine.update(engine, time.delta);
  return entities;
};

import Matter, { Vector } from "matter-js";
import {
  GameEngineUpdateEventOptionType,
  TouchEvent,
} from "react-native-game-engine";

import { windowHeight, windowWidth } from "@game";
import { Balloon } from "@entities";

export const GameLoop = (
  entities: any,
  { touches, time, dispatch }: GameEngineUpdateEventOptionType
) => {
  let engine = entities.physics.engine;
  let world = entities.physics.world;

  touches
    .filter((t: TouchEvent) => t.type === "press")
    .forEach((t: TouchEvent) => {
      const balloonBody = entities.Balloon.body;
      const balloonPos = balloonBody.position;
      const { locationX, locationY } = t.event;
      if (locationX < 50 && locationY < 50) {
        dispatch({
          type: "addToScore",
        });
        Matter.Events.trigger(engine, "removeBalloon");
      }
    });

  Matter.Engine.update(engine, time.delta);
  return entities;
};

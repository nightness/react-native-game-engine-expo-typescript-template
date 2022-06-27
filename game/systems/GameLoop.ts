import Matter, { Vector } from "matter-js";
import {
  GameEngineUpdateEventOptionType,
  TouchEvent,
} from "react-native-game-engine";

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
      const balloonBody = entities.Balloon.body as Matter.IBodyDefinition;
      const balloonPos = balloonBody.position as Matter.Vector;
      const { pageX, pageY } = t.event;
      // if (locationX < 50 && locationY < 50) { // for some reason this works, but the line below is more readable.
      if (Math.abs(pageX - balloonPos.x) < 50 && Math.abs(pageY - balloonPos.y) < 50) {
        dispatch({
          type: "addToScore",
        });
        Matter.Events.trigger(engine, "removeBalloon");
      }
    });

  Matter.Engine.update(engine, time.delta);
  return entities;
};

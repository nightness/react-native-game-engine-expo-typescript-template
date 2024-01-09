import { GameEngineEntities, GameEntity } from "@types";
import Matter from "matter-js";
import {
  GameEngineUpdateEventOptionType,
  TouchEvent,
} from "react-native-game-engine";

export const GameLoop = (
  entities: GameEngineEntities,
  { touches, time, dispatch }: GameEngineUpdateEventOptionType
) => {
  const engine = entities.physics.engine;

  touches
    .filter((t: TouchEvent) => t.type === "press")
    .forEach((t: TouchEvent) => {
      const balloonBody = (entities.Balloon as GameEntity).body;
      const balloonPos = balloonBody.position as Matter.Vector;

      const { pageX, pageY } = t.event;
      if (
        Math.abs(pageX - balloonPos.x) < 100 &&
        Math.abs(pageY - balloonPos.y) < 100
      ) {
        dispatch({
          type: "addToScore",
        });
        Matter.Events.trigger(engine, "removeBalloon");
      }
    });

  Matter.Engine.update(engine, time.delta);
  return entities;
};

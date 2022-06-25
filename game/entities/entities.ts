import { Dimensions } from "react-native";
import Matter from "matter-js";

import { windowHeight, windowWidth } from "@game";
import { Balloon, Finger, Wall } from ".";

export const entities = (restart: boolean = false) => {
  let engine = Matter.Engine.create(undefined, {
    enableSleeping: false,
    gravity: { x: 0, y: 0.0005 },
  } as Matter.IEngineDefinition);

  let world = engine.world;
  const topInset = (global as any).topInset; // for notch handling

  const newBalloon = () => {
    return Balloon(
      world,
      "red",
      {
        x: Math.random() * (windowWidth - 100) + 50,
        y: 150,
      },
      { width: 50, height: 50 }
    );
  };

  let entities = {
    physics: { engine, world },
    fingers: {
      1: { position: [40, 200], renderer: Finger },
      2: { position: [100, 200], renderer: Finger },
      3: { position: [160, 200], renderer: Finger },
      4: { position: [220, 200], renderer: Finger },
      5: { position: [280, 200], renderer: Finger },
    },
    Balloon: newBalloon(),
    LeftWall: Wall(
      world,
      "orange",
      { x: 0 - 25, y: windowHeight / 2 },
      { height: windowHeight, width: 50 }
    ),
    RightWall: Wall(
      world,
      "orange",
      { x: windowWidth + 25, y: windowHeight / 2 },
      { height: windowHeight, width: 50 }
    ),
    Ceiling: Wall(
      world,
      "orange",
      { x: 0, y: 0 },
      { height: 110 + topInset, width: windowWidth * 2 }
    ),
    Floor: Wall(
      world,
      "orange",
      { x: windowWidth / 2, y: windowHeight + 60 },
      { height: 60, width: windowWidth }
    ),
  };

  Matter.Events.on(
    engine,
    "collisionStart",
    ({ pairs }: Matter.IEventCollision<any>) => {
      for (var i = 0, j = pairs.length; i != j; ++i) {
        const bodyA = pairs[i].bodyA;
        const bodyB = pairs[i].bodyB;
        console.log(
          "collisionStart between " + bodyA.label + " - " + bodyB.label
        );
        const balloonBody = entities.Balloon.body;
        Matter.Body.scale(balloonBody, 0.0, 0.0, {
          x: balloonBody.bounds.min.x - 1000,
          y: balloonBody.bounds.max.y,
        });
        Matter.World.remove(world, balloonBody, true);

        const gameEngine = (global as any).gameEngine;
        gameEngine.dispatch({
          type: "addToScore",
        });

        entities.Balloon = newBalloon();

        // @ts-ignore
        Matter.World.add(world, entities.Balloon);
      }
    }
  );

  return entities;
};

export const useEntities = () => {
  return {
    entities
  }
}
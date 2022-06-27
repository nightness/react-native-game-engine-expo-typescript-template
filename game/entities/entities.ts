import { Dimensions } from "react-native";
import Matter from "matter-js";

import { windowHeight, windowWidth } from "@game";
import { Balloon, Wall } from ".";

export const entities = (restart: boolean = false) => {
  let engine = Matter.Engine.create(undefined, {
    enableSleeping: false,
    gravity: { x: 0, y: 0.001 },
  } as Matter.IEngineDefinition);

  let world = engine.world;
  const topInset = (global as any).topInset; // for notch handling

  const newBalloon = () =>
    Balloon(
      "Balloon",
      world,
      "red",
      {
        x: Math.random() * (windowWidth - 100) + 50,
        y: 150,
      },
      { width: 50, height: 50 }
    );

  let entities = {
    physics: { engine, world },
    Balloon: newBalloon(),
    LeftWall: Wall(
      "LeftWall",
      world,
      "orange",
      { x: 0 - 25, y: windowHeight / 2 },
      { height: windowHeight, width: 50 }
    ),
    RightWall: Wall(
      "RightWall",
      world,
      "orange",
      { x: windowWidth + 25, y: windowHeight / 2 },
      { height: windowHeight, width: 50 }
    ),
    Ceiling: Wall(
      "Ceiling",
      world,
      "orange",
      { x: 0, y: 0 },
      { height: 110 + topInset, width: windowWidth * 2 }
    ),
    Floor: Wall(
      "Floor",
      world,
      "orange",
      { x: windowWidth / 2, y: windowHeight + 60 },
      { height: 60, width: windowWidth }
    ),
  };

  Matter.Events.on(engine, "removeBalloon", () => {
    // Remove old balloon
    const balloonBody = entities.Balloon.body;
    Matter.World.remove(world, balloonBody, true);

    // Add new Balloon
    entities.Balloon = newBalloon();
    // @ts-expect-error, for some reason this doesn't work as expected if passed as entities.Balloon.body
    Matter.World.add(world, entities.Balloon);
  });

  Matter.Events.on(
    engine,
    "collisionStart",
    ({ pairs, name, source, timestamp }: Matter.IEventCollision<any>) => {
      for (var i = 0, j = pairs.length; i != j; ++i) {
        const bodyA = pairs[i].bodyA;
        const bodyB = pairs[i].bodyB;

        console.log(bodyA.label, bodyB.label);

        // We only want collisions between the balloon and the floor
        if ((bodyA.label !== "Balloon" && bodyB.label !== "Balloon") || (bodyA.label !== "Floor" && bodyB.label !== "Floor")) {
          continue;
        }
        const balloonBody = entities.Balloon.body;
        const floorBody = entities.Floor.body;

        // Remove balloon if it hits the floor
        Matter.World.remove(world, balloonBody, true);

        // Subtract a point from the score
        const gameEngine = (global as any).gameEngine;
        gameEngine.dispatch({
          type: "subtractFromScore",
        });

        // Add new Balloon
        entities.Balloon = newBalloon();
        // @ts-expect-error, for some reason this doesn't work if passed as entities.Balloon.body
        Matter.World.add(world, entities.Balloon);
      }
    }
  );

  return entities;
};

export const useEntities = () => {
  return {
    entities,
  };
};

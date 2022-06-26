import { Dimensions } from "react-native";
import Matter from "matter-js";

import { windowHeight, windowWidth } from "@game";
import { Balloon,  Wall } from ".";

export const entities = (restart: boolean = false) => {
  let engine = Matter.Engine.create(undefined, {
    enableSleeping: false,
    gravity: { x: 0, y: 0.001 },
  } as Matter.IEngineDefinition);

  let world = engine.world;
  const topInset = (global as any).topInset; // for notch handling

  const newBalloon = () => Balloon(
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
    "removeBalloon",
    ({ pairs }: Matter.IEventCollision<any>) => {
      // pairs.forEach((pair: Matter.IPair) => {
        // if (pair.bodyA.label === "Balloon" && pair.bodyB.label === "Floor") {
        //   Matter.Events.trigger(engine, "removeBalloon");
        // }

        // Remove old balloon
        const balloonBody = entities.Balloon.body;
        Matter.World.remove(world, balloonBody, true);

        // Add new Balloon
        entities.Balloon = newBalloon();
        // @ts-ignore
        Matter.World.add(world, entities.Balloon);        
      // });
    });

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
        const floorBody = entities.Floor.body;

        // Remove balloon if it hits the floor
        Matter.World.remove(world, balloonBody, true);

        // Subtract a point from the score
        const gameEngine = (global as any).gameEngine;
        gameEngine.dispatch({
          type: "subtractFromScore",
        });

        entities.Balloon = newBalloon();

        // Add new Balloon
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
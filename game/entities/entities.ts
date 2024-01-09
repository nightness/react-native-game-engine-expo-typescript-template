import Matter from "matter-js";

import { windowHeight, windowWidth } from "@game";
import { Balloon, Wall } from ".";
import { GameEngineEntities } from "@types";

export function entities(): GameEngineEntities {
  const engine = Matter.Engine.create({
    enableSleeping: false,
    gravity: { x: 0, y: 1.75 },
  } as Matter.IEngineDefinition);

  const world = engine.world;
  const [top, bottom] = [
    global.topInset,
    global.bottomInset,
    global.leftInset,
    global.rightInset,
  ];

  const newBalloon = () =>
    Balloon(
      "Balloon",
      world,
      "red",
      {
        x: Math.random() * (windowWidth - 100) + 50,
        y: 200,
      },
      { width: 40, height: 50 }
    );

  const entities = {
    physics: { engine, world },
    Balloon: newBalloon(),
    // LeftWall: Wall(
    //   "LeftWall",
    //   world,
    //   "orange",
    //   { x: 0 - 25, y: windowHeight / 2 },
    //   { height: windowHeight - topInset - bottomInset + 560, width: 50 }
    // ),
    // RightWall: Wall(
    //   "RightWall",
    //   world,
    //   "orange",
    //   { x: windowWidth + 25, y: windowHeight / 2 },
    //   { height: windowHeight - topInset - bottomInset + 560, width: 50 }
    // ),
    Ceiling: Wall(
      "Ceiling",
      world,
      "orange",
      { x: 0, y: 0 },
      { height: 110 + top, width: windowWidth * 2 }
    ),
    Floor: Wall(
      "Floor",
      world,
      "orange",
      { x: windowWidth / 2, y: windowHeight - top },
      { height: 60 + bottom, width: windowWidth }
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
    ({ pairs }: Matter.IEventCollision<object>) => {
      for (let i = 0, j = pairs.length; i != j; ++i) {
        const bodyA = pairs[i].bodyA;
        const bodyB = pairs[i].bodyB;

        // We only want collisions between the balloon and the floor
        if (
          (bodyA.label !== "Balloon" && bodyB.label !== "Balloon") ||
          (bodyA.label !== "Floor" && bodyB.label !== "Floor")
        ) {
          continue;
        }
        const balloonBody = entities.Balloon.body;

        // Remove balloon if it hits the floor
        Matter.World.remove(world, balloonBody, true);

        // Subtract a point from the score
        const gameEngine = global.gameEngine!;
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
}

export const useEntities = () => {
  return {
    entities,
  };
};

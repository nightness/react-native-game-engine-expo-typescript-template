import { ColorValue } from "react-native";
import { GameEngine } from "react-native-game-engine";

export interface Position2D {
  x: number;
  y: number;
}

export interface Size2D {
  width: number;
  height: number;
}

export interface IGameEngine<T = never> extends GameEngine {
  stop: () => void;
  start: () => void;
  swap: (newEntities: Promise<GameEngineEntities> | GameEngineEntities) => void;
  dispatch: (event: GameEngineEvent<T>) => void;
}

export interface GameEngineEvent<T = never> {
  type: string;
  [key: string]: T | string;
}

export interface GameEntity {
  body: Matter.Body;
  color: ColorValue;
  pos: Position2D;
  renderer: React.ComponentType<GameEntity>;
}

export interface GameEngineEntities {
  physics: {
    engine: Matter.Engine;
    world: Matter.World;
  };
  [key: string]: GameEntity | { engine: Matter.Engine; world: Matter.World };
}

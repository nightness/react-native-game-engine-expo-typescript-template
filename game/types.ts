import { GameEngine } from "react-native-game-engine";

export interface Position2D {
    x: number;
    y: number;
}

export interface Size2D {
    width: number;
    height: number;
}

export interface IGameEngine extends GameEngine {
    stop: () => void;
    start: () => void;
    swap: (newEntities: Promise<any> | any) => void;
    dispatch: (event: string) => void;
  }
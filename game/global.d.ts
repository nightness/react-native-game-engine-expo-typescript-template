import { IGameEngine } from "@types";

declare global {
  var topInset: number;
  var bottomInset: number;
  var leftInset: number;
  var rightInset: number;
  var gameEngine: IGameEngine | null;
}

export {};

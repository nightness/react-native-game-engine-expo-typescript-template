declare module 'react-game-engine' {
  import { Component } from 'react';
  
  export interface GameEngine {
    start(): void;
    stop(): void;
    swap(entities: any): void;
    dispatch(event: any): void;
  }
  
  export interface GameEngineProps {
    systems: any[];
    entities: any;
    running?: boolean;
    onEvent?: (event: any) => void;
    style?: any;
    children?: React.ReactNode;
  }
  
  export class GameEngine extends Component<GameEngineProps> {}
}
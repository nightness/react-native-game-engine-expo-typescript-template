# React Native Game Engine Expo TypeScript Template

A modern template to jumpstart your game development with React Native using the react-native-game-engine library and TypeScript. Includes a complete "Balloon Pop" example game. Uses Expo 53, React 19, and has web support.

## Getting Started

### Prerequisites

- Node.js (18+)
- Expo CLI or `npx expo`
- eas-cli (for building and submitting your app using EAS Build and EAS Submit)

### Current Stack

- **Expo SDK**: 53
- **React**: 19
- **React Native**: 0.79.6
- **TypeScript**: Strict mode with path mapping
- **ESLint**: Configured for TypeScript + React
- **Cross-platform**: iOS, Android, and Web support

### Setup

Clone the repository to get started:

```sh
git clone https://github.com/nightness/react-native-game-engine-expo-typescript-template
cd react-native-game-engine-expo-typescript-template
```

Install the dependencies:

```sh
npm install
```

### Type Checking

Run TypeScript type checking:

```sh
npm run type-check
```

## Using Expo Dev Client

This project uses `expo-dev-client` to enable a more integrated development workflow, allowing you to build and run your app on simulators/emulators with hot module reloading and access to developer tools.

### Building for Development

The `expo-dev-client` allows you to create custom builds of your application for development purposes.

To create a development build for each platform, run the following command:

- For iOS:

  ```sh
  npm run build:dev
  ```

  This command generates a `.tar.gz` file containing an "app folder". Extract this folder and drag the app binary into your iOS Simulator to install it.

- For Android:

  ```sh
  npm run build:dev
  ```

  For Android, this command generates an APK file that can be installed on your emulator or physical device. Drag and drop the APK file into your Android Emulator to install it.

After building and installing the development client, you can open your project directly from the simulator/emulator. The Expo development menu can be accessed within the simulator/emulator, enabling you to use features like live reloading and debugging.

### Running the Development Build

After installing the development build on your emulator/simulator, you can run the project using the `npm start` command. This will start the Metro bundler and enable you to load and test your app with the development build just installed.

Start the project using the Expo dev client:

```sh
npm run start
```

To run the game on a specific platform, use the corresponding script:

```sh
npm run android # for Android
npm run ios # for iOS
npm run web # for Web (with react-game-engine)
```

## Project Structure

- `assets/`: Static assets including custom SVG components
  - `SVG/`: Custom game SVG components (BalloonSVG, QuitSVG)
- `game/`: Core game logic and types
  - `entities/`: Game entity components and factory functions
  - `systems/`: Game engine and loop logic
  - `types.ts`: TypeScript interfaces and type definitions
  - `global.d.ts`: Global type declarations
- `types/`: Additional TypeScript declarations (react-game-engine)
- Configuration files: `tsconfig.json`, `.eslintrc.js`, `babel.config.js`

## Example Game: Balloon Pop

This template includes a complete example game to demonstrate the architecture:

- **Gameplay**: Touch/click balloons before they hit the ground
- **Scoring**: +1 point for each balloon popped, -1 for missed balloons  
- **Features**: High score tracking, game states (start/playing/paused), quit confirmation
- **Cross-platform**: Works on mobile (touch) and web (mouse clicks)
- **Physics**: Matter.js integration for realistic balloon movement

## Creating Your Own Game

1. **Study the Example**: Review the Balloon Pop implementation to understand the architecture
2. **Replace Game Logic**: Modify `game/entities/entities.ts` to define your game entities
3. **Update Game Loop**: Edit `game/systems/GameLoop.ts` for your game's update logic
4. **Create New Entities**: Add entity components in `game/entities/` following the pattern
5. **Add Assets**: Replace or add SVG components and other assets
6. **Update Types**: Modify `game/types.ts` for your game's data structures
7. **Customize UI**: Edit `game/systems/GameEngine.tsx` for your game's interface
8. **Test & Build**: Use the provided build scripts for development and production

## Building and Submitting

The `eas.json` file is configured with profiles for local, development, preview, and production builds:

- `build:adhoc`: Build a local adhoc app binary locally
- `build:dev`: Build a development client app binary locally  
- `build:preview`: Build for preview channel
- `build:production`: Build for production channel
- `eas:preview`: Build and submit to preview channel automatically
- `eas:production`: Build and submit to production channel automatically
- `submit:preview`: Submit app to preview channel
- `submit:production`: Submit app to production channel
- `update`: Push over-the-air updates without app store resubmission

```sh
npm run build:adhoc      # Build for physical device testing
npm run build:dev        # Build for Expo development client  
npm run build:preview    # Build for preview
npm run build:production # Build for production
npm run eas:preview      # Build and submit for preview
npm run eas:production   # Build and submit for production
```

## Continuous Updates

With EAS Update, you can keep your app up to date without waiting for app store reviews:

```sh
npm run update           # Auto-update
npm run update:preview   # Update the preview channel
npm run update:production # Update the production channel
```

## Development Features

- **ESLint**: Pre-configured with TypeScript and React rules
- **TypeScript**: Strict mode with path mapping for clean imports
- **Cross-platform**: Shared game logic works on mobile and web
- **Hot Reload**: Fast development with Expo dev client
- **Matter.js**: Physics engine integration for realistic game mechanics

## Support

File issues on the repository issue tracker.

## Contributing

Contributions are welcome. Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

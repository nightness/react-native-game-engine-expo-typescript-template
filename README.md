# React Native Game Engine Expo TypeScript Template

This template is designed to jumpstart your game development with React Native using the react-native-game-engine library and TypeScript. It comes pre-configured with Expo Dev Client, allowing for a faster and more integrated development workflow.

## Getting Started

### Prerequisites

- Node.js
- Expo CLI
- eas-cli (for building and submitting your app using EAS Build and EAS Submit)

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
npm run web # for Web
```

## Project Structure

- `assets`: Contains static assets such as images and sounds.
- `game`: Core game logic.
  - `entities`: Game entity components (e.g., `Balloon.tsx`).
  - `systems`: Game system logic (e.g., `GameLoop.ts`).
- `types.ts`: TypeScript type definitions and interfaces.

## Modifying the Template

To modify the template and create your own game, follow these steps:

1. **Design Your Game**: Plan out your game's mechanics, rules, and entities.
2. **Create Game Entities**: Modify or create new TypeScript React components in the `game/entities` directory to represent your game's entities.
3. **Implement Game Logic**: Write the game logic inside the `game/systems` directory. The `GameLoop.ts` file is where you will define how your game state updates with time.
4. **Update Assets**: Add or replace assets in the `assets` folder as needed for your game.
5. **Define Types**: If you create new entities or systems, update the `types.ts` file to define the TypeScript types that correspond to your game's components.
6. **Integrate Entities and Systems**: Use the `GameEngine.tsx` component to integrate your entities and systems into the game loop.
7. **Launch the Game**: Use the Expo CLI to run and test your game.
8. **Build and Publish**: Once your game is complete and tested, follow the Expo documentation to build and publish your game to the iOS App Store and Google Play Store.

## Building and Submitting

The `eas.json` file is configured with profiles for local, development, preview, and production builds:

- `build:adhoc`: Build a local adhoc app binary locally.
- `build:dev`: Build a development client app binary locally.
- `build:preview`: Increment the app version, build and upload the app to Expo's preview channel.
- `build:production`: Increment the app version, build and upload the app to Expo's production channel.
- `eas:preview`: Build and submit the app to the preview channel automatically.
- `eas:production`: Build and submit the app to the production channel automatically.
- `submit:preview`: Submit the app to the preview channel.
- `submit:production`: Submit the app to the production channel.
- `update`: Update your app on the fly without needing to resubmit to app stores.

```sh
npm run build:adhoc # Build for physical device testing
npm run build:dev # Build for Expo development client
npm run build:preview # Build for preview
npm run eas:preview # Build and submit for preview
npm run eas:production # Build and submit for production
```

## Continuous Updates

With EAS Update, you can keep your app up to date without waiting for app store reviews:

```sh
npm run update:preview # Update the preview channel
npm run update:production # Update the production channel
```

## Support

File issues on the repository issue tracker.

## Contributing

Contributions are welcome. Please fork the repository and submit a pull request.

## License

This project is licensed under the Apache-2.0 License.

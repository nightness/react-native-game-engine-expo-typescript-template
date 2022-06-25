import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { entities, useEntities } from "@entities";
import { GameLoop } from "@systems";
import { IGameEngine } from "@types";

export default function AppView() {
    const [isRunning, setIsRunning] = React.useState(true);
    const [score, setScore] = useState(0);
    const [gameEngine, setGameEngine] = useState<IGameEngine | null>(null);
    const { entities } = useEntities();
    const { top } = useSafeAreaInsets();
    const topInset = top.valueOf();
    (global as any).topInset = topInset;

    const gameEntities = entities();
    const { engine, world } = gameEntities.physics;

    // console.log(topInset)

    // const gameEntities = entities();
    useEffect(() => {
        (global as any).gameEngine = gameEngine;        
    }, [gameEngine]);
    
    return (
        <SafeAreaView edges={['top']} style={[styles.container, {            
            
        }]}>            
            {/* @ts-ignore */}
            <GameEngine
                ref={(ref) => setGameEngine(ref as IGameEngine)}
                systems={[GameLoop]}
                entities={gameEntities}
                running={isRunning}
                onEvent={({ type, ...rest }: any) => {
                    switch (type) {
                        case "addToScore": {
                            setScore(score => score + 1);
                            break;
                        }
                    }
                }}
                style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
            >
                <TouchableOpacity
                    onPress={() => {
                        gameEngine?.swap(entities());
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 40,
                            fontWeight: "bold",
                            marginTop: topInset / 2,
                        }}
                    >
                        {score}
                    </Text>
                </TouchableOpacity>
            </GameEngine>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

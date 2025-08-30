import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Modal, Platform } from "react-native";
import { GameEngine as ReactGameEngine } from "react-native-game-engine";
import { GameEngine as WebGameEngine } from "react-game-engine";

import { entities } from "@entities";
import { GameLoop } from "@systems";
import { GameEngineEvent, IGameEngine } from "@types";
import { QuitSVG } from "@svg";

type GameState = 'start' | 'playing' | 'paused';

export default function GameEngine() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [gameEngine, setGameEngine] = useState<IGameEngine | null>(null);
  const [top, bottom, left, right] = [global.topInset, global.bottomInset, global.leftInset, global.rightInset]

  const gameEntities = entities();
  const GameEngineComponent = Platform.OS === 'web' ? WebGameEngine : ReactGameEngine;
  // const { engine, world } = gameEntities.physics;
  // const gameEntities = entities();

  useEffect(() => {
    if (gameEngine) {
      gameEngine.swap(entities());
    }
    global.gameEngine = gameEngine;
  }, [gameEngine]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    gameEngine?.start();
  };

  const pauseGame = () => {
    setGameState('paused');
    gameEngine?.stop();
  };

  const resumeGame = () => {
    setGameState('playing');
    gameEngine?.start();
  };

  const handleEscape = () => {
    if (gameState === 'playing') {
      pauseGame();
      setShowQuitModal(true);
    }
  };

  const handleQuitGame = () => {
    setShowQuitModal(false);
    setGameState('start');
    setScore(0);
    gameEngine?.stop();
  };

  const handleCancelQuit = () => {
    setShowQuitModal(false);
    resumeGame();
  };

  if (gameState === 'start') {
    return (
      <View style={styles.startScreen}>
        <View style={styles.titleContainer}>
          <Text style={styles.balloonEmoji}>🎈</Text>
          <Text style={styles.title}>Balloon Pop!</Text>
          <Text style={styles.balloonEmoji}>🎈</Text>
        </View>
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructions}>Tap the balloons before they hit the ground!</Text>
          <Text style={styles.subInstructions}>• Tap balloons = +1 point</Text>
          <Text style={styles.subInstructions}>• Miss a balloon = -1 point</Text>
        </View>
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>🚀 Start Game</Text>
        </TouchableOpacity>
        {highScore > 0 && (
          <View style={styles.highScoreContainer}>
            <Text style={styles.highScoreLabel}>🏆 High Score:</Text>
            <Text style={styles.highScoreValue}>{highScore}</Text>
          </View>
        )}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Good luck!</Text>
        </View>
      </View>
    );
  }

  return (
    <GameEngineComponent
      ref={(ref) => setGameEngine(ref as IGameEngine)}
      systems={[GameLoop]}
      entities={gameEntities}
      running={gameState === 'playing'}
      onEvent={({ type }: GameEngineEvent) => {
        switch (type) {
          case "addToScore": {
            setScore(prevScore => {
              const newScore = prevScore + 1;
              if (newScore > highScore) {
                setHighScore(newScore);
              }
              return newScore;
            });
            break;
          }
          case "subtractFromScore": {
            setScore(score => Math.max(0, score - 1));
            break;
          }
        }
      }}
      style={{ position: "absolute", top, left, right, bottom }}
    >
      <TouchableOpacity
        onPress={() => {
          if (gameState === 'playing') {
            pauseGame();
          } else {
            resumeGame();
          }
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 55,
          width: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 40,
            fontWeight: "bold",
            marginTop: 10,
            color: "#000000",
          }}
        >
          {/* {`Score: ${score}`} */}
          {gameState === 'playing' ? `Score: ${score}` : "Press to Resume"}
        </Text>
      </TouchableOpacity>
      
      {/* Exit Door Button */}
      {gameState === 'playing' && (
        <TouchableOpacity
          style={styles.exitDoorButton}
          onPress={handleEscape}
        >
          <QuitSVG color="#FFFFFF" size={20} />
        </TouchableOpacity>
      )}
      
      {gameState === 'paused' && (
        <TouchableOpacity
          style={styles.restartButton}
          onPress={() => {
            setGameState('start');
            setScore(0);
            gameEngine?.stop();
          }}
        >
          <Text style={styles.restartButtonText}>Paused</Text>
        </TouchableOpacity>
      )}

      {/* Quit Game Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showQuitModal}
        onRequestClose={() => setShowQuitModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>⚠️ Quit Game?</Text>
            <Text style={styles.modalText}>
              Are you sure you want to quit? Your current score will be lost.
            </Text>
            <Text style={styles.currentScoreText}>Current Score: {score}</Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={handleCancelQuit}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.quitButton]} 
                onPress={handleQuitGame}
              >
                <Text style={styles.quitButtonText}>Quit Game</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </GameEngineComponent>
  );
}

const styles = StyleSheet.create({
  startScreen: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#87CEEB',
    paddingHorizontal: 30,
    paddingVertical: 60,
    minHeight: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  balloonEmoji: {
    fontSize: 40,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  instructionsContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  instructions: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 26,
    fontWeight: '600',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subInstructions: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 5,
    fontWeight: '500',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  startButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginVertical: 20,
  },
  startButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontStyle: 'italic',
    textAlign: 'center',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  highScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 10,
  },
  highScoreLabel: {
    fontSize: 18,
    color: '#92400E',
    fontWeight: 'bold',
    marginRight: 10,
  },
  highScoreValue: {
    fontSize: 22,
    color: '#92400E',
    fontWeight: 'bold',
  },
  restartButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#4B5563',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exitDoorButton: {
    position: 'absolute',
    top: 8,
    left: 20,
    backgroundColor: '#DC2626',
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    maxWidth: '85%',
    minWidth: 280,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 15,
  },
  currentScoreText: {
    fontSize: 18,
    color: '#059669',
    fontWeight: 'bold',
    marginBottom: 25,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6B7280',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quitButton: {
    backgroundColor: '#DC2626',
  },
  quitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

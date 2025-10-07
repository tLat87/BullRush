import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import LoaderScreen from './screens/LoaderScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import MainMenuScreen from './screens/MainMenuScreen';
import LevelsScreen from './screens/LevelsScreen';
import GameScreen from './screens/GameScreen';
import BullRushScreen from './screens/BullRushScreen';
import GameOverScreen from './screens/GameOverScreen';
import BullRushSuccessScreen from './screens/BullRushSuccessScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import ShareAppScreen from './screens/ShareAppScreen';
import { StatsService } from './services/StatsService';
import { GameStats } from './data/gameData';

type Screen = 
  | 'Loader'
  | 'Onboarding'
  | 'MainMenu'
  | 'Levels'
  | 'Game'
  | 'BullRush'
  | 'GameOver'
  | 'BullRushSuccess'
  | 'Statistics'
  | 'ShareApp';

interface GameOverParams {
  result: 'timeout' | 'incorrect' | 'completed';
  score: number;
  level?: number;
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Loader');
  const [gameParams, setGameParams] = useState<any>({});
  const [stats, setStats] = useState<GameStats>({
    totalScore: 0,
    levelsCompleted: 0,
    bullRushCompleted: false,
    bullRushBestScore: 0,
    totalQuestionsAnswered: 0,
    correctAnswers: 0,
    averageTime: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const loadedStats = await StatsService.getStats();
    setStats(loadedStats);
  };

  const navigateTo = (screen: Screen, params?: any) => {
    setCurrentScreen(screen);
    if (params) {
      setGameParams(params);
    }
  };

  const handleGameOver = async (result: 'timeout' | 'incorrect' | 'completed', score: number, level?: number) => {
    if (level) {
      // Level game over
      const updatedStats = await StatsService.updateLevelCompletion(level, score);
      setStats(updatedStats);
      navigateTo('GameOver', { result, score, level });
    } else {
      // Bull Rush game over
      if (result === 'completed') {
        const updatedStats = await StatsService.updateBullRushCompletion(score);
        setStats(updatedStats);
        navigateTo('BullRushSuccess', { score });
      } else {
        navigateTo('GameOver', { result, score, level: 1 });
      }
    }
  };

  const handleQuestionResult = async (isCorrect: boolean, responseTime: number) => {
    const updatedStats = await StatsService.updateQuestionResult(isCorrect, responseTime);
    setStats(updatedStats);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Loader':
        return <LoaderScreen onComplete={() => navigateTo('Onboarding')} />;
      
      case 'Onboarding':
        return <OnboardingScreen onComplete={() => navigateTo('MainMenu')} />;
      
      case 'MainMenu':
        return <MainMenuScreen onNavigate={(screen: string) => navigateTo(screen as Screen)} />;
      
      case 'Levels':
        return (
          <LevelsScreen
            onNavigate={(screen: string, params?: any) => navigateTo(screen as Screen, params)}
            onBack={() => navigateTo('MainMenu')}
          />
        );
      
      case 'Game':
        return (
          <GameScreen
            level={gameParams.level}
            onGameOver={handleGameOver}
            onBack={() => navigateTo('Levels')}
          />
        );
      
      case 'BullRush':
        return (
          <BullRushScreen
            onGameOver={handleGameOver}
            onBack={() => navigateTo('MainMenu')}
          />
        );
      
      case 'GameOver':
        return (
          <GameOverScreen
            result={gameParams.result}
            score={gameParams.score}
            level={gameParams.level || 1}
            onTryAgain={() => {
              if (gameParams.level) {
                navigateTo('Game', { level: gameParams.level });
              } else {
                navigateTo('BullRush');
              }
            }}
            onBackHome={() => navigateTo('MainMenu')}
          />
        );
      
      case 'BullRushSuccess':
        return (
          <BullRushSuccessScreen
            score={gameParams.score}
            onShareTriumph={() => navigateTo('ShareApp')}
            onBackHome={() => navigateTo('MainMenu')}
          />
        );
      
      case 'Statistics':
        return (
          <StatisticsScreen
            stats={stats}
            onBack={() => navigateTo('MainMenu')}
          />
        );
      
      case 'ShareApp':
        return (
          <ShareAppScreen
            onBack={() => navigateTo('MainMenu')}
          />
        );
      
      default:
        return <LoaderScreen onComplete={() => navigateTo('Onboarding')} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A148C" />
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

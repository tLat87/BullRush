import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { gameData, Question } from '../data/gameData';
import BackgroundImage from '../components/BackgroundImage';
import ButtonWithBackground from '../components/ButtonWithBackground';
import TextBlockWithBackground from '../components/TextBlockWithBackground';

const { width, height } = Dimensions.get('window');

interface GameScreenProps {
  level: number;
  onGameOver: (result: 'timeout' | 'incorrect' | 'completed', score: number) => void;
  onBack: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ level, onGameOver, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(4);
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
  const [pulseAnim] = useState(new Animated.Value(1));
  const [shakeAnim] = useState(new Animated.Value(0));
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const levelData = gameData.find(l => l.id === level);
  const questions = levelData?.questions || [];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuestion]);

  const startTimer = () => {
    setTimeLeft(4);
    setIsGameActive(true);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Pulse animation for timer
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleTimeout = () => {
    setIsGameActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    onGameOver('timeout', score);
  };

  const handleAnswer = (selectedAnswer: string) => {
    if (!isGameActive) return;

    setIsGameActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 100);
      
      // Shake animation for correct answer
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      // Move to next question after a short delay
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
        } else {
          onGameOver('completed', score + 100);
        }
      }, 1000);
    } else {
      onGameOver('incorrect', score);
    }
  };

  const getTimerColor = () => {
    if (timeLeft <= 1) return '#F44336';
    if (timeLeft <= 2) return '#FF9800';
    return '#4CAF50';
  };

  const getTimerWidth = () => {
    return (timeLeft / 4) * 100;
  };

  if (!levelData || questions.length === 0) {
    return (
      <BackgroundImage>
        <View style={styles.content}>
          <Text style={styles.errorText}>Level not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </BackgroundImage>
    );
  }

  const question = questions[currentQuestion];

  return (
    <BackgroundImage>
      <StatusBar barStyle="light-content" backgroundColor="#4A148C" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { translateX: shakeAnim }
              ],
            },
          ]}
        >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>LEVEL {level}</Text>
        </View>
        
        {/* Timer */}
        <Animated.View style={[styles.timerContainer, { transform: [{ scale: pulseAnim }] }]}>
          <Text style={styles.timerText}>TIME LEFT: {timeLeft} SEC</Text>
          <View style={styles.timerBar}>
            <View 
              style={[
                styles.timerProgress, 
                { 
                  width: `${getTimerWidth()}%`,
                  backgroundColor: getTimerColor()
                }
              ]} 
            />
          </View>
        </Animated.View>
        
        {/* Question progress */}
        <Text style={styles.questionProgress}>
          QUESTION {currentQuestion + 1}/{questions.length}
        </Text>
        
        {/* Word to guess */}
        <TextBlockWithBackground
          imagePath="path/to/button_bg.png"
          width="100%"
          padding={20}
          textColor="#000"
          fontSize={18}
          fontWeight="bold"
          textAlign="center"
          backgroundColor="#FFD700"
          style={styles.wordContainer}
        >
          <Text style={styles.wordLabel}>Word to guess:</Text>
          {'\n'}
          <Text style={styles.wordText}>{question.word}</Text>
        </TextBlockWithBackground>
        
        {/* Answer options */}
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <ButtonWithBackground
              key={index}
              text={option}
              onPress={() => handleAnswer(option)}
              imagePath="path/to/button_bg.png" // You'll add this image
              width="100%"
              height={50}
              textColor="#000"
              fontSize={18}
              fontWeight="bold"
              disabled={!isGameActive}
              style={[
                styles.optionButton,
                !isGameActive && option === question.correctAnswer && styles.correctOption,
                !isGameActive && option !== question.correctAnswer && styles.incorrectOption,
              ]}
            />
          ))}
        </View>
        
        {/* Score */}
        {/* <TextBlockWithBackground
          imagePath="path/to/button_bg.png"
          width="auto"
          padding={15}
          textColor="#000"
          fontSize={18}
          fontWeight="bold"
          textAlign="center"
          backgroundColor="#FFD700"
          style={styles.scoreContainer}
        >
          Score: {score}
        </TextBlockWithBackground> */}
        </Animated.View>
      </ScrollView>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 24,
    fontFamily: 'Arial-BoldMT',
    color: '#FFD700',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Arial-BoldMT',
    fontWeight: 'bold',
    color: '#D7AA51',
    flex: 1,
    textAlign: 'center',
  },
  timerContainer: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 16,
    fontFamily: 'Arial-BoldMT',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  timerBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  timerProgress: {
    height: '100%',
    borderRadius: 4,
  },
  questionProgress: {
    fontSize: 16,
    fontFamily: 'Arial',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  wordContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  wordLabel: {
    fontSize: 16,
    fontFamily: 'Arial',
    color: '#333',
    marginBottom: 10,
  },
  wordText: {
    fontSize: 32,
    fontFamily: 'Arial-BoldMT',
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  scoreContainer: {
    marginTop: 20,
    alignSelf: 'center',
  },
  optionsContainer: {
    gap: 15,
    marginBottom: 30,
  },
  optionButton: {
    marginBottom: 0,
  },
  correctOption: {
    backgroundColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: '#F44336',
  },
  scoreText: {
    fontSize: 18,
    color: '#FFD700',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 100,
  },
});

export default GameScreen;

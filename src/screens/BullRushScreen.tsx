import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { bullRushQuestions, Question } from '../data/gameData';
import BackgroundImage from '../components/BackgroundImage';

const { width, height } = Dimensions.get('window');

interface BullRushScreenProps {
  onGameOver: (result: 'timeout' | 'incorrect' | 'completed', score: number) => void;
  onBack: () => void;
}

const BullRushScreen: React.FC<BullRushScreenProps> = ({ onGameOver, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(4);
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
  const [pulseAnim] = useState(new Animated.Value(1));
  const [shakeAnim] = useState(new Animated.Value(0));
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

    const question = bullRushQuestions[currentQuestion];
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
        if (currentQuestion < bullRushQuestions.length - 1) {
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

  const question = bullRushQuestions[currentQuestion];

  return (
    <BackgroundImage>
      <StatusBar barStyle="light-content" backgroundColor="#4A148C" />
      
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
          <Text style={styles.headerTitle}>BULL RUSH MODE</Text>
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
          QUESTION {currentQuestion + 1}/50
        </Text>
        
        {/* Word to guess */}
        <View style={styles.wordContainer}>
          <Text style={styles.wordLabel}>Word to guess:</Text>
          <Text style={styles.wordText}>{question.word}</Text>
        </View>
        
        {/* Answer options */}
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                !isGameActive && option === question.correctAnswer && styles.correctOption,
                !isGameActive && option !== question.correctAnswer && styles.incorrectOption,
              ]}
              onPress={() => handleAnswer(option)}
              disabled={!isGameActive}
            >
              <Text style={[
                styles.optionText,
                !isGameActive && option === question.correctAnswer && styles.correctOptionText,
                !isGameActive && option !== question.correctAnswer && styles.incorrectOptionText,
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Score */}
        <Text style={styles.scoreText}>Score: {score}</Text>
      </Animated.View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
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
    color: '#FFD700',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
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
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  wordContainer: {
    backgroundColor: '#D2B48C',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  wordLabel: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  wordText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 15,
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  correctOption: {
    backgroundColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: '#F44336',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  correctOptionText: {
    color: '#FFFFFF',
  },
  incorrectOptionText: {
    color: '#FFFFFF',
  },
  scoreText: {
    fontSize: 18,
    color: '#FFD700',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default BullRushScreen;

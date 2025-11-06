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
import { realityCheckExercises } from '../BullRushData/gameData';
import BackgroundImage from '../BullRushComponents/BackgroundImage';
import ButtonWithBackground from '../BullRushComponents/ButtonWithBackground';
import TextBlockWithBackground from '../BullRushComponents/TextBlockWithBackground';

const { width, height } = Dimensions.get('window');

interface LucidTrainingScreenProps {
  onRealityCheckComplete: () => void;
  onBack: () => void;
}

const LucidTrainingScreen: React.FC<LucidTrainingScreenProps> = ({ onRealityCheckComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
  const [checkAnim] = useState(new Animated.Value(1));
  const [pulseAnim] = useState(new Animated.Value(1));
  
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

    // Start pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [fadeAnim, slideAnim, pulseAnim]);

  const startTraining = () => {
    setIsActive(true);
    setCurrentStep(0);
    setTimeLeft(realityCheckExercises[0].duration);
    startTimer();
  };

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          nextStep();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const nextStep = () => {
    if (currentStep < realityCheckExercises.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeLeft(realityCheckExercises[currentStep + 1].duration);
    } else {
      // Complete one cycle, restart
      setCurrentStep(0);
      setTimeLeft(realityCheckExercises[0].duration);
      setSessionCount(prev => prev + 1);
    }
  };

  const completeTraining = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsActive(false);
    onRealityCheckComplete();
  };

  const pauseTraining = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsPaused(true);
  };

  const resumeTraining = () => {
    setIsPaused(false);
    startTimer();
  };

  const stopTraining = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    onBack();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRealityCheckAnimation = () => {
    const currentExercise = realityCheckExercises[currentStep];
    if (!currentExercise) return { scale: 1 };

    // Animate based on the type of reality check
    return {
      scale: checkAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.2],
      }),
    };
  };

  // Reality check animation
  useEffect(() => {
    if (isActive && !isPaused) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(checkAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(checkAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [currentStep, isActive, isPaused, checkAnim]);

  return (
    <BackgroundImage>
      <StatusBar barStyle="light-content" backgroundColor="#4A148C" />
      
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={stopTraining}>
            <Text style={styles.backButtonIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>LUCID TRAINING</Text>
        </View>

        {!isActive ? (
          /* Pre-training screen */
          <View style={styles.preTrainingContainer}>
            <Animated.View
              style={[
                styles.symbolContainer,
                { transform: [{ scale: pulseAnim }] },
              ]}
            >
              <Text style={styles.trainingEmoji}>👁️</Text>
            </Animated.View>
            
            <TextBlockWithBackground
              imagePath="path/to/button_bg.png"
              width="100%"
              padding={20}
              textColor="#000"
              fontSize={16}
              fontWeight="normal"
              textAlign="center"
              backgroundColor="#D7AA51"
              style={styles.infoBox}
            >
              <Text style={styles.trainingTitle}>Reality Check Training</Text>
              {'\n\n'}
              <Text style={styles.trainingDescription}>
                Develop critical awareness to recognize when you're dreaming. 
                Practice these reality checks throughout the day to build the habit 
                of questioning your reality.
              </Text>
              {'\n\n'}
              <Text style={styles.trainingDetails}>
                • Hand counting check{'\n'}
                • Finger through palm test{'\n'}
                • Clock reality check{'\n'}
                • Jump and float test{'\n'}
                • Repeat as many cycles as you like
              </Text>
            </TextBlockWithBackground>

            <ButtonWithBackground
              text="START TRAINING"
              onPress={startTraining}
              imagePath="path/to/button_bg.png"
              width="100%"
              height={50}
              textColor="#000"
              fontSize={18}
              fontWeight="bold"
              style={styles.startButton}
            />
          </View>
        ) : (
          /* Active training screen */
          <View style={styles.trainingContainer}>
            {/* Session counter */}
            <View style={styles.sessionContainer}>
              <Text style={styles.sessionText}>
                Cycles Completed: {sessionCount}
              </Text>
            </View>

            {/* Reality check circle */}
            <View style={styles.checkCircleContainer}>
              <Animated.View
                style={[
                  styles.checkCircle,
                  getRealityCheckAnimation(),
                ]}
              >
                <Text style={styles.checkStepText}>
                  {realityCheckExercises[currentStep]?.text || 'Reality Check'}
                </Text>
                <Text style={styles.checkCountText}>
                  {timeLeft}
                </Text>
              </Animated.View>
            </View>

            {/* Progress indicator */}
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Check {currentStep + 1} of {realityCheckExercises.length}
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${((currentStep + 1) / realityCheckExercises.length) * 100}%` }
                  ]} 
                />
              </View>
            </View>

            {/* Control buttons */}
            <View style={styles.controlsContainer}>
              {isPaused ? (
                <ButtonWithBackground
                  text="RESUME"
                  onPress={resumeTraining}
                  imagePath="path/to/button_bg.png"
                  width="30%"
                  height={50}
                  textColor="#000"
                  fontSize={16}
                  fontWeight="bold"
                />
              ) : (
                <ButtonWithBackground
                  text="PAUSE"
                  onPress={pauseTraining}
                  imagePath="path/to/button_bg.png"
                  width="30%"
                  height={50}
                  textColor="#000"
                  fontSize={16}
                  fontWeight="bold"
                />
              )}
              
              <ButtonWithBackground
                text="COMPLETE"
                onPress={completeTraining}
                imagePath="path/to/button_bg.png"
                width="30%"
                height={50}
                textColor="#000"
                fontSize={16}
                fontWeight="bold"
              />
              
              <ButtonWithBackground
                text="STOP"
                onPress={stopTraining}
                imagePath="path/to/button_bg.png"
                width="30%"
                height={50}
                textColor="#000"
                fontSize={16}
                fontWeight="bold"
              />
            </View>
          </View>
        )}
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
    marginBottom: 30,
  },
  backButton: {
    marginRight: 15,
  },
  backButtonIcon: {
    fontSize: 24,
    fontFamily: 'Arial-BoldMT',
    color: '#333',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Arial-BoldMT',
    fontWeight: 'bold',
    color: '#D7AA51',
    flex: 1,
    textAlign: 'center',
  },
  preTrainingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbolContainer: {
    marginBottom: 40,
  },
  trainingEmoji: {
    fontSize: 80,
    textAlign: 'center',
  },
  infoBox: {
    marginBottom: 40,
    width: '100%',
  },
  trainingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  trainingDescription: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 15,
  },
  trainingDetails: {
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
    lineHeight: 20,
  },
  startButton: {
    marginBottom: 20,
  },
  trainingContainer: {
    flex: 1,
  },
  sessionContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sessionText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
  checkCircleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    borderWidth: 4,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  checkStepText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  checkCountText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default LucidTrainingScreen;

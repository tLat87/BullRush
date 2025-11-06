import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { dreamTechniques, DreamStep } from '../BullRushData/gameData';
import BackgroundImage from '../BullRushComponents/BackgroundImage';
import ButtonWithBackground from '../BullRushComponents/ButtonWithBackground';
import TextBlockWithBackground from '../BullRushComponents/TextBlockWithBackground';

const { width, height } = Dimensions.get('window');

interface DreamJourneyScreenProps {
  techniqueId: number;
  onDreamRecord: (techniqueId: number, isLucid: boolean, category: string) => void;
  onBack: () => void;
}

const DreamJourneyScreen: React.FC<DreamJourneyScreenProps> = ({ 
  techniqueId, 
  onDreamRecord, 
  onBack 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
  const [pulseAnim] = useState(new Animated.Value(1));
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const technique = dreamTechniques.find(t => t.id === techniqueId);
  const steps = technique?.steps || [];

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

  const startJourney = () => {
    if (steps.length === 0) return;
    
    setIsActive(true);
    setCurrentStep(0);
    setTimeLeft(steps[0].duration);
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
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeLeft(steps[currentStep + 1].duration);
    } else {
      completeJourney();
    }
  };

  const completeJourney = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsActive(false);
    onDreamRecord(techniqueId, false, technique?.category || 'lucid-dreaming');
  };

  const pauseJourney = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsPaused(true);
  };

  const resumeJourney = () => {
    setIsPaused(false);
    startTimer();
  };

  const stopJourney = () => {
    Alert.alert(
      'Stop Dream Journey',
      'Are you sure you want to stop this dream technique session?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Stop', 
          style: 'destructive',
          onPress: () => {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            onBack();
          }
        }
      ]
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStepTypeEmoji = (type: string) => {
    switch (type) {
      case 'preparation': return '🛏️';
      case 'induction': return '🌙';
      case 'lucid': return '✨';
      case 'recall': return '🧠';
      case 'analysis': return '🔍';
      default: return '🌙';
    }
  };

  if (!technique) {
    return (
      <BackgroundImage>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Technique not found</Text>
          <ButtonWithBackground
            text="GO BACK"
            onPress={onBack}
            imagePath="path/to/button_bg.png"
            width="auto"
            height={50}
            textColor="#000"
            fontSize={18}
            fontWeight="bold"
          />
        </View>
      </BackgroundImage>
    );
  }

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
          <TouchableOpacity style={styles.backButton} onPress={stopJourney}>
            <Text style={styles.backButtonIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{technique.name}</Text>
        </View>

        {!isActive ? (
          /* Pre-journey screen */
          <View style={styles.preJourneyContainer}>
            <Animated.View
              style={[
                styles.symbolContainer,
                { transform: [{ scale: pulseAnim }] },
              ]}
            >
              <Text style={styles.dreamEmoji}>🌙</Text>
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
              <Text style={styles.techniqueTitle}>{technique.name}</Text>
              {'\n\n'}
              <Text style={styles.techniqueDescription}>{technique.description}</Text>
              {'\n\n'}
              <Text style={styles.techniqueDetails}>
                Duration: {technique.duration} minutes{'\n'}
                Difficulty: {technique.difficulty}{'\n'}
                Steps: {steps.length}
              </Text>
            </TextBlockWithBackground>

            <ButtonWithBackground
              text="BEGIN DREAM JOURNEY"
              onPress={startJourney}
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
          /* Active journey screen */
          <View style={styles.journeyContainer}>
            {/* Progress indicator */}
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Step {currentStep + 1} of {steps.length}
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${((currentStep + 1) / steps.length) * 100}%` }
                  ]} 
                />
              </View>
            </View>

            {/* Current step content */}
            <View style={styles.stepContainer}>
              <Text style={styles.stepEmoji}>
                {getStepTypeEmoji(steps[currentStep]?.type || 'preparation')}
              </Text>
              
              <TextBlockWithBackground
                imagePath="path/to/button_bg.png"
                width="100%"
                padding={20}
                textColor="#000"
                fontSize={18}
                fontWeight="normal"
                textAlign="center"
                backgroundColor="#D7AA51"
                style={styles.stepTextContainer}
              >
                <Text style={styles.stepText}>
                  {steps[currentStep]?.text || 'Dream technique step'}
                </Text>
              </TextBlockWithBackground>

              {/* Timer */}
              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>
                  {formatTime(timeLeft)}
                </Text>
              </View>
            </View>

            {/* Control buttons */}
            <View style={styles.controlsContainer}>
              {isPaused ? (
                <ButtonWithBackground
                  text="RESUME"
                  onPress={resumeJourney}
                  imagePath="path/to/button_bg.png"
                  width="45%"
                  height={50}
                  textColor="#000"
                  fontSize={16}
                  fontWeight="bold"
                />
              ) : (
                <ButtonWithBackground
                  text="PAUSE"
                  onPress={pauseJourney}
                  imagePath="path/to/button_bg.png"
                  width="45%"
                  height={50}
                  textColor="#000"
                  fontSize={16}
                  fontWeight="bold"
                />
              )}
              
              <ButtonWithBackground
                text="STOP"
                onPress={stopJourney}
                imagePath="path/to/button_bg.png"
                width="45%"
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  preJourneyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbolContainer: {
    marginBottom: 40,
  },
  dreamEmoji: {
    fontSize: 80,
    textAlign: 'center',
  },
  infoBox: {
    marginBottom: 40,
    width: '100%',
  },
  techniqueTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  techniqueDescription: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 15,
  },
  techniqueDetails: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    lineHeight: 20,
  },
  startButton: {
    marginBottom: 20,
  },
  journeyContainer: {
    flex: 1,
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
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepEmoji: {
    fontSize: 60,
    marginBottom: 30,
  },
  stepTextContainer: {
    marginBottom: 30,
    width: '100%',
  },
  stepText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    lineHeight: 28,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
  },
});

export default DreamJourneyScreen;

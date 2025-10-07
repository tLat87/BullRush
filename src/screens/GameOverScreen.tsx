import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import ButtonWithBackground from '../components/ButtonWithBackground';
import TextBlockWithBackground from '../components/TextBlockWithBackground';

const { width, height } = Dimensions.get('window');

interface GameOverScreenProps {
  result: 'timeout' | 'incorrect' | 'completed';
  score: number;
  level: number;
  onTryAgain: () => void;
  onBackHome: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ 
  result, 
  score, 
  level, 
  onTryAgain, 
  onBackHome 
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim]);

  const getResultContent = () => {
    switch (result) {
      case 'timeout':
        return {
          title: "THE RUSH GOT YOU!",
          message: "You ran out of time! The timer is relentless in the Bull Rush. Speed is key!",
          emoji: "⏰",
        };
      case 'incorrect':
        return {
          title: "BULL'S EYE MISSED!",
          message: "Incorrect connection. The Bull's Eye requires perfect focus. Try to find the most direct link!",
          emoji: "❌",
        };
      case 'completed':
        return {
          title: "LEVEL COMPLETED!",
          message: "Congratulations! You've mastered this level. Ready for the next challenge?",
          emoji: "🎉",
        };
      default:
        return {
          title: "GAME OVER",
          message: "Better luck next time!",
          emoji: "😔",
        };
    }
  };

  const content = getResultContent();

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
                { scale: scaleAnim }
              ],
            },
          ]}
        >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>LEVEL {level}</Text>
          <Text style={styles.timerText}>TIME LEF SEC</Text>
        </View>
        
        {/* Character image */}
        <View style={styles.characterContainer}>
         <Image source={require('../assets/img/man.png')} style={{width: 300, height: 200}} />
        </View>
        
        {/* Result message */}
        <TextBlockWithBackground
          imagePath="path/to/button_bg.png"
          width="100%"
          padding={20}
          textColor="#000"
          fontSize={18}
          fontWeight="bold"
          textAlign="center"
          backgroundColor="#FFD700"
          style={styles.messageContainer}
        >
          <Text style={styles.resultTitle}>{content.title}</Text>
          {'\n\n'}
          <Text style={styles.scoreText}>Score: {score}</Text>
          {'\n\n'}
          <Text style={styles.resultMessage}>{content.message}</Text>
        </TextBlockWithBackground>
        
        {/* Action buttons */}
        <View style={styles.buttonsContainer}>
          <ButtonWithBackground
            text="TRY AGAIN"
            onPress={onTryAgain}
            imagePath="path/to/button_bg.png" // You'll add this image
            width="100%"
            height={50}
            textColor="#000"
            fontSize={18}
            fontWeight="bold"
            style={styles.actionButton}
          />
          
          <ButtonWithBackground
            text="BACK HOME"
            onPress={onBackHome}
            imagePath="path/to/button_bg.png" // You'll add this image
            width="100%"
            height={50}
            textColor="#000"
            fontSize={18}
            fontWeight="bold"
            style={styles.actionButton}
          />
        </View>
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
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Arial-BoldMT',
    fontWeight: 'bold',
    color: '#D7AA51',
  },
  timerText: {
    fontSize: 16,
    fontFamily: 'Arial-BoldMT',
    fontWeight: 'bold',
    color: '#D7AA51',
  },
  characterContainer: {
    // marginBottom: 30,
  },
  characterEmoji: {
    fontSize: 80,
    textAlign: 'center',
  },
  messageContainer: {
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 24,
    fontFamily: 'Arial-BoldMT',
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
  },
  scoreText: {
    fontSize: 18,
    fontFamily: 'Arial-BoldMT',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  resultMessage: {
    fontSize: 16,
    fontFamily: 'Arial',
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonsContainer: {
    width: '100%',
    gap: 15,
  },
  actionButton: {
    marginBottom: 0,
  },
});

export default GameOverScreen;

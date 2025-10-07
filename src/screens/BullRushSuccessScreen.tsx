import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface BullRushSuccessScreenProps {
  score: number;
  onShareTriumph: () => void;
  onBackHome: () => void;
}

const BullRushSuccessScreen: React.FC<BullRushSuccessScreenProps> = ({ 
  score, 
  onShareTriumph, 
  onBackHome 
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [rotateAnim] = useState(new Animated.Value(0));

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

    // Rotate animation for medal
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, [fadeAnim, slideAnim, scaleAnim, rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A148C" />
      
      {/* Background gradient */}
      <View style={styles.backgroundGradient} />
      
      {/* Decorative elements */}
      <View style={styles.lanternRight} />
      
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
          <Text style={styles.headerTitle}>LEVEL 1</Text>
          <Text style={styles.timerText}>TIME LEF SEC</Text>
        </View>
        
        {/* Medal */}
        <Animated.View 
          style={[
            styles.medalContainer,
            { transform: [{ rotate: spin }] }
          ]}
        >
          <Text style={styles.medalEmoji}>🏆</Text>
          <Text style={styles.bullEmoji}>🐂</Text>
          <Text style={styles.targetEmoji}>🎯</Text>
        </Animated.View>
        
        {/* Success message */}
        <View style={styles.messageContainer}>
          <Text style={styles.successTitle}>BULL RUSH MASTER!</Text>
          <Text style={styles.scoreText}>Score: {score}</Text>
          <Text style={styles.successMessage}>
            You conquered all 50 words under the relentless 4-second pressure. 
            Your speed and focus are unmatched! You are the new Bull Rush standard.
          </Text>
        </View>
        
        {/* Action buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.shareButton} onPress={onShareTriumph}>
            <Text style={styles.shareButtonText}>SHARE YOUR TRIUMPH</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.homeButton} onPress={onBackHome}>
            <Text style={styles.homeButtonText}>BACK HOME</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      
      {/* Chinese character */}
      <Text style={styles.chineseChar}>福</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A148C',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#6A1B9A',
  },
  lanternRight: {
    position: 'absolute',
    top: height * 0.05,
    right: width * 0.05,
    width: 40,
    height: 50,
    backgroundColor: '#DC143C',
    borderRadius: 20,
    opacity: 0.8,
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
    fontWeight: 'bold',
    color: '#FFD700',
  },
  timerText: {
    fontSize: 16,
    color: '#FFD700',
  },
  medalContainer: {
    position: 'relative',
    marginBottom: 30,
    alignItems: 'center',
  },
  medalEmoji: {
    fontSize: 100,
    textAlign: 'center',
  },
  bullEmoji: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 30,
  },
  targetEmoji: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 30,
  },
  messageContainer: {
    backgroundColor: '#FFD700',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  successMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonsContainer: {
    width: '100%',
    gap: 15,
  },
  shareButton: {
    backgroundColor: '#FFD700',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  shareButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  homeButton: {
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  chineseChar: {
    position: 'absolute',
    bottom: height * 0.05,
    left: width * 0.5 - 30,
    fontSize: 60,
    color: 'rgba(255, 255, 255, 0.3)',
    opacity: 0.5,
  },
});

export default BullRushSuccessScreen;


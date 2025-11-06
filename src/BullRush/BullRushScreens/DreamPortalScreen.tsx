import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import BackgroundImage from '../BullRushComponents/BackgroundImage';

const { width, height } = Dimensions.get('window');

interface DreamPortalScreenProps {
  onComplete: () => void;
}

const DreamPortalScreen: React.FC<DreamPortalScreenProps> = ({ onComplete }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.5));
  const [pulseAnim] = useState(new Animated.Value(1));
  const [rotateAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    // Start pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
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

    // Start rotating animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();

    // Complete portal after 4 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, pulseAnim, rotateAnim, onComplete]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <BackgroundImage>
      <StatusBar barStyle="light-content" backgroundColor="#4A148C" />
      
      {/* Main content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Dream portal symbol */}
        <Animated.View
          style={[
            styles.portalContainer,
            { 
              transform: [
                { scale: pulseAnim },
                { rotate: spin }
              ] 
            },
          ]}
        >
          {/* <Image source={require('../BullRushAssets/img/1a39bc0f6b51f8d31296f5ff45e6a69d1ec8c82b.png')} style={{width: 200, height: 150}} /> */}
        </Animated.View>
        
        {/* App title */}
        <Text style={styles.title}>DreamCatcher</Text>
        
        {/* Portal text */}
        <Text style={styles.portalText}>Entering the realm of dreams and lucid consciousness</Text>
        
        {/* Loading indicator */}
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBar} />
        </View>
      </Animated.View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  portalContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  portalText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
    paddingHorizontal: 40,
    lineHeight: 24,
  },
  loadingContainer: {
    width: 200,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingBar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
});

export default DreamPortalScreen;

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

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [slideAnim] = useState(new Animated.Value(0));

  const panels = [
    {
      title: "WELCOME TO BULL'S EYE RUSH",
      graphic: require('../assets/img/1a39bc0f6b51f8d31296f5ff45e6a69d1ec8c82b.png'),
      description: "Your goal is simple: Find the Bull's Eye—the one word that connects the two others. But there's a catch: You're racing against the clock. A relentless 4-second timer keeps the Rush pressure on every question. Think fast, or the Bull gets you!"
    },
    {
      title: "MASTER THE LEVELS",
      graphic: require('../assets/img/3.png'),
      description: "Sharpen Your Horns Start with Level Mode. There are 10 Levels, each containing 5 association questions. You must get all 5 words correct before the timer runs out to unlock the next level. Difficulty increases as you progress."
    },
    {
      title: "THE BULL RUSH CHALLENGE",
      graphic: require('../assets/img/2.png'),
      description: "The Ultimate Test Ready for the big league? The Bull Rush Challenge throws all 50 words from the entire game at you, one after the other. The Rule: You keep playing until your very first mistake or time-out."
    },
    {
      title: "READY TO RIDE THE RUSH?",
      graphic: require('../assets/img/4.png'),
      description: "Speed. Focus. Logic. Find the connection, beat the timer, and claim your spot as the Bull's Eye Master!"
    }
  ];

  const nextPanel = () => {
    if (currentPanel < panels.length - 1) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 50,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ]).start();
      setCurrentPanel(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const currentPanelData = panels[currentPanel];

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
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
        {/* Panel Content */}
        <View style={styles.panel}>
          {/* Title */}
          {/* <Text style={styles.panelTitle}>{currentPanelData.title}</Text> */}
          
          {/* Graphic */}
          <View style={styles.graphicContainer}>
            <Image source={currentPanelData.graphic} style={{width: 300, height: 200}} />
          </View>
          
          {/* Description */}
          <TextBlockWithBackground
            imagePath="path/to/button_bg.png"
            width="100%"
            padding={20}
            textColor="#000"
            fontSize={16}
            fontWeight="normal"
            textAlign="center"
            backgroundColor="#D7AA51"
            style={styles.descriptionBox}
          >
            <Text style={styles.titleText}>{currentPanelData.title}</Text>
            {'\n\n'}
            <Text style={styles.descriptionText}>{currentPanelData.description}</Text>
          </TextBlockWithBackground>
          
            {/* Next Button */}
            <ButtonWithBackground
              text="NEXT"
              onPress={nextPanel}
              imagePath="path/to/button_bg.png" // You'll add this image
              width="auto"
              height={50}
              textColor="#000"
              fontSize={18}
              fontWeight="bold"
              style={styles.nextButton}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  panel: {
    width: '100%',
    alignItems: 'center',
  },
  panelTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 40,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  graphicContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  graphicEmoji: {
    fontSize: 120,
    textAlign: 'center',
  },
  descriptionBox: {
    marginBottom: 40,
    width: '100%',
  },
  titleText: {
    fontSize: 18,
    fontFamily: 'Arial-BoldMT',
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: 'Arial',
    color: '#000',
    textAlign: 'center',
    lineHeight: 24,
  },
  nextButton: {
    marginTop: 0,
  },
});

export default OnboardingScreen;

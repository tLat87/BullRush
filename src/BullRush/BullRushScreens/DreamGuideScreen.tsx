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
import BackgroundImage from '../BullRushComponents/BackgroundImage';
import ButtonWithBackground from '../BullRushComponents/ButtonWithBackground';
import TextBlockWithBackground from '../BullRushComponents/TextBlockWithBackground';

const { width, height } = Dimensions.get('window');

interface DreamGuideScreenProps {
  onComplete: () => void;
}

const DreamGuideScreen: React.FC<DreamGuideScreenProps> = ({ onComplete }) => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [slideAnim] = useState(new Animated.Value(0));

  const panels = [
    {
      title: "WELCOME TO DREAMCATCHER",
      graphic: require('../BullRushAssets/img/1a39bc0f6b51f8d31296f5ff45e6a69d1ec8c82b.png'),
      description: "Discover the fascinating world of lucid dreaming and dream exploration. Learn to control your dreams, enhance dream recall, and unlock the mysteries of your subconscious mind."
    },
    {
      title: "MASTER LUCID DREAMING",
      graphic: require('../BullRushAssets/img/3.png'),
      description: "Learn powerful techniques to become aware within your dreams. Practice reality checks, use mnemonic induction, and develop the ability to control your dream experiences."
    },
    {
      title: "ENHANCE DREAM RECALL",
      graphic: require('../BullRushAssets/img/2.png'),
      description: "Improve your ability to remember dreams with proven techniques. Keep a dream journal, set intentions, and develop stronger connections to your dream world."
    },
    {
      title: "BEGIN YOUR DREAM JOURNEY",
      graphic: require('../BullRushAssets/img/4.png'),
      description: "Start your adventure into the realm of dreams. Every night is an opportunity for exploration, growth, and discovery in your personal dream universe."
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
              text="CONTINUE"
              onPress={nextPanel}
              // onPress={()=>{}}
              imagePath="path/to/button_bg.png"
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
  graphicContainer: {
    marginBottom: 40,
    alignItems: 'center',
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

export default DreamGuideScreen;

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
  Share,
  Alert,
} from 'react-native';
import BackgroundImage from '../BullRushComponents/BackgroundImage';
import ButtonWithBackground from '../BullRushComponents/ButtonWithBackground';
import TextBlockWithBackground from '../BullRushComponents/TextBlockWithBackground';

const { width, height } = Dimensions.get('window');

interface DreamHubScreenProps {
  onNavigate: (screen: string) => void;
}

const DreamHubScreen: React.FC<DreamHubScreenProps> = ({ onNavigate }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));

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
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleShareApp = async () => {
    try {
      const result = await Share.share({
        message: '🌙 DREAMCATCHER 🌟\n\nI just discovered the most amazing lucid dreaming app!\n\n✨ LUCID DREAMING TECHNIQUES\n🌙 DREAM RECALL ENHANCEMENT\n🔮 REALITY CHECK TRAINING\n📊 DREAM ANALYTICS\n\nStart your journey into the dream world today!\n\nDownload now!',
        title: 'DreamCatcher - Lucid Dreaming App',
      });

      if (result.action === Share.sharedAction) {
        console.log('App shared successfully');
      }
    } catch (error) {
      console.error('Error sharing app:', error);
      Alert.alert('Error', 'Failed to share the app. Please try again.');
    }
  };

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
        {/* Logo section */}
        <View style={styles.logoContainer}>
          <Image source={require('../BullRushAssets/img/1a39bc0f6b51f8d31296f5ff45e6a69d1ec8c82b.png')} style={{width: 200, height: 150}} />
        </View>
        
        {/* Welcome banner */}
        <TextBlockWithBackground
          imagePath="path/to/button_bg.png"
          width="100%"
          padding={20}
          textColor="#000"
          fontSize={16}
          fontWeight="bold"
          textAlign="center"
          backgroundColor="#D7AA51"
          style={styles.welcomeBanner}
        >
          <Text style={styles.welcomeText}>Welcome to your dream universe</Text>
        </TextBlockWithBackground>
        
        {/* Navigation buttons */}
        <View style={styles.buttonsContainer}>
          <ButtonWithBackground
            text="DREAM TECHNIQUES"
            onPress={() => onNavigate('DreamTechniques')}
            imagePath="path/to/button_bg.png"
            width="100%"
            height={50}
            textColor="#000"
            fontSize={18}
            fontWeight="bold"
            style={styles.menuButton}
          />
          
          <ButtonWithBackground
            text="LUCID TRAINING"
            onPress={() => onNavigate('LucidTraining')}
            imagePath="path/to/button_bg.png"
            width="100%"
            height={50}
            textColor="#000"
            fontSize={18}
            fontWeight="bold"
            style={styles.menuButton}
          />
          
          <ButtonWithBackground
            text="DREAM ANALYTICS"
            onPress={() => onNavigate('DreamAnalytics')}
            imagePath="path/to/button_bg.png"
            width="100%"
            height={50}
            textColor="#000"
            fontSize={18}
            fontWeight="bold"
            style={styles.menuButton}
          />
          
          <ButtonWithBackground
            text="DREAM SHARING"
            onPress={() => onNavigate('DreamSharing')}
            imagePath="path/to/button_bg.png"
            width="100%"
            height={50}
            textColor="#000"
            fontSize={18}
            fontWeight="bold"
            style={styles.menuButton}
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeBanner: {
    marginBottom: 30,
    width: '100%',
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    gap: 15,
  },
  menuButton: {
    marginBottom: 0,
  },
});

export default DreamHubScreen;

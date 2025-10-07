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
import BackgroundImage from '../components/BackgroundImage';
import ButtonWithBackground from '../components/ButtonWithBackground';
import TextBlockWithBackground from '../components/TextBlockWithBackground';

const { width, height } = Dimensions.get('window');

interface MainMenuScreenProps {
  onNavigate: (screen: string) => void;
}

const MainMenuScreen: React.FC<MainMenuScreenProps> = ({ onNavigate }) => {
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
        message: '🐂 BULL\'S EYE RUSH 🎯\n\nI just discovered the most intense word association game!\n\n🔥 4-SECOND RUSH MECHANIC\n🎯 50 WORDS ACROSS 10 LEVELS\n⚡ THE BULL RUSH CHALLENGE\n\nCan you find the perfect Bull\'s Eye before The Rush overtakes you?\n\nDownload now!',
        title: 'Bull\'s Eye Rush - Word Association Game',
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
          <Image source={require('../assets/img/1a39bc0f6b51f8d31296f5ff45e6a69d1ec8c82b.png')} style={{width: 300, height: 200}} />
        </View>
        
        {/* Welcome banner */}
        <Image source={require('../assets/img/Frame113.png')} style={{width: 300, height: 100, borderRadius: 10, marginBottom: 30}} />
        
        {/* Navigation buttons */}
        <View style={styles.buttonsContainer}>
          <ButtonWithBackground
            text="BULLS EYE"
            onPress={() => onNavigate('Levels')}
            imagePath="path/to/button_bg.png" // You'll add this image
            width="100%"
            height={50}
            textColor="#000"
            fontSize={18}
            fontWeight="bold"
            style={styles.menuButton}
          />
          
          <ButtonWithBackground
            text="BULLS RUSH"
            onPress={() => onNavigate('BullRush')}
            imagePath="path/to/button_bg.png" // You'll add this image
            width="100%"
            height={50}
            textColor="#000"
            fontSize={18}
            fontWeight="bold"
            style={styles.menuButton}
          />
          
          <ButtonWithBackground
            text="MY STATISTICS"
            onPress={() => onNavigate('Statistics')}
            imagePath="path/to/button_bg.png" // You'll add this image
            width="100%"
            height={50}
            textColor="#000"
            fontSize={18}
            fontWeight="bold"
            style={styles.menuButton}
          />
          
          <ButtonWithBackground
            text="SHARE APP"
            onPress={handleShareApp}
            imagePath="path/to/button_bg.png" // You'll add this image
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
    position: 'relative',
  },
  bullContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  bullEmoji: {
    fontSize: 80,
    textAlign: 'center',
  },
  targetEmoji: {
    position: 'absolute',
    top: 10,
    right: -10,
    fontSize: 30,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Arial-BoldMT',
    fontWeight: 'bold',
    color: '#D7AA51',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  sideBulls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginTop: 10,
  },
  sideBullEmoji: {
    fontSize: 30,
  },
  welcomeBanner: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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

export default MainMenuScreen;
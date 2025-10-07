import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  Share,
  Alert,
  ScrollView,
} from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import ButtonWithBackground from '../components/ButtonWithBackground';
import TextBlockWithBackground from '../components/TextBlockWithBackground';

const { width, height } = Dimensions.get('window');

interface ShareAppScreenProps {
  onBack: () => void;
}

const ShareAppScreen: React.FC<ShareAppScreenProps> = ({ onBack }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
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

  const shareMessage = `🐂 BULL'S EYE RUSH 🎯

I just discovered the most intense word association game! 

🔥 4-SECOND RUSH MECHANIC
🎯 50 WORDS ACROSS 10 LEVELS  
⚡ THE BULL RUSH CHALLENGE

Can you find the perfect Bull's Eye—the single word that makes the most sense—before The Rush overtakes you?

Download now and test your speed and logic under extreme pressure!

#BullsEyeRush #WordGame #Challenge #Speed #Logic`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: shareMessage,
        title: "Bull's Eye Rush - Word Association Game",
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share the app');
    }
  };

  const handleShareTriumph = async () => {
    const triumphMessage = `🏆 BULL RUSH MASTER! 🏆

I just conquered all 50 words in Bull's Eye Rush under the relentless 4-second pressure! 

My speed and focus are unmatched! I am the new Bull Rush standard! 🐂⚡

Can you beat my score? Download Bull's Eye Rush now!

#BullsEyeRush #BullRushMaster #WordGame #Challenge`;

    try {
      await Share.share({
        message: triumphMessage,
        title: "Bull Rush Master Achievement",
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share your triumph');
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
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ],
            },
          ]}
        >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>SHARE APP</Text>
        </View>
        
        {/* Main content */}
        <View style={styles.mainContent}>
          {/* App icon and title */}
          <View style={styles.appInfo}>
            <View style={styles.appIconContainer}>
              <Text style={styles.bullEmoji}>🐂</Text>
              <Text style={styles.targetEmoji}>🎯</Text>
            </View>
            <Text style={styles.appTitle}>BULL'S EYE RUSH</Text>
            <Text style={styles.appSubtitle}>The Ultimate Word Association Challenge</Text>
          </View>
          
          {/* Share message preview */}
          <TextBlockWithBackground
            imagePath="path/to/button_bg.png"
            width="100%"
            padding={20}
            textColor="#000"
            fontSize={16}
            fontWeight="normal"
            textAlign="center"
            backgroundColor="#FFD700"
            style={styles.messagePreview}
          >
            <Text style={styles.previewTitle}>Share Message:</Text>
            {'\n\n'}
            <Text style={styles.previewText}>
              🐂 BULL'S EYE RUSH 🎯{'\n\n'}
              I just discovered the most intense word association game!{'\n\n'}
              🔥 4-SECOND RUSH MECHANIC{'\n'}
              🎯 50 WORDS ACROSS 10 LEVELS{'\n'}
              ⚡ THE BULL RUSH CHALLENGE{'\n\n'}
              Can you find the perfect Bull's Eye before The Rush overtakes you?
            </Text>
          </TextBlockWithBackground>
          
        {/* Share buttons */}
        <View style={styles.buttonsContainer}>
          <ButtonWithBackground
            text="📱 SHARE APP"
            onPress={handleShare}
            imagePath="path/to/button_bg.png" // You'll add this image
            width="100%"
            height={50}
            textColor="#000"
            fontSize={18}
            fontWeight="bold"
            style={styles.shareButton}
          />
          
          <ButtonWithBackground
            text="🏆 SHARE TRIUMPH"
            onPress={handleShareTriumph}
            imagePath="path/to/button_bg.png" // You'll add this image
            width="100%"
            height={50}
            textColor="#000"
            fontSize={18}
            fontWeight="bold"
            style={styles.triumphButton}
          />
        </View>
          
          {/* Features highlight */}
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Why Share Bull's Eye Rush?</Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Text style={styles.featureEmoji}>⚡</Text>
                <Text style={styles.featureText}>Fastest word game timer</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureEmoji}>🎯</Text>
                <Text style={styles.featureText}>Perfect for quick challenges</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureEmoji}>🏆</Text>
                <Text style={styles.featureText}>Global leaderboards</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureEmoji}>🔥</Text>
                <Text style={styles.featureText}>Intense pressure gameplay</Text>
              </View>
            </View>
          </View>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 24,
    fontFamily: 'Arial-BoldMT',
    color: '#FFD700',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Arial-BoldMT',
    fontWeight: 'bold',
    color: '#D7AA51',
    flex: 1,
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
  },
  appInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appIconContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  bullEmoji: {
    fontSize: 60,
    textAlign: 'center',
  },
  targetEmoji: {
    position: 'absolute',
    top: 5,
    right: -5,
    fontSize: 20,
  },
  appTitle: {
    fontSize: 24,
    fontFamily: 'Arial-BoldMT',
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 5,
  },
  appSubtitle: {
    fontSize: 14,
    fontFamily: 'Arial',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.8,
  },
  messagePreview: {
    marginBottom: 30,
  },
  previewTitle: {
    fontSize: 16,
    fontFamily: 'Arial-BoldMT',
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  previewText: {
    fontSize: 14,
    fontFamily: 'Arial',
    color: '#FFFFFF',
    lineHeight: 20,
  },
  buttonsContainer: {
    gap: 15,
    marginBottom: 30,
  },
  shareButton: {
    marginBottom: 0,
  },
  triumphButton: {
    marginBottom: 0,
  },
  featuresContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
  },
  featureList: {
    gap: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureEmoji: {
    fontSize: 20,
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
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

export default ShareAppScreen;

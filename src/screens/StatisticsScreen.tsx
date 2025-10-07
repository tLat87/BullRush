import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  Image,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import { GameStats } from '../data/gameData';
import BackgroundImage from '../components/BackgroundImage';
import ButtonWithBackground from '../components/ButtonWithBackground';
import TextBlockWithBackground from '../components/TextBlockWithBackground';

const { width, height } = Dimensions.get('window');

interface StatisticsScreenProps {
  stats: GameStats;
  onBack: () => void;
}

const StatisticsScreen: React.FC<StatisticsScreenProps> = ({ stats, onBack }) => {
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

  const accuracy = stats.totalQuestionsAnswered > 0 
    ? Math.round((stats.correctAnswers / stats.totalQuestionsAnswered) * 100) 
    : 0;

  const handleShareStats = async () => {
    try {
      const bullRushStatus = stats.bullRushCompleted ? '🏆 BULL RUSH MASTER!' : '⚡ Bull Rush in progress';
      
      const message = `🐂 MY BULL'S EYE RUSH STATS 🎯\n\n` +
        `📊 Levels Passed: ${stats.levelsCompleted}\n` +
        `💯 Best Score: ${stats.totalScore}\n` +
        `${bullRushStatus}\n` +
        `⏱️ Best Time: ${stats.averageTime.toFixed(2)} seconds\n\n` +
        `Can you beat my score? Download Bull's Eye Rush now!`;

      const result = await Share.share({
        message,
        title: 'My Bull\'s Eye Rush Statistics',
      });

      if (result.action === Share.sharedAction) {
        console.log('Stats shared successfully');
      }
    } catch (error) {
      console.error('Error sharing stats:', error);
      Alert.alert('Error', 'Failed to share statistics. Please try again.');
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
        {/* Statistics Panel - exactly like photo */}
        <View style={styles.statisticsPanel}>
          {/* Golden Banner with back arrow and title */}
          <View style={styles.goldenBanner}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.bannerTitle}>STATISTICS</Text>
          </View>
          
          {/* Central Bull Emblem */}
          <View style={styles.emblemContainer}>
            <Image 
              source={require('../assets/img/4.png')} // You'll add this image
              style={styles.bullEmblem}
            />
          </View>
          
          {/* Statistics Text */}
          <TextBlockWithBackground
            imagePath="path/to/button_bg.png"
            width="100%"
            padding={20}
            textColor="#333"
            fontSize={16}
            fontWeight="500"
            textAlign="center"
            backgroundColor="#D7AA51"
            style={styles.statsTextContainer}
          >
            <Text style={styles.statText}>Levels Passed: {stats.levelsCompleted}</Text>
            {'\n'}
            <Text style={styles.statText}>Best score: {stats.totalScore}</Text>
            {'\n'}
            <Text style={styles.statText}>Bull rush passed: {stats.bullRushCompleted ? 'Yes' : 'No'}</Text>
            {'\n'}
            <Text style={styles.statText}>Best time: {stats.averageTime.toFixed(2)} second</Text>
          </TextBlockWithBackground>
        </View>
        
        {/* Action buttons */}
        <View style={styles.buttonsContainer}>
          <ButtonWithBackground
            text="SHARE"
            onPress={handleShareStats}
            imagePath="path/to/button_bg.png" // You'll add this image
            width="100%"
            height={50}
            textColor="#000"
            fontSize={18}
            fontWeight="bold"
            style={styles.shareButton}
          />
          
          <TouchableOpacity style={styles.backHomeButton} onPress={onBack}>
            <Text style={styles.backHomeText}>BACK HOME</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
  },
  statisticsPanel: {
    // backgroundColor: '#D7AA51', // Parchment color like in photo
    borderRadius: 20,
    padding: 0,
    marginBottom: 30,
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  goldenBanner: {
    backgroundColor: '#D7AA51',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  backArrow: {
    fontSize: 24,
    fontFamily: 'Arial-BoldMT',
    color: '#333',
    fontWeight: 'bold',
  },
  bannerTitle: {
    fontSize: 20,
    fontFamily: 'Arial-BoldMT',
    fontWeight: 'bold',
    color: '#7D765D',
    flex: 1,
    textAlign: 'center',
  },
  emblemContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bullEmblem: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  statsTextContainer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  statText: {
    fontSize: 16,
    fontFamily: 'Arial',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
  },
  shareButton: {
    marginBottom: 15,
  },
  backHomeButton: {
    paddingVertical: 10,
  },
  backHomeText: {
    fontSize: 16,
    fontFamily: 'Arial-BoldMT',
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default StatisticsScreen;

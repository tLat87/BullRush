import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import { DreamStats } from '../BullRushData/gameData';
import BackgroundImage from '../BullRushComponents/BackgroundImage';
import ButtonWithBackground from '../BullRushComponents/ButtonWithBackground';
import TextBlockWithBackground from '../BullRushComponents/TextBlockWithBackground';

const { width, height } = Dimensions.get('window');

interface DreamAnalyticsScreenProps {
  stats: DreamStats;
  onBack: () => void;
}

const DreamAnalyticsScreen: React.FC<DreamAnalyticsScreenProps> = ({ stats, onBack }) => {
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

  const handleShareProgress = async () => {
    try {
      const result = await Share.share({
        message: `🌙 My Dream Journey 📊\n\n✨ ${stats.totalDreams} dreams recorded\n🌟 ${stats.lucidDreams} lucid dreams achieved\n🧠 ${Math.round(stats.dreamRecallRate)}% dream recall rate\n🔥 ${stats.currentStreak} day streak\n👁️ ${stats.realityChecksToday} reality checks today\n\nJoin me on this amazing dream adventure! 🌟`,
        title: 'My Dream Analytics',
      });

      if (result.action === Share.sharedAction) {
        console.log('Progress shared successfully');
      }
    } catch (error) {
      console.error('Error sharing progress:', error);
      Alert.alert('Error', 'Failed to share your progress. Please try again.');
    }
  };

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return '🔥';
    if (streak >= 14) return '⭐';
    if (streak >= 7) return '🌟';
    if (streak >= 3) return '✨';
    return '🌙';
  };

  const getMotivationalMessage = () => {
    if (stats.lucidDreams > 0) {
      return "Incredible! You've achieved lucid dreams! You're a true dream explorer.";
    } else if (stats.currentStreak >= 7) {
      return "Amazing progress! You've built a strong dream practice routine.";
    } else if (stats.totalDreams > 10) {
      return "Great job! You're developing excellent dream recall skills.";
    } else {
      return "Every dream journey begins with a single step. Keep exploring!";
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
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Text style={styles.backButtonIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>DREAM ANALYTICS</Text>
          </View>

          {/* Motivational message */}
          <TextBlockWithBackground
            imagePath="path/to/button_bg.png"
            width="100%"
            padding={20}
            textColor="#000"
            fontSize={16}
            fontWeight="normal"
            textAlign="center"
            backgroundColor="#D7AA51"
            style={styles.motivationBox}
          >
            <Text style={styles.motivationText}>
              {getMotivationalMessage()}
            </Text>
          </TextBlockWithBackground>

          {/* Main stats grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>🌙</Text>
              <Text style={styles.statNumber}>{stats.totalDreams}</Text>
              <Text style={styles.statLabel}>Total Dreams</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>✨</Text>
              <Text style={styles.statNumber}>{stats.lucidDreams}</Text>
              <Text style={styles.statLabel}>Lucid Dreams</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>{getStreakEmoji(stats.currentStreak)}</Text>
              <Text style={styles.statNumber}>{stats.currentStreak}</Text>
              <Text style={styles.statLabel}>Current Streak</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>🧠</Text>
              <Text style={styles.statNumber}>{Math.round(stats.dreamRecallRate)}%</Text>
              <Text style={styles.statLabel}>Recall Rate</Text>
            </View>
          </View>

          {/* Additional stats */}
          <View style={styles.additionalStats}>
            <View style={styles.additionalStatItem}>
              <Text style={styles.additionalStatLabel}>Best Streak</Text>
              <Text style={styles.additionalStatValue}>
                {stats.longestStreak} days
              </Text>
            </View>

            <View style={styles.additionalStatItem}>
              <Text style={styles.additionalStatLabel}>Techniques Completed</Text>
              <Text style={styles.additionalStatValue}>
                {stats.techniquesCompleted} different techniques
              </Text>
            </View>

            <View style={styles.additionalStatItem}>
              <Text style={styles.additionalStatLabel}>Favorite Category</Text>
              <Text style={styles.additionalStatValue}>
                {stats.favoriteCategory.charAt(0).toUpperCase() + stats.favoriteCategory.slice(1).replace('-', ' ')}
              </Text>
            </View>

            <View style={styles.additionalStatItem}>
              <Text style={styles.additionalStatLabel}>Reality Checks Today</Text>
              <Text style={styles.additionalStatValue}>
                {stats.realityChecksToday} checks
              </Text>
            </View>

            {stats.lastDreamDate && (
              <View style={styles.additionalStatItem}>
                <Text style={styles.additionalStatLabel}>Last Dream</Text>
                <Text style={styles.additionalStatValue}>
                  {new Date(stats.lastDreamDate).toLocaleDateString()}
                </Text>
              </View>
            )}
          </View>

          {/* Dream insights */}
          <TextBlockWithBackground
            imagePath="path/to/button_bg.png"
            width="100%"
            padding={20}
            textColor="#000"
            fontSize={16}
            fontWeight="normal"
            textAlign="center"
            backgroundColor="#D7AA51"
            style={styles.insightsBox}
          >
            <Text style={styles.insightsTitle}>Your Dream Insights</Text>
            {'\n\n'}
            <Text style={styles.insightsText}>
              {stats.totalDreams > 0 ? (
                `You've recorded ${stats.totalDreams} dreams and achieved ${stats.lucidDreams} lucid dreams. ` +
                `Your dream recall rate of ${Math.round(stats.dreamRecallRate)}% shows ` +
                `excellent progress in developing dream awareness.`
              ) : (
                "Start your dream journey today and watch your dream skills grow!"
              )}
            </Text>
          </TextBlockWithBackground>

          {/* Action buttons */}
          <View style={styles.buttonsContainer}>
            <ButtonWithBackground
              text="SHARE PROGRESS"
              onPress={handleShareProgress}
              imagePath="path/to/button_bg.png"
              width="100%"
              height={50}
              textColor="#000"
              fontSize={18}
              fontWeight="bold"
              style={styles.shareButton}
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
  motivationBox: {
    marginBottom: 30,
    width: '100%',
  },
  motivationText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  additionalStats: {
    marginBottom: 30,
  },
  additionalStatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  additionalStatLabel: {
    fontSize: 14,
    color: '#FFF',
    flex: 1,
  },
  additionalStatValue: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  insightsBox: {
    marginBottom: 30,
    width: '100%',
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  insightsText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonsContainer: {
    width: '100%',
  },
  shareButton: {
    marginBottom: 0,
  },
});

export default DreamAnalyticsScreen;

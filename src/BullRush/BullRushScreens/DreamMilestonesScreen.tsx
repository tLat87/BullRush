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
} from 'react-native';
import BackgroundImage from '../BullRushComponents/BackgroundImage';
import ButtonWithBackground from '../BullRushComponents/ButtonWithBackground';
import TextBlockWithBackground from '../BullRushComponents/TextBlockWithBackground';

const { width, height } = Dimensions.get('window');

interface DreamMilestonesScreenProps {
  onBackHome: () => void;
  onViewAnalytics: () => void;
}

const DreamMilestonesScreen: React.FC<DreamMilestonesScreenProps> = ({ 
  onBackHome, 
  onViewAnalytics 
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [pulseAnim] = useState(new Animated.Value(1));

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

    // Start pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
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
  }, [fadeAnim, slideAnim, scaleAnim, pulseAnim]);

  const milestones = [
    {
      id: 1,
      title: "First Dream",
      description: "Record your first dream in the journal",
      emoji: "🌙",
      unlocked: true,
    },
    {
      id: 2,
      title: "Reality Check Master",
      description: "Complete 50 reality checks",
      emoji: "👁️",
      unlocked: true,
    },
    {
      id: 3,
      title: "Dream Recall Pro",
      description: "Remember dreams for 7 consecutive days",
      emoji: "🧠",
      unlocked: true,
    },
    {
      id: 4,
      title: "Lucid Dreamer",
      description: "Achieve your first lucid dream",
      emoji: "✨",
      unlocked: false,
    },
    {
      id: 5,
      title: "Dream Explorer",
      description: "Record 100 dreams in your journal",
      emoji: "📖",
      unlocked: false,
    },
    {
      id: 6,
      title: "Dream Master",
      description: "Achieve 10 lucid dreams",
      emoji: "👑",
      unlocked: false,
    },
  ];

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
            <Animated.View
              style={[
                styles.milestoneIcon,
                { transform: [{ scale: pulseAnim }] },
              ]}
            >
              <Text style={styles.milestoneEmoji}>🏆</Text>
            </Animated.View>
            <Text style={styles.headerTitle}>DREAM MILESTONES</Text>
          </View>

          {/* Milestone stats */}
          <TextBlockWithBackground
            imagePath="path/to/button_bg.png"
            width="100%"
            padding={20}
            textColor="#000"
            fontSize={16}
            fontWeight="normal"
            textAlign="center"
            backgroundColor="#D7AA51"
            style={styles.statsBox}
          >
            <Text style={styles.statsTitle}>Your Dream Journey</Text>
            {'\n\n'}
            <Text style={styles.statsText}>
              Unlocked: 3/6 milestones{'\n'}
              Progress: 50%
            </Text>
          </TextBlockWithBackground>

          {/* Milestones list */}
          <View style={styles.milestonesContainer}>
            {milestones.map((milestone) => (
              <View
                key={milestone.id}
                style={[
                  styles.milestoneCard,
                  milestone.unlocked && styles.unlockedCard,
                ]}
              >
                <View style={styles.milestoneContent}>
                  <Text style={[
                    styles.milestoneEmoji,
                    !milestone.unlocked && styles.lockedEmoji,
                  ]}>
                    {milestone.emoji}
                  </Text>
                  <View style={styles.milestoneInfo}>
                    <Text style={[
                      styles.milestoneTitle,
                      !milestone.unlocked && styles.lockedText,
                    ]}>
                      {milestone.title}
                    </Text>
                    <Text style={[
                      styles.milestoneDescription,
                      !milestone.unlocked && styles.lockedText,
                    ]}>
                      {milestone.description}
                    </Text>
                  </View>
                  {milestone.unlocked && (
                    <Text style={styles.unlockedBadge}>✓</Text>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Action buttons */}
          <View style={styles.buttonsContainer}>
            <ButtonWithBackground
              text="VIEW ANALYTICS"
              onPress={onViewAnalytics}
              imagePath="path/to/button_bg.png"
              width="100%"
              height={50}
              textColor="#000"
              fontSize={18}
              fontWeight="bold"
              style={styles.analyticsButton}
            />
            
            <ButtonWithBackground
              text="BACK TO HUB"
              onPress={onBackHome}
              imagePath="path/to/button_bg.png"
              width="100%"
              height={50}
              textColor="#000"
              fontSize={18}
              fontWeight="bold"
              style={styles.homeButton}
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
    alignItems: 'center',
    marginBottom: 30,
  },
  milestoneIcon: {
    marginBottom: 15,
  },
  milestoneEmoji: {
    fontSize: 60,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  statsBox: {
    marginBottom: 30,
    width: '100%',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  statsText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    lineHeight: 24,
  },
  milestonesContainer: {
    flex: 1,
    marginBottom: 30,
  },
  milestoneCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  unlockedCard: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderColor: '#FFD700',
  },
  milestoneContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  milestoneInfo: {
    flex: 1,
    marginLeft: 15,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  milestoneDescription: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.8,
    lineHeight: 20,
  },
  lockedText: {
    opacity: 0.5,
  },
  lockedEmoji: {
    opacity: 0.3,
  },
  unlockedBadge: {
    fontSize: 24,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    width: '100%',
    gap: 15,
  },
  analyticsButton: {
    marginBottom: 0,
  },
  homeButton: {
    marginBottom: 0,
  },
});

export default DreamMilestonesScreen;

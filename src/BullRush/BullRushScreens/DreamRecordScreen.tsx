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

interface DreamRecordScreenProps {
  techniqueId?: number;
  isLucid: boolean;
  category: string;
  onContinue: () => void;
  onShare: () => void;
}

const DreamRecordScreen: React.FC<DreamRecordScreenProps> = ({ 
  techniqueId,
  isLucid, 
  category,
  onContinue, 
  onShare 
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

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'lucid-dreaming': return '🌟';
      case 'dream-recall': return '🧠';
      case 'reality-check': return '👁️';
      case 'dream-journal': return '📖';
      case 'sleep-hygiene': return '😴';
      default: return '🌙';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'lucid-dreaming': return 'Lucid Dreaming';
      case 'dream-recall': return 'Dream Recall';
      case 'reality-check': return 'Reality Check';
      case 'dream-journal': return 'Dream Journal';
      case 'sleep-hygiene': return 'Sleep Hygiene';
      default: return 'Dream Practice';
    }
  };

  const getEncouragementMessage = (isLucid: boolean, category: string) => {
    if (isLucid) {
      return "Amazing! You achieved lucidity in your dream! This is a significant milestone in your dream journey.";
    } else if (category === 'reality-check') {
      return "Great job practicing reality checks! Consistency is key to developing dream awareness.";
    } else {
      return "Excellent work on your dream practice! Every session brings you closer to mastering your dream world.";
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
          {/* Success symbol */}
          <Animated.View
            style={[
              styles.successContainer,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <Text style={styles.successEmoji}>
              {isLucid ? '✨' : '🌙'}
            </Text>
          </Animated.View>

          {/* Completion message */}
          <TextBlockWithBackground
            imagePath="path/to/button_bg.png"
            width="100%"
            padding={20}
            textColor="#000"
            fontSize={16}
            fontWeight="normal"
            textAlign="center"
            backgroundColor="#D7AA51"
            style={styles.completionBox}
          >
            <Text style={styles.completionTitle}>
              {isLucid ? 'Lucid Dream Achieved!' : 'Session Complete!'}
            </Text>
            {'\n\n'}
            <Text style={styles.completionText}>
              {getEncouragementMessage(isLucid, category)}
            </Text>
          </TextBlockWithBackground>

          {/* Session details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailEmoji}>{getCategoryEmoji(category)}</Text>
              <Text style={styles.detailLabel}>Practice</Text>
              <Text style={styles.detailValue}>{getCategoryName(category)}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailEmoji}>{isLucid ? '✨' : '🌙'}</Text>
              <Text style={styles.detailLabel}>Type</Text>
              <Text style={styles.detailValue}>{isLucid ? 'Lucid' : 'Regular'}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailEmoji}>🎯</Text>
              <Text style={styles.detailLabel}>Focus</Text>
              <Text style={styles.detailValue}>Dream Work</Text>
            </View>
          </View>

          {/* Benefits reminder */}
          <TextBlockWithBackground
            imagePath="path/to/button_bg.png"
            width="100%"
            padding={15}
            textColor="#000"
            fontSize={14}
            fontWeight="normal"
            textAlign="center"
            backgroundColor="#D7AA51"
            style={styles.benefitsBox}
          >
            <Text style={styles.benefitsTitle}>Benefits of Your Practice</Text>
            {'\n\n'}
            <Text style={styles.benefitsText}>
              • Enhanced dream awareness{'\n'}
              • Improved dream recall{'\n'}
              • Greater self-awareness{'\n'}
              • Creative problem solving{'\n'}
              • Personal growth and insight
            </Text>
          </TextBlockWithBackground>

          {/* Action buttons */}
          <View style={styles.buttonsContainer}>
            <ButtonWithBackground
              text="CONTINUE PRACTICING"
              onPress={onContinue}
              imagePath="path/to/button_bg.png"
              width="100%"
              height={50}
              textColor="#000"
              fontSize={18}
              fontWeight="bold"
              style={styles.continueButton}
            />
            
            <ButtonWithBackground
              text="SHARE ACHIEVEMENT"
              onPress={onShare}
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
    alignItems: 'center',
  },
  successContainer: {
    marginBottom: 30,
  },
  successEmoji: {
    fontSize: 80,
    textAlign: 'center',
  },
  completionBox: {
    marginBottom: 30,
    width: '100%',
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  completionText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    lineHeight: 24,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 4,
    opacity: 0.8,
  },
  detailValue: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  benefitsBox: {
    marginBottom: 30,
    width: '100%',
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  benefitsText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
    lineHeight: 20,
  },
  buttonsContainer: {
    width: '100%',
    gap: 15,
  },
  continueButton: {
    marginBottom: 0,
  },
  shareButton: {
    marginBottom: 0,
  },
});

export default DreamRecordScreen;

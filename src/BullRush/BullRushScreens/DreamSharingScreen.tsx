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
import BackgroundImage from '../BullRushComponents/BackgroundImage';
import ButtonWithBackground from '../BullRushComponents/ButtonWithBackground';
import TextBlockWithBackground from '../BullRushComponents/TextBlockWithBackground';

const { width, height } = Dimensions.get('window');

interface DreamSharingScreenProps {
  onBack: () => void;
}

const DreamSharingScreen: React.FC<DreamSharingScreenProps> = ({ onBack }) => {
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

  const shareApp = async () => {
    try {
      const result = await Share.share({
        message: `🌙 DREAMCATCHER 🌟\n\nI just discovered the most amazing lucid dreaming app!\n\n✨ LUCID DREAMING TECHNIQUES\n🌙 DREAM RECALL ENHANCEMENT\n🔮 REALITY CHECK TRAINING\n📊 DREAM ANALYTICS\n\nStart your journey into the dream world today!\n\nDownload now!`,
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

  const shareDream = async () => {
    try {
      const result = await Share.share({
        message: `🌙 Just had an incredible dream experience! ✨\n\nExploring the depths of my subconscious mind and discovering new realms of consciousness. Join me on this amazing dream journey! 🌟\n\n#DreamCatcher #LucidDreaming #DreamExploration`,
        title: 'My Dream Experience',
      });

      if (result.action === Share.sharedAction) {
        console.log('Dream shared successfully');
      }
    } catch (error) {
      console.error('Error sharing dream:', error);
      Alert.alert('Error', 'Failed to share your dream. Please try again.');
    }
  };

  const dreamTips = [
    {
      id: 1,
      title: "Keep a Dream Journal",
      content: "Write down your dreams immediately upon waking. Even fragments can lead to better recall over time.",
      emoji: "📖"
    },
    {
      id: 2,
      title: "Practice Reality Checks",
      content: "Question your reality throughout the day. This habit will carry over into your dreams.",
      emoji: "👁️"
    },
    {
      id: 3,
      title: "Set Dream Intentions",
      content: "Before sleep, tell yourself you will remember your dreams and become lucid.",
      emoji: "🌙"
    },
    {
      id: 4,
      title: "Share Your Journey",
      content: "Connect with other dreamers. Sharing experiences can inspire and motivate your practice.",
      emoji: "🤝"
    }
  ];

  const inspirationalQuotes = [
    "Dreams are the royal road to the unconscious.",
    "The dream is the small hidden door in the deepest and most intimate sanctum of the soul.",
    "Dreams are illustrations from the book your soul is writing about you.",
    "In dreams, we enter a world that's entirely our own.",
    "Dreams are the seeds of reality."
  ];

  const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];

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
              <Text style={styles.backButtonIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>DREAM SHARING</Text>
          </View>

          {/* Welcome message */}
          <TextBlockWithBackground
            imagePath="path/to/button_bg.png"
            width="100%"
            padding={20}
            textColor="#000"
            fontSize={16}
            fontWeight="normal"
            textAlign="center"
            backgroundColor="#D7AA51"
            style={styles.welcomeBox}
          >
            <Text style={styles.welcomeTitle}>Share Your Dream Journey</Text>
            {'\n\n'}
            <Text style={styles.welcomeText}>
              Connect with fellow dreamers and share your experiences. 
              Your dream journey can inspire others to explore their own subconscious realms.
            </Text>
          </TextBlockWithBackground>

          {/* Daily inspiration */}
          <TextBlockWithBackground
            imagePath="path/to/button_bg.png"
            width="100%"
            padding={20}
            textColor="#000"
            fontSize={16}
            fontWeight="normal"
            textAlign="center"
            backgroundColor="#D7AA51"
            style={styles.inspirationBox}
          >
            <Text style={styles.inspirationTitle}>Dream Wisdom</Text>
            {'\n\n'}
            <Text style={styles.inspirationQuote}>
              "{randomQuote}"
            </Text>
          </TextBlockWithBackground>

          {/* Dream tips */}
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Dream Tips</Text>
            {dreamTips.map((tip) => (
              <View key={tip.id} style={styles.tipCard}>
                <Text style={styles.tipEmoji}>{tip.emoji}</Text>
                <View style={styles.tipContent}>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Text style={styles.tipText}>{tip.content}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Share options */}
          <View style={styles.shareContainer}>
            <Text style={styles.shareTitle}>Share Your Experience</Text>
            
            <ButtonWithBackground
              text="SHARE APP WITH FRIENDS"
              onPress={shareApp}
              imagePath="path/to/button_bg.png"
              width="100%"
              height={50}
              textColor="#000"
              fontSize={16}
              fontWeight="bold"
              style={styles.shareButton}
            />
            
            <ButtonWithBackground
              text="SHARE YOUR DREAM"
              onPress={shareDream}
              imagePath="path/to/button_bg.png"
              width="100%"
              height={50}
              textColor="#000"
              fontSize={16}
              fontWeight="bold"
              style={styles.shareButton}
            />
          </View>

          {/* Community stats */}
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
            <Text style={styles.statsTitle}>Global Dream Community</Text>
            {'\n\n'}
            <Text style={styles.statsText}>
              🌍 50,000+ dream explorers worldwide{'\n'}
              🌙 500,000+ dreams recorded{'\n'}
              ✨ 25,000+ lucid dreams achieved{'\n'}
              🧠 Growing community of consciousness explorers
            </Text>
          </TextBlockWithBackground>
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
  welcomeBox: {
    marginBottom: 30,
    width: '100%',
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    lineHeight: 24,
  },
  inspirationBox: {
    marginBottom: 30,
    width: '100%',
  },
  inspirationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  inspirationQuote: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  tipsContainer: {
    marginBottom: 30,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  tipEmoji: {
    fontSize: 24,
    marginRight: 15,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  shareContainer: {
    marginBottom: 30,
  },
  shareTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  shareButton: {
    marginBottom: 15,
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
});

export default DreamSharingScreen;

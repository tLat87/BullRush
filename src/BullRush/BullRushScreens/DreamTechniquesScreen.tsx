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
import { dreamTechniques } from '../BullRushData/gameData';

const { width, height } = Dimensions.get('window');

interface DreamTechniquesScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

const DreamTechniquesScreen: React.FC<DreamTechniquesScreenProps> = ({ onNavigate, onBack }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
  const [selectedTechnique, setSelectedTechnique] = useState(1);

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#66BB6A';
      case 'intermediate': return '#FFA726';
      case 'advanced': return '#FF7043';
      case 'expert': return '#AB47BC';
      case 'master': return '#FFD700';
      default: return '#66BB6A';
    }
  };

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
          <Text style={styles.headerTitle}>DREAM TECHNIQUES</Text>
        </View>
        
        {/* Techniques list */}
        <View style={styles.techniquesContainer}>
          {dreamTechniques.map((technique) => (
            <TouchableOpacity
              key={technique.id}
              style={[
                styles.techniqueCard,
                selectedTechnique === technique.id && styles.selectedTechnique,
              ]}
              onPress={() => setSelectedTechnique(technique.id)}
            >
              <View style={styles.techniqueHeader}>
                <Text style={styles.techniqueEmoji}>
                  {getCategoryEmoji(technique.category)}
                </Text>
                <View style={styles.techniqueInfo}>
                  <Text style={styles.techniqueName}>{technique.name}</Text>
                  <Text style={styles.techniqueDuration}>{technique.duration} min</Text>
                </View>
                <View style={[
                  styles.difficultyBadge,
                  { backgroundColor: getDifficultyColor(technique.difficulty) }
                ]}>
                  <Text style={styles.difficultyText}>
                    {technique.difficulty.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={styles.techniqueDescription}>{technique.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Start technique button */}
        <ButtonWithBackground
          text="BEGIN TECHNIQUE"
          onPress={() => onNavigate('DreamJourney', { techniqueId: selectedTechnique })}
          imagePath="path/to/button_bg.png"
          width="100%"
          height={50}
          textColor="#333"
          fontSize={18}
          fontWeight="bold"
          style={styles.startButton}
        />
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
  techniquesContainer: {
    flex: 1,
    marginBottom: 30,
  },
  techniqueCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTechnique: {
    borderColor: '#4A148C',
    backgroundColor: 'rgba(74, 20, 140, 0.1)',
  },
  techniqueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  techniqueEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  techniqueInfo: {
    flex: 1,
  },
  techniqueName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  techniqueDuration: {
    fontSize: 14,
    color: '#666',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFF',
  },
  techniqueDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  startButton: {
    marginBottom: 20,
  },
});

export default DreamTechniquesScreen;

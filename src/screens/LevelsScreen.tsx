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
import BackgroundImage from '../components/BackgroundImage';
import ButtonWithBackground from '../components/ButtonWithBackground';
import TextBlockWithBackground from '../components/TextBlockWithBackground';

const { width, height } = Dimensions.get('window');

interface LevelsScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

const LevelsScreen: React.FC<LevelsScreenProps> = ({ onNavigate, onBack }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
  const [selectedLevel, setSelectedLevel] = useState(10);

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

  const levels = [
    { id: 1, name: "Basic Synonyms", difficulty: "Easy", unlocked: true },
    { id: 2, name: "Simple Opposites", difficulty: "Easy", unlocked: true },
    { id: 3, name: "Color Associations", difficulty: "Medium", unlocked: true },
    { id: 4, name: "Animal Sounds", difficulty: "Medium", unlocked: true },
    { id: 5, name: "Body Parts", difficulty: "Medium", unlocked: true },
    { id: 6, name: "Weather Patterns", difficulty: "Hard", unlocked: true },
    { id: 7, name: "Emotions & Feelings", difficulty: "Hard", unlocked: true },
    { id: 8, name: "Abstract Concepts", difficulty: "Expert", unlocked: true },
    { id: 9, name: "Complex Associations", difficulty: "Expert", unlocked: true },
    { id: 10, name: "Impossible Connections", difficulty: "Impossible", unlocked: true },
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
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>BULLS EYE LEVELS</Text>
        </View>
        
        {/* Levels grid - exactly like in photo */}
        <View style={styles.levelsContainer}>
          {/* First 9 levels in 3x3 grid - exactly positioned */}
          <View style={styles.levelsGrid}>
            {/* Row 1 */}
            <View style={styles.gridRow}>
              {levels.slice(0, 3).map((level) => (
                <ButtonWithBackground
                  key={level.id}
                  text={level.id.toString()}
                  onPress={() => setSelectedLevel(level.id)}
                  imagePath="path/to/level_button_bg.png" // You'll add this image
                  width={75}
                  height={75}
                  textColor="#FFFFFF"
                  fontSize={28}
                  fontWeight="bold"
                  borderRadius={12}
                  backgroundColor="#66BB6A"
                  style={[
                    styles.levelButton,
                    selectedLevel === level.id && styles.selectedLevel,
                  ]}
                />
              ))}
            </View>
            
            {/* Row 2 */}
            <View style={styles.gridRow}>
              {levels.slice(3, 6).map((level) => (
                <ButtonWithBackground
                  key={level.id}
                  text={level.id.toString()}
                  onPress={() => setSelectedLevel(level.id)}
                  imagePath="path/to/level_button_bg.png" // You'll add this image
                  width={75}
                  height={75}
                  textColor="#FFFFFF"
                  fontSize={28}
                  fontWeight="bold"
                  borderRadius={12}
                  backgroundColor="#66BB6A"
                  style={[
                    styles.levelButton,
                    selectedLevel === level.id && styles.selectedLevel,
                  ]}
                />
              ))}
            </View>
            
            {/* Row 3 */}
            <View style={styles.gridRow}>
              {levels.slice(6, 9).map((level) => (
                <ButtonWithBackground
                  key={level.id}
                  text={level.id.toString()}
                  onPress={() => setSelectedLevel(level.id)}
                  imagePath="path/to/level_button_bg.png" // You'll add this image
                  width={75}
                  height={75}
                  textColor="#FFFFFF"
                  fontSize={28}
                  fontWeight="bold"
                  borderRadius={12}
                  backgroundColor="#66BB6A"
                  style={[
                    styles.levelButton,
                    selectedLevel === level.id && styles.selectedLevel,
                  ]}
                />
              ))}
            </View>
          </View>
          
          {/* Level 10 centered below - exactly like photo */}
          <View style={styles.level10Container}>
            <ButtonWithBackground
              text="10"
              onPress={() => setSelectedLevel(10)}
              imagePath="path/to/level_10_button_bg.png" // You'll add this image
              width={75}
              height={75}
              textColor="#FFFFFF"
              fontSize={28}
              fontWeight="bold"
              borderRadius={12}
              backgroundColor="#FFD700"
              style={[
                styles.levelButton,
                selectedLevel === 10 && styles.selectedLevel,
              ]}
            />
          </View>
        </View>
        
        {/* Start level button */}
        <ButtonWithBackground
          text={`START LEVEL ${selectedLevel}`}
          onPress={() => onNavigate('Game', { level: selectedLevel })}
          imagePath="path/to/button_bg.png" // You'll add this image
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
    marginBottom: 40,
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
  levelsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  levelsGrid: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 280,
    marginBottom: 25,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 12,
  },
  level10Container: {
    alignItems: 'center',
    marginBottom: 40,
  },
  levelButton: {
    marginBottom: 0,
  },
  selectedLevel: {
    // Selected level styling will be handled by ButtonWithBackground
  },
  startButton: {
    marginBottom: 20,
  },
});

export default LevelsScreen;
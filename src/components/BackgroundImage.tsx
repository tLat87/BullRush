import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface BackgroundImageProps {
  children: React.ReactNode;
  imagePath?: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ children, imagePath }) => {
  // Try to load the background image, fallback to gradient if not found
  const backgroundSource = imagePath 
    ? { uri: imagePath } 
    : (() => {
        try {
          return require('../assets/img/ee6deef6dc6112b8070106a2f5eefacc96827fd8.png');
        } catch (error) {
          return null;
        }
      })();

  return (
    <View style={styles.container}>
      {backgroundSource ? (
        <ImageBackground
          source={backgroundSource}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
         
          {children}
          
          
        </ImageBackground>
      ) : (
        <View style={styles.backgroundGradient}>
          <View style={styles.gradientLayer1} />
          <View style={styles.gradientLayer2} />
          
          <View style={styles.diagonalLine1} />
          <View style={styles.diagonalLine2} />
          <View style={styles.diagonalLine3} />
          
          <View style={styles.cherryBlossom1} />
          <View style={styles.cherryBlossom2} />
          <View style={styles.cherryBlossom3} />
          <View style={styles.lanternLeft} />
          <View style={styles.lanternRight} />
          
          {children}
          
          <View style={styles.chineseCharContainer}>
            <View style={styles.chineseChar}>福</View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A148C',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1A237E',
  },
  gradientLayer1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#2196F3',
    opacity: 0.8,
  },
  gradientLayer2: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: '#4A148C',
    opacity: 0.6,
  },
  diagonalLine1: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 2,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: [{ rotate: '15deg' }],
    transformOrigin: 'top left',
  },
  diagonalLine2: {
    position: 'absolute',
    top: 0,
    left: width * 0.3,
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    transform: [{ rotate: '15deg' }],
    transformOrigin: 'top left',
  },
  diagonalLine3: {
    position: 'absolute',
    top: 0,
    left: width * 0.6,
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    transform: [{ rotate: '15deg' }],
    transformOrigin: 'top left',
  },
  cherryBlossom1: {
    position: 'absolute',
    top: height * 0.1,
    left: width * 0.1,
    width: 20,
    height: 20,
    backgroundColor: '#FFB6C1',
    borderRadius: 10,
    opacity: 0.7,
  },
  cherryBlossom2: {
    position: 'absolute',
    top: height * 0.15,
    right: width * 0.15,
    width: 15,
    height: 15,
    backgroundColor: '#FFB6C1',
    borderRadius: 7.5,
    opacity: 0.6,
  },
  cherryBlossom3: {
    position: 'absolute',
    top: height * 0.2,
    left: width * 0.2,
    width: 12,
    height: 12,
    backgroundColor: '#FFB6C1',
    borderRadius: 6,
    opacity: 0.8,
  },
  lanternLeft: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.05,
    width: 40,
    height: 50,
    backgroundColor: '#DC143C',
    borderRadius: 20,
    opacity: 0.8,
  },
  lanternRight: {
    position: 'absolute',
    top: height * 0.05,
    right: width * 0.05,
    width: 40,
    height: 50,
    backgroundColor: '#DC143C',
    borderRadius: 20,
    opacity: 0.8,
  },
  chineseCharContainer: {
    position: 'absolute',
    bottom: height * 0.05,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  chineseChar: {
    fontSize: 60,
    color: 'rgba(255, 255, 255, 0.3)',
    opacity: 0.5,
  },
});

export default BackgroundImage;

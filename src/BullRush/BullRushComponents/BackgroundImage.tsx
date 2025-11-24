import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const fallbackImage = require('../BullRushAssets/img/ee6deef6dc6112b8070106a2f5eefacc96827fd8.png');

interface BackgroundImageProps {
  children: React.ReactNode;
  imagePath?: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ children, imagePath }) => {
  const backgroundSource = imagePath ? { uri: imagePath } : fallbackImage;

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundSource} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.overlay} />
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04000A',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 0, 32, 0.6)',
  },
});

export default BackgroundImage;

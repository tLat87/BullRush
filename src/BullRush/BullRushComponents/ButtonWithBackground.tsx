import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  View,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface ButtonWithBackgroundProps {
  text: string;
  onPress: () => void;
  imagePath?: string;
  width?: number | string;
  height?: number;
  textColor?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  borderRadius?: number;
  disabled?: boolean;
  style?: any;
}

const ButtonWithBackground: React.FC<ButtonWithBackgroundProps> = ({
  text,
  onPress,
  imagePath,
  width: buttonWidth = 'auto',
  height = 50,
  textColor = '#333',
  fontSize = 16,
  fontWeight = 'bold',
  borderRadius = 15,
  disabled = false,
  style,
}) => {
  const buttonStyle = [
    styles.button,
    {
      width: buttonWidth,
      height,
      borderRadius,
      opacity: disabled ? 0.6 : 1,
    },
    style,
  ];

  const textStyle = [
    styles.text,
    {
      color: textColor,
      fontSize,
      fontWeight,
    },
  ];

  // Calculate width based on text length if width is 'auto'
  const calculatedWidth = buttonWidth === 'auto' 
    ? Math.max(text.length * (fontSize * 0.6) + 40, 120) // Minimum width 120
    : buttonWidth;

  const finalButtonStyle = [
    ...buttonStyle,
    { width: calculatedWidth },
  ];

  return (
    <TouchableOpacity
      style={finalButtonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {imagePath ? (
        <ImageBackground
          source={require('../BullRushAssets/img/btnBG.png')}
          style={styles.imageBackground}
          resizeMode="stretch"
          imageStyle={{ borderRadius }}
        >
          <View style={styles.textContainer}>
            <Text style={textStyle}>{text}</Text>
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.fallbackBackground}>
          <Text style={textStyle}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default ButtonWithBackground;


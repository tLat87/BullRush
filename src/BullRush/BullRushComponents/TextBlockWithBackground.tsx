import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface TextBlockWithBackgroundProps {
  children: React.ReactNode;
  imagePath?: string;
  width?: number | string;
  height?: number | string;
  padding?: number;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  borderRadius?: number;
  textColor?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  textAlign?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  disabled?: boolean;
  style?: any;
}

const TextBlockWithBackground: React.FC<TextBlockWithBackgroundProps> = ({
  children,
  imagePath,
  width: blockWidth = '100%',
  height: blockHeight = 'auto',
  padding = 15,
  margin = 0,
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  borderRadius = 15,
  textColor = '#333',
  fontSize = 16,
  fontWeight = 'normal',
  textAlign = 'center',
  backgroundColor = '#D7AA51',
  disabled = false,
  style,
}) => {
  const blockStyle = [
    styles.textBlock,
    {
      width: blockWidth,
      height: blockHeight,
      padding,
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
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
      textAlign,
    },
  ];

  return (
    <View style={blockStyle}>
      {imagePath ? (
        <ImageBackground
          source={require('../BullRushAssets/img/containerBG.png')} // Using the same background as buttons
          style={styles.imageBackground}
          resizeMode="stretch"
          imageStyle={{ borderRadius }}
        >
          <View style={styles.textContainer}>
            <Text style={textStyle}>{children}</Text>
          </View>
        </ImageBackground>
      ) : (
        <View style={[styles.fallbackBackground, { backgroundColor }]}>
          <Text style={textStyle}>{children}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textBlock: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  imageBackground: {
    // width: '100%',
    // height: '100%',
    maxHeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackBackground: {
 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
    height: '100%',
  },
  text: {
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default TextBlockWithBackground;


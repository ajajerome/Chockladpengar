import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

interface AnimatedCoinProps {
  onComplete?: () => void;
  fromX?: number;
  fromY?: number;
  toX?: number;
  toY?: number;
}

export const AnimatedCoin: React.FC<AnimatedCoinProps> = ({
  onComplete,
  fromX = 0,
  fromY = 0,
  toX = 0,
  toY = 0,
}) => {
  const position = useRef(new Animated.ValueXY({ x: fromX, y: fromY })).current;
  const scale = useRef(new Animated.Value(1)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(position, {
        toValue: { x: toX, y: toY },
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.5,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(rotation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onComplete?.();
    });
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.coin,
        {
          transform: [
            { translateX: position.x },
            { translateY: position.y },
            { scale },
            { rotate: spin },
          ],
        },
      ]}
    >
      <View style={styles.coinOuter}>
        <View style={styles.coinInner} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  coin: {
    position: 'absolute',
    zIndex: 1000,
  },
  coinOuter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondary,
    borderWidth: 2,
    borderColor: colors.chocolate,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.secondaryLight,
  },
});

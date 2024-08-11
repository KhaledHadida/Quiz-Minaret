import React, { useRef, useEffect, useState } from 'react';
import { Text, StyleSheet, Animated, Easing } from 'react-native';

//This component is for animating the number progression in the profile
const AnimatedNumber = ({ toValue, duration }) => {

    //Starting from 0
    //useRef used here so that upon component refresh this value is persistent 
    //Also using Animated.Value is better than use of a useState because of performance as well
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [displayValue, setDisplayValue] = useState(0);

    //Animating the number
    useEffect(() => {
        animatedValue.addListener(({ value }) => {
            setDisplayValue(Math.floor(value));
        });

        Animated.timing(animatedValue, {
            toValue,
            duration,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();

        // Clean up the listener on unmount
        return () => {
            animatedValue.removeAllListeners();
        };
    }, [toValue, duration, animatedValue]);

    //
    return (
        <Text style={styles.number}>
            {displayValue}
        </Text>
    );
};

const styles = StyleSheet.create({
    number: {
        fontFamily: 'Anton',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 20,
    },
});

export default AnimatedNumber;
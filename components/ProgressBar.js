import React, { useEffect, useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useContextProvider } from '../screens/ContextProvider';

const ProgressBar = ({ percent }) => {
    const [progress, setProgress] = useState(new Animated.Value(0));

    const { colorTheme } = useContextProvider();
    const styles = createStyles(colorTheme);


    //Animated object using React native, takes in props like % (to what # do we increment to), speed, useNativeDriver - handle anim in JS thread or Native Driver
    useEffect(() => {
        Animated.timing(progress, {
            toValue: percent,
            duration: 2500,
            useNativeDriver: false,
        }).start();
    }, [percent]);

    return (
        <View>
            <Animated.View style={[styles.bar, {
                width: progress.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                    extrapolate: 'clamp'
                })
            }]} />
        </View>
    );

};

const createStyles = (colorTheme) => StyleSheet.create({
    bar: {
        height: '100%',
        backgroundColor: colorTheme.colors.card,


    },
});

export default ProgressBar;



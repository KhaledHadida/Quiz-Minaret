import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated, Dimensions, Image, Easing } from 'react-native';
import { useContextProvider } from '../screens/ContextProvider';


const { width, height } = Dimensions.get('window');

//This is the animation to handle the congratulation text
const Congrats = ({ quizImg, quizTopic }) => {

    const { colorTheme, translate } = useContextProvider();
    console.log(quizTopic);
    //These are for the text, one is for appearing and other is for the sudden bounce
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const bounceAnim = useRef(new Animated.Value(0)).current;
    //This is for the background to move
    const moveAnim = useRef(new Animated.Value(0)).current;

    //Temporary for now, until I find a better solution for this 
    var translated = {
        "Islamic Foundations" : "islamic_foundations",
        "Islamic Practices": "islamic_practices",
        "Islamic History": "islamic_history"
    }

    //Animation properties
    useEffect(() => {
        Animated.sequence([
            //Will change fadeAnim value to 1 in 5 seconds
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(bounceAnim, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }),
        ]).start();

        Animated.loop(
            Animated.timing(moveAnim, {
                toValue: -width,
                duration: 10000,
                useNativeDriver: true,
                easing: Easing.linear,
            })
        ).start();

    }, [fadeAnim, bounceAnim, moveAnim]);


    const styles = createStyles(colorTheme);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.imageBackground,
                    { transform: [{ translateX: moveAnim }] },
                ]}
            >
                <ImageBackground
                    opacity={0.15}
                    source={quizImg}
                    style={styles.imageBackground}
                    imageStyle={{ tintColor: colorTheme.colors.backgroundImg }}
                    resizeMode="repeat"
                >
                </ImageBackground>
            </Animated.View>
            <Animated.View style={[{ opacity: fadeAnim, transform: [{ scale: bounceAnim }] }]}>
                {/* The congrats title + congrats sentence followed after of what user finished */}
                <Text style={[styles.text, { color: colorTheme.colors.headerText }]}>
                    {translate('congrats')}!
                </Text>
                <Text style={[styles.text, styles.congrats]}>
                    {translate('congrats_2')}
                </Text>
                {/* Quiz Topic */}
                <Text style={[styles.text, styles.topic]}>
                    {translate(translated[quizTopic])}
                </Text>
                <Image style={{ tintColor: colorTheme.colors.backgroundImg, margin: 'auto', marginTop: 25 }} source={require('../assets/congrats.png')}></Image>
            </Animated.View>

        </View>
    );

}


const createStyles = (colorTheme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBackground: {
        width: width * 2,
        height: height,
        position: 'absolute',
        left: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
    },

    congrats: {
        color: colorTheme.colors.text, 
        fontSize: 16, 
        marginTop: 25, 
        fontStyle: 'italic', 
        fontWeight: 500
    },

    topic: {
        color: colorTheme.colors.text, 
        fontSize: 20, 
        fontWeight: 900
    } 
});


export default Congrats;
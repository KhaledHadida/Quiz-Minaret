import { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useContextProvider } from '../screens/ContextProvider';


const AnimatedAnswers = ({ isClicked, isAnswerCorrect, submitAnswer, answer, index }) => {

    const { colorTheme } = useContextProvider();

    //starting at 0
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const scaleAnimation = useRef(new Animated.Value(1)).current;

    //Current one
    const [current, setCurrent] = useState(-1);


    //update current
    const changeCurrent = () => {
        console.log("What")
        setCurrent(index);
    };

    //Animation
    const shakeEffect = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: -10,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: -10,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    //Animation
    const scaleEffect = () => {
        Animated.sequence([
            Animated.timing(scaleAnimation, {
                toValue: 1.15,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnimation, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    useEffect(() => {
        console.log(`${index} is index, ${current} is current`)
        if (isClicked) {
            if (!isAnswerCorrect && current == index) {
                shakeEffect();
            }
            if (isAnswerCorrect) {
                scaleEffect();  
            }
            //Just an arbitrary number I set to reset it
            setCurrent(-1);
        }
    }, [isClicked]);

    const styles = createStyles(colorTheme);

    return (
        <Animated.View style={[{ transform: [{ translateX: shakeAnimation }, { scale: scaleAnimation }] }, { marginVertical: 'auto' }]}>
            <TouchableOpacity disabled={isClicked} style={isClicked ? (isAnswerCorrect ? styles.answerCorrect : [styles.answerWrong]) : styles.answerNeutral} onPress={() => { changeCurrent(index), submitAnswer(answer) }}>
                <Text style={styles.answerText}>
                    {answer}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const createStyles = (colorTheme) => StyleSheet.create({

    answerText: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        flexWrap: 'wrap',
        color: colorTheme.colors.text,
    },

    answerNeutral: {
        margin: 'auto',
        width: '95%',
        padding: 20,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: colorTheme.colors.answer,
    },

    answerCorrect: {
        margin: 'auto',
        backgroundColor: '#bce8bc',
        width: '95%',
        padding: 20,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'green'
    },

    answerWrong: {
        margin: 'auto',
        backgroundColor: '#e86d6d',
        width: '95%',
        padding: 20,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'red'
    },

});


export default AnimatedAnswers;
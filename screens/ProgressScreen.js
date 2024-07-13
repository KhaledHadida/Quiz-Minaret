import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useContextProvider } from './ContextProvider';

const ProgressScreen = ({ route }) => {

    const {translate} = useContextProvider();
    const dict = {
        100: translate('100'),
        90: translate('90'),
        80: translate('80'),
        70: translate('70'),
        60: translate('60'),
        0: translate('0')
    }

    console.log(translate('100'));


    function getMessage(percentage) {
        //Convert keys to numbers
        const keys = Object.keys(dict).map(Number).sort((a, b) => b - a);
        //If user has not even attempted quizzes yet give him an exclusive message
        if(questionCounter == 0){
            return "Start your quizzes!";
        }
        for (let i = 0; i < keys.length; i++) {
            if (percentage >= keys[i]) {
                return dict[keys[i]];
            }
        }

        return "ERROR";

    }


    //Have bunch of messages  (MAY REMOVE THIS RESULT ONE SINCE I CAN JUST USE CONST INSTEAD)
    const [resultMsg, setResultMsg] = useState();
    const { questionCounter, correctAnsCounter, wrongAnsCounter, foundationsCounter, practicesCounter, historyCounter } = useContextProvider();
    const [progressBars, setProgressBar] = useState([]);


    //The math
    const foundationProgress = (foundationsCounter / 20) * 100;
    const practicesProgress = (practicesCounter / 20) * 100;
    const historyProgress = (historyCounter / 20) * 100;

    const overallAvg = (correctAnsCounter / questionCounter) * 100;

    const resultMsg1 = getMessage(overallAvg);

    console.log(historyProgress);
    useEffect(() => {
        setResultMsg(getMessage(overallAvg));
        //temporary, i will find something else to refresh over
    }, [overallAvg]);

    // // Function to load counter value from AsyncStorage
    // const loadCounter = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('questionsAnswered');
    //         console.log(value);

    //         if (value !== null) {
    //             setCounter(parseInt(value, 10));
    //         }
    //     } catch (error) {
    //         console.error('Error loading counter from AsyncStorage:', error);
    //     }
    // };

    // // Load counter value from AsyncStorage on component mount
    //  loadCounter();


    return (
        <ImageBackground source={require('../assets/minaret.png')} opacity={0.15}  style={{
            flex: 1
        }}
        imageStyle={{
            resizeMode: 'repeat',
            borderColor: 'green',
            borderWidth: 2,
        }}
        >
            <View style={styles.container}>
                <Text style={styles.capsule}>{translate('questions_attempted')} 📝 : {questionCounter}</Text>
                <View style={styles.row}>
                    <Text style={[styles.capsule, {marginRight: 10}]}>{translate('questions_correct')} ✅ : {correctAnsCounter}</Text>
                    <Text style={styles.capsule}>{translate('questions_wrong')} ❌ : {wrongAnsCounter}</Text>
                </View>
                <Text style={styles.capsule}>{translate('questions_average')} 📜 : {Math.round(overallAvg)}%</Text>

            </View>

            <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'black', margin: 10 }}></View>
            {/* <Text style={styles.capsule}>Islamic Foundation </Text>
            <Text style={styles.capsule}>Islamic History </Text> */}
            <Text style={styles.headerText}>{translate('questions_complete')} </Text>
            {/* Parent component for all progress bars on each quiz topic i.e Foundations at 10/100 questions done */}
            {/* for loop it */}

            { }
            <View style={{ margin: 10 }}>
                <View style={styles.progressButton}>
                    <View style={[styles.progress, { width: foundationProgress+'%'}]}>
                    </View>
                    <Text style={styles.progressText}>{translate('button_foundations')} ({foundationsCounter}/20) </Text>
                </View>
            </View>
            <View style={{ margin: 10 }}>
                <View style={styles.progressButton}>
                    <View style={[styles.progress, { width: practicesProgress+'%'}]}>
                    </View>
                    <Text style={styles.progressText}>{translate('button_practices')}  ({practicesCounter}/20) </Text>
                </View>
            </View>
            <View style={{ margin: 10 }}>
                <View style={styles.progressButton}>
                    <View style={[styles.progress, { width: historyProgress+'%'}]}>
                    </View>
                    <Text style={styles.progressText}>{translate('button_history')} ({historyCounter}/20) </Text>
                </View>
            </View>
            <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'black', margin: 10 }}></View>

            <Text style={[styles.headerText, { fontSize: 30 }]}>{resultMsg1}</Text>
            {/* progress for the quiz types */}

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        verticalAlign: 'middle',
    },

    row: {
        flexDirection: 'row',
        
    },


    capsule: {
        padding: 15,
        backgroundColor: '#B5C18E',
        borderRadius: 20,
        fontFamily: 'Anton',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 20,
        borderWidth: 2,
        borderColor: '#B99470',
        margin: 'auto',
    },

    headerText: {
        fontFamily: 'Anton',
        fontSize: 20,
        textAlign: 'center',
        color: '#80532d',
        margin: 10
    },

    progressButton: {
        height: 40,
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#D3D3D3',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#B99470',
    },

    progress: {
        height: '100%',
        backgroundColor: '#B5C18E',
        width: '20%'
    },

    progressText: {
        fontFamily: 'Anton',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 10,
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        textAlign: 'center',

    }
});

export default ProgressScreen;
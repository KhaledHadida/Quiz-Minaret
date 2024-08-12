import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';

import ProgressBar from '../components/ProgressBar';
import AnimatedNumber from '../components/AnimatedNumber';

import { useContextProvider } from './ContextProvider';

//The My Progress tab, it shows the user's progress (questions,answers,topic questions answered)
const ProgressScreen = () => {

    const { translate } = useContextProvider();

    //Basically I made a custom message according to user's average, if user achieves 95% they get the '90' message
    //refer to 'General Text.json' for the corresponding language.
    const resultMsgs = {
        100: translate('100'),
        90: translate('90'),
        80: translate('80'),
        70: translate('70'),
        60: translate('60'),
        0: translate('0')
    }

    //Speed counter for each number enumerating (animating)
    const speedCounter = 3000;

    function getMessage(percentage) {
        //Convert keys to numbers
        const keys = Object.keys(resultMsgs).map(Number).sort((a, b) => b - a);
        //If user has not even attempted quizzes yet give him an exclusive message
        if (questionCounter == 0) {
            return "Start your quizzes!";
        }
        for (let i = 0; i < keys.length; i++) {
            if (percentage >= keys[i]) {
                return resultMsgs[keys[i]];
            }
        }
        //ERROR!! - we got an issue
        return "ERROR";
    }

    const { questionCounter, correctAnsCounter, wrongAnsCounter, foundationsCounter, practicesCounter, historyCounter, colorTheme, totalNumofQ } = useContextProvider();

    //The math calculating averages for progress bars
    const foundationProgress = (foundationsCounter / totalNumofQ) * 100;
    const practicesProgress = (practicesCounter / totalNumofQ) * 100;
    const historyProgress = (historyCounter / totalNumofQ) * 100;
    const overallAvg = (correctAnsCounter / questionCounter) * 100 || 0;

    //The message based on average of user (refer to )
    const resultMsg = getMessage(overallAvg);

    //This is how I can pass the color theme into the css object below (just more organized also reduces repetitive code)
    const styles = createStyles(colorTheme);

    return (
        <ImageBackground source={require('../assets/minaret.png')} opacity={0.1} style={{
            height: '100%', width: '100%',
        }}
            imageStyle={{
                resizeMode: 'repeat',
                borderColor: 'green',
                borderWidth: 2,
                tintColor: colorTheme.colors.backgroundImg
            }}
        >
            <View style={styles.container}>
                <Text style={styles.capsule}>{translate('questions_attempted')} 📝 : <AnimatedNumber toValue={questionCounter} duration={speedCounter} /></Text>
                <View style={styles.row}>
                    <Text style={[styles.capsule, { marginRight: 10 }]}>{translate('questions_correct')} ✅ : <AnimatedNumber toValue={correctAnsCounter} duration={speedCounter} /> </Text>
                    <Text style={styles.capsule}>{translate('questions_wrong')} ❌ : <AnimatedNumber toValue={wrongAnsCounter} duration={speedCounter} /></Text>
                </View>
                <Text style={styles.capsule}>{translate('questions_average')} 📜 : <AnimatedNumber toValue={Math.round(overallAvg)} duration={speedCounter} /> %</Text>
            </View>

            <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'black', margin: 10 }}></View>
            {/* <Text style={styles.capsule}>Islamic Foundation </Text>
            <Text style={styles.capsule}>Islamic History </Text> */}
            <Text style={[styles.headerText, { color: colorTheme.colors.text }]}>{translate('questions_complete')} </Text>
            {/* Parent component for all progress bars on each quiz topic i.e Foundations at 10/100 questions done */}
            <View style={{ margin: 10 }}>
                <View style={styles.progressButton}>
                    <ProgressBar percent={foundationProgress} />
                    <View style={styles.progressBar}>
                        <Text style={styles.progressText}>{translate('islamic_foundations')} </Text>
                        <Text style={styles.progressText}> ( <AnimatedNumber toValue={foundationsCounter} duration={speedCounter} /> / {totalNumofQ} ) </Text>
                    </View >
                </View>
            </View>
            <View style={{ margin: 10 }}>
                <View style={styles.progressButton}>
                    <ProgressBar percent={practicesProgress} />
                    <View style={styles.progressBar}>
                        <Text style={styles.progressText}>{translate('islamic_practices')} </Text>
                        <Text style={styles.progressText}> ( <AnimatedNumber toValue={practicesCounter} duration={speedCounter} /> / {totalNumofQ} ) </Text>
                    </View>
                </View>
            </View>
            <View style={{ margin: 10 }}>
                <View style={styles.progressButton}>
                    <ProgressBar percent={historyProgress} />
                    <View style={styles.progressBar}>
                        <Text style={styles.progressText}>{translate('islamic_history')} </Text>
                        <Text style={styles.progressText}> ( <AnimatedNumber toValue={historyCounter} duration={speedCounter} /> / {totalNumofQ} )</Text>
                    </View>
                </View>
            </View>
            <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'black', margin: 10 }}></View>
            <Text style={[styles.headerText, { fontSize: 30 }, { color: colorTheme.colors.text }]}>{resultMsg}</Text>
        </ImageBackground>
    );
}

const createStyles = (colorTheme) => StyleSheet.create({
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
        borderRadius: 20,
        fontFamily: 'Anton',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 20,
        borderWidth: 2,
        margin: 'auto',
        backgroundColor: colorTheme.colors.card,
        borderColor: colorTheme.colors.border

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
        borderRadius: 20,
        borderWidth: 2,
        backgroundColor: colorTheme.colors.tabSelected,
        borderColor: colorTheme.colors.border,
    },

    progressText: {
        fontFamily: 'Anton',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 10,
        // position: 'absolute',
        // marginLeft: 'auto',
        // marginRight: 'auto',
        // left: 0,
        // right: 0,
        // textAlign: 'center',
    },

    progressBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    }
});

export default ProgressScreen;
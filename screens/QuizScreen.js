import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated, ImageBackground, Image } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackButton, backAction } from '../components/BackButton';

import { useContextProvider } from './ContextProvider';

//Import useful functions
import { saveData } from '../components/StorageUtils';

//Import sound
import soundManager from '../components/SoundManager';
import AnimatedAnswers from '../components/AnimatedAnswers';



//This is the quiz screen that displays the question & answers, next & end button.
const QuizScreen = ({ route, navigation }) => {
    //The chosenQuestions is the currentIndices ([0,4,6,2,1..])
    const { quizTopic, quizImg, quizData, chosenQuestions, dataIndexKey } = route.params;
    //Did user click on an answer?
    const [isClicked, setisClicked] = useState(false);
    //Current index we are on
    const [indexQuestion, setIndexQuestion] = useState(0);
    //Current Question we are on
    const [questions, setQuestions] = useState(quizData[indexQuestion]);

    // Effect to update the questions state whenever indexQuestion changes
    useEffect(() => {
        // //Randomly assign a question index
        // setRandomQuestionIndex();
        //set that randomly assigned question index into the question
        //Basically by doing chosenQuestions[indexQuestion] we get the element in the random Array 
        //(i.e indexQuestion = 0, chosenQuestions[indexQuestion] = 2 or whatever)
        //make sure we have questions to answer..?
        if (chosenQuestions.length > 0) {

            setQuestions(quizData[chosenQuestions[0]]);

        } else {
            //For now.. reset the user's questions he did then point him out to main screen.
            //removeQuestionIndex(dataIndexKey);
            console.log("We are done quiz .. commence?");
            navigation.navigate('Quiz Results', {
                img: quizImg,
                topic: quizTopic
            });
        }

        //remove it for now
    }, [indexQuestion]);

    //Use context - aka global variables we need
    const { questionCounter, correctAnsCounter, wrongAnsCounter, foundationsCounter, practicesCounter, historyCounter, setQuestionCounter, setCorrectAnsCounter, setWrongAnsCounter, setFoundationsCounter, setPracticesCounter, setHistoryCounter, totalNumofQ, colorTheme, soundOn } = useContextProvider();

    //For anim - useRef persists data across re-renders
    const widthAnimation = useRef(new Animated.Value(0)).current;
    const heightAnimation = useRef(new Animated.Value(0)).current;

    //Whenever a user presses on any of options for answers
    function submitAnswer(answer) {

        if (answer == questions.answers[questions.correctAnswer]) {
            soundManager.playSound('correctSound', soundOn)
            //Add tally to correct answers
            setCorrectAnsCounter(prevCounter => prevCounter + 1);

        } else {
            soundManager.playSound('incorrectSound', soundOn)
            setWrongAnsCounter(prevCounter => prevCounter + 1);
        }

        //Question has been attempted - register it as seen according to which category we're on
        //This can be improved for sure
        switch (quizTopic) {
            case 'Islamic Foundations':
                setFoundationsCounter(prevCounter => prevCounter + 1);
                //save
                saveCounter('foundationsCounter', foundationsCounter);
                break;
            case 'Islamic History':
                setHistoryCounter(prevCounter => prevCounter + 1);
                saveCounter('historyCounter', historyCounter);
                break;
            case 'Islamic Practices':
                setPracticesCounter(prevCounter => prevCounter + 1);
                saveCounter('practicesCounter', practicesCounter);
                break;
        }


        //Go next and save how many questions we done 
        setQuestionCounter(prevCounter => prevCounter + 1);

        setisClicked(true);
    }


    useEffect(() => {
        //See these variables basically just save it in case user decides to leave app (Persist)
        saveCounter('questionsAnswered', questionCounter);
        saveCounter('questionsCorrect', correctAnsCounter);
        saveCounter('questionsWrong', wrongAnsCounter);

        //Save these too (but probably not the best way )
        saveCounter('foundationsCounter', foundationsCounter);
        saveCounter('historyCounter', historyCounter);
        saveCounter('practicesCounter', practicesCounter);

    }, [questionCounter]);




    //Animations portion - Probably should move it to its own separate component
    const answerAnimation = () => {
        const widthAnimConfig = {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        };

        const heightAnimConfig = {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }

        //Start
        Animated.timing(widthAnimation, widthAnimConfig).start();
        Animated.timing(heightAnimation, heightAnimConfig).start();

    }

    answerAnimation();

    //Remove the first Q in array
    function removeTop() {
        //we are removing the FIRST question (i.e first index I guess);
        chosenQuestions.splice(0, 1);
        //save the array
        saveData(dataIndexKey, chosenQuestions);

    }

    //THE MAIN FUNCTION THAT FACILITATES THE ORDER
    function nextQuestion() {
        //Make sure we dont exceed out of bound
        //indexQuestion < quizData.length - 1
        if (chosenQuestions.length > 0) {
            //Increment question #
            //toggle clicked
            setisClicked(false);
        } else {
            //setIndexQuestion(indexQuestion => indexQuestion + 1);
            //removeTop();
            //Finish the quiz
            //& Save the data
            //navigation.navigate('Quiz Results');
        }
        //NEXT
        setIndexQuestion(indexQuestion => indexQuestion + 1);
    }

    // Save either questions attempted, questioned answered correctly or incorrectly
    // Function to increment counter and save to AsyncStorage
    const saveCounter = async (itemSaved, counter) => {
        try {
            await AsyncStorage.setItem(itemSaved, counter.toString());
        } catch (error) {
            console.error('Error saving counter to AsyncStorage:', error);
        }
    };

    const styles = createStyles(colorTheme);

    return (
        <ImageBackground source={quizImg} opacity={0.1} resizeMode="repeat" style={styles.container}
            imageStyle={{
                tintColor: colorTheme.colors.backgroundImg,
            }}>
            <SafeAreaView style={{ height: '100%', width: '100%' }}>
                <View style={{ flex: 1, alignItems: 'center', margin: 10, justifyContent: 'space-between' }}>
                    <View style={styles.questionBox}>
                        {/* QUESTION */}
                        {/* <Text style={styles.questionNumber}>Question {chosenQuestions[indexQuestion] + 1}/{totalNumofQ}:</Text> */}
                        <Text style={styles.questionNumber}>Question</Text>
                        <Text style={styles.question}>{questions.question}</Text>
                    </View>
                    {/* ANSWERS */}
                    {questions.answers.map((answer, index) => {
                        return (
                            //Basically the animation of when answers are spawned in.
                            <Animated.View
                                key={index}
                                style={[{
                                    width: widthAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0%', '100%'],
                                    }),
                                    height: heightAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0%', '16.5%'],
                                    }),
                                }]}>
                                <AnimatedAnswers isClicked={isClicked} isAnswerCorrect={questions.correctAnswer == index} submitAnswer={submitAnswer} answer={answer} index={index} />

                            </Animated.View>
                        )
                    })}
                    {/* button for next */}
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        {/* First leave the page and go back (backAction) then remove first question (top i guess) */}
                        <TouchableOpacity style={styles.nextButton} onPress={() => { backAction(navigation), soundManager.playSound('buttonPress', soundOn) }}>
                            <Text style={styles.nextButtonText} >End</Text>
                            <Image style={{ width: 25, height: 25, }} source={require('../assets/End.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.nextButton, isClicked ? null : ({ opacity: 0.75, backgroundColor: '#adadad' })]} onPress={() => nextQuestion()} disabled={!isClicked}>
                            <Text style={styles.nextButtonText} >Next </Text>
                            <Image style={{ width: 25, height: 25, }} source={require('../assets/Next.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View >

                <BackButton navigation={navigation} removeTop={removeTop} isClicked={isClicked} />
            </SafeAreaView >
        </ImageBackground>

    );
}


const createStyles = (colorTheme) => StyleSheet.create({

    container: {
        height: '100%'
    },

    questionNumber: {
        color: 'gray',
        textAlign: 'center',
    },

    answer: {
        margin: 'auto',
        width: '95%',
        padding: 40,
        borderRadius: 50,
        borderWidth: 2,
    },

    questionBox: {
        backgroundColor: '#FFE5B4',
        elevation: 10,
        borderRadius: 10,
        shadowColor: 'black',
        backgroundColor: colorTheme.colors.card,

    },

    question: {
        fontFamily: 'Anton',
        fontSize: 18,
        textAlign: 'center',
        padding: 10,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 20,
        borderWidth: 1,
        borderColor: colorTheme.colors.border
    },

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

    nextButton: {
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        marginVertical: 'auto',
        margin: 10,
        flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row',
        backgroundColor: colorTheme.colors.card,
        borderColor: colorTheme.colors.border
    },

    nextButtonText: {
        color: 'white',
        fontSize: 18,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 10,
    },

    backButton: {
        padding: 5,
        marginRight: 15,
    }
});

export default QuizScreen;

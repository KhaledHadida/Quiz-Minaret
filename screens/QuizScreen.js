import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated, BackHandler, Alert, ImageBackground, Image } from 'react-native';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { BackButton, backAction } from '../components/BackButton';

//Quizzes statically imported
import quizIslamicFoundations from '../quizzes/English/Islamic Foundations.json';
import quizIslamicHistory from '../quizzes/English/Islamic History.json';
import quizIslamicPractices from '../quizzes/English/Islamic Practices.json';

//Import images
import imageIslamicFoundations from '../assets/Islamic Foundation.png'
import imageIslamicHistory from '../assets/Islamic History.png';
import imageIslamicPractices from '../assets/Islamic Practice.png';

import { useContextProvider } from './ContextProvider';

//Import useful functions
import { saveQuestionIndices, removeQuestionIndex } from '../components/StorageUtils';


//import Nunito from '../assets/fonts/Nunito.ttf';

const QuizScreen = ({ route, navigation }) => {
    //The chosenQuestions is the currentIndices ([0,4,6,2,1..])
    const { quizTopic, quizImg, quizData, chosenQuestions, dataIndexKey } = route.params;
    //Did user click on an answer?
    const [isClicked, setisClicked] = useState(false);
    //Current index we are on
    const [indexQuestion, setIndexQuestion] = useState(0);
    //Current Question we are on
    const [questions, setQuestions] = useState(quizData[indexQuestion]);

    //Fetch random values
    const setRandomQuestionIndex = () => {
        //i.e chosenQuestions = [1,2,3,4,8] --> randomIndex = 1 --> chosenQuestions[1] = 2..
        setIndexQuestion(chosenQuestions[randomIndex]);
        console.log("This is the random value we got " + randomIndex + " This is the set one " + indexQuestion);
        //Display the array for testing
        console.log("Array that is left " + chosenQuestions);

    };
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
            navigation.navigate('Quiz Results', {
                msg: 'You are done!',
                resetBool: false
            });
        }

        console.log("Current index is at " + indexQuestion + " Which should be " + chosenQuestions[indexQuestion]);
        //remove it for now
    }, [chosenQuestions[0]]);

    //Use context - aka global variables we need
    const { questionCounter, correctAnsCounter, wrongAnsCounter, foundationsCounter, practicesCounter, historyCounter, setQuestionCounter, setCorrectAnsCounter, setWrongAnsCounter, setFoundationsCounter, setPracticesCounter, setHistoryCounter } = useContextProvider();

    //For anim - useRef persists data across re-renders
    const widthAnimation = useRef(new Animated.Value(0)).current;
    const heightAnimation = useRef(new Animated.Value(0)).current;

    //Whenever a user presses on any of options for answers
    function submitAnswer(answer) {

        if (answer == questions.answers[questions.correctAnswer]) {
            console.log("Correct ");
            //Add tally to correct answers
            setCorrectAnsCounter(prevCounter => prevCounter + 1);

        } else {
            console.log("Wrong");
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
    }, [questionCounter]);

    //Animations portion
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

    function removeTop() {
        chosenQuestions.splice(indexQuestion, 1);
        //save the array
        saveQuestionIndices(dataIndexKey, chosenQuestions);

    }

    //THE MAIN FUNCTION THAT FACILITATES THE ORDER
    function nextQuestion() {
        //Make sure we dont exceed out of bound
        //indexQuestion < quizData.length - 1
        if (chosenQuestions.length > 0) {
            //Increment question #
            //setIndexQuestion(indexQuestion => indexQuestion + 1);
            //Omit that index out of the array now
            console.log("Which one went first?");
            removeTop();
            //setRandomQuestionIndex();
            //Change the actual question 
            //setQuestions(quizData[indexQuestion + 1]);
            console.log("Change helo" + chosenQuestions);
            //toggle clicked
            setisClicked(false);
        } else {
            //Finish the quiz
            //& Save the data
            //navigation.navigate('Quiz Results');
        }

    }

    // Save either questions attempted, questioned answered correctly or incorrectly
    // Function to increment counter and save to AsyncStorage
    const saveCounter = async (itemSaved, counter) => {
        try {
            await AsyncStorage.setItem(itemSaved, counter.toString());
            console.log("Ok now we are at .. " + counter);
        } catch (error) {
            console.error('Error saving counter to AsyncStorage:', error);
        }
    };


    // Function to increment counter and save to AsyncStorage
    //params function 
    return (
        <ImageBackground source={quizImg} opacity={0.15} resizeMode="repeat" style={styles.container}>
            <SafeAreaView style={{ height: '100%' }}>
                <View style={{ flex: 1, alignItems: 'center', margin: 10, justifyContent: 'space-between' }}>
                    <View style={{
                        backgroundColor: '#FFE5B4',
                        elevation: 10,
                        borderRadius: 10,
                        shadowColor: 'black',
                    }}>
                        {/* QUESTION */}
                        <Text style={styles.questionNumber}>Question {chosenQuestions[indexQuestion] + 1}/10:</Text>
                        <Text style={styles.question}>{questions.question}</Text>
                    </View>
                    {/* ANSWERS */}
                    {questions.answers.map((answer, index) => {
                        return (
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
                                <TouchableOpacity key={index} disabled={isClicked} style={isClicked ? (questions.correctAnswer == index ? styles.answerCorrect : styles.answerWrong) : styles.answerNeutral} onPress={() => submitAnswer(questions.answers[index],)}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 16,
                                        textAlign: 'center',
                                        flexWrap: 'wrap',
                                    }}>{answer}</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        )
                    })}
                    {/* button for next */}
                    {isClicked ? (
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                            {/* First leave the page and go back (backAction) then remove first question (top i guess) */}
                            <TouchableOpacity style={styles.nextButton} onPress={() => {backAction(navigation); removeTop()}}>
                                <Text style={styles.nextButtonText} >End</Text>
                                <Image style={{ width: 25, height: 25, }} source={require('../assets/End.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.nextButton} onPress={() => nextQuestion()}>
                                <Text style={styles.nextButtonText} >Next </Text>
                                <Image style={{ width: 25, height: 25, }} source={require('../assets/Next.png')}></Image>
                            </TouchableOpacity>
                        </View>


                    ) : null
                    }
                </View >

                <BackButton navigation={navigation} />
            </SafeAreaView >
        </ImageBackground>

    );
}


const styles = StyleSheet.create({
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

    question: {
        fontFamily: 'Anton',
        fontSize: 18,
        textAlign: 'center',
        padding: 15,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 20,
        borderWidth: 1,

    },
    answerNeutral: {
        backgroundColor: 'white',
        margin: 'auto',
        width: '95%',
        padding: 20,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'grey',
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
        backgroundColor: '#B5C18E',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#B99470',
        marginVertical: 'auto',
        marginRight: 10,
        flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'
    },

    nextButtonText: {
        color: 'white',
        fontSize: 18,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 10,
        // paddingHorizontal: 20
    },

    backButton: {
        padding: 5,
        marginRight: 15,
    }
});

export default QuizScreen;

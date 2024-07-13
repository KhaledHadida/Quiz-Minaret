import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Translations from '../components/Translations';

const SharedStateContext = createContext();

//Font
import { useFonts } from 'expo-font';


export const SharedContextProvider = ({ children }) => {
    //for questions asked
    const [questionCounter, setQuestionCounter] = useState(0);
    //for correct answers
    const [correctAnsCounter, setCorrectAnsCounter] = useState(0);
    //for wrong answers
    const [wrongAnsCounter, setWrongAnsCounter] = useState(0);

    //For the categories: 
    const [foundationsCounter, setFoundationsCounter] = useState(0);
    const [practicesCounter, setPracticesCounter] = useState(0);
    const [historyCounter, setHistoryCounter] = useState(0);

    //For settings
    const [language, setLanguage] = useState('English');
    const [colorTheme, setColorTheme] = useState('Light');
    const [soundOn, setSoundOn] = useState(true);

    //This basically retrieves the JSON for us.. Translations['en'] would give us the entire JSON.. 
    const translate = (key) => {
        return Translations[language][key] || key;
    };

    //Load it if it exists?
    useEffect(() => {
        const loadState = async () => {
            console.log("we're loading...");
            try {
                //fetch data
                const storedQuestions = await AsyncStorage.getItem("questionsAnswered");
                const storedCorrectAns = await AsyncStorage.getItem("questionsCorrect");
                const storedWrongAns = await AsyncStorage.getItem("questionsWrong");

                //fetch data for the categories answered
                const storedFoundations = await AsyncStorage.getItem("foundationsCounter");
                const storedPractices = await AsyncStorage.getItem("practicesCounter");
                const storedHistory = await AsyncStorage.getItem("historyCounter");

                //Found ? - if so then store it in our useState
                storedQuestions ? setQuestionCounter(Number(storedQuestions)) : setQuestionCounter(0);
                storedCorrectAns ? setCorrectAnsCounter(Number(storedCorrectAns)) : setCorrectAnsCounter(0);
                storedWrongAns ? setWrongAnsCounter(Number(storedWrongAns)) : setWrongAnsCounter(0);

                storedFoundations ? setFoundationsCounter(Number(storedFoundations)) : setFoundationsCounter(0);
                storedPractices ? setPracticesCounter(Number(storedPractices)) : setPracticesCounter(0);
                storedHistory ? setHistoryCounter(Number(storedHistory)) : setHistoryCounter(0);


                // if(storedQuestions){
                //     //console.log("we got.." + storedState);

                //     //console.log("loading success..." + storedState);
                // }

            } catch (err) {
                console.log("we failed..." + err);
                console.error('Error loading from asyncstorage ', err);
            }
        }

        const deleteStorage = async () => {
            console.log("Storage Deleted");
            const storedState = await AsyncStorage.removeItem("questionsAnswered");
        };
        //deleteStorage();

        loadState();
    }, []);


    //handle all font importing here - We rather load fonts here so it's global everywhere
    //Import the font
    const [isLoaded] = useFonts({
        "Nunito": require('../assets/fonts/Nunito.ttf'),
        "BriemHand": require('../assets/fonts/BriemHand.ttf'),
        "Anton": require('../assets/fonts/Anton.ttf'),
    });

    if (!isLoaded) {
        console.log("LOADED");
        return null;
    }



    return (
        <SharedStateContext.Provider value={{ questionCounter, setQuestionCounter, correctAnsCounter, setCorrectAnsCounter, wrongAnsCounter, setWrongAnsCounter, foundationsCounter, setFoundationsCounter, practicesCounter, setPracticesCounter, historyCounter, setHistoryCounter, setLanguage, colorTheme, setColorTheme, soundOn, setSoundOn, translate}}>
            {children}
        </SharedStateContext.Provider>
    )
}

export const useContextProvider = () => useContext(SharedStateContext);
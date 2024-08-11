import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Translations from '../components/Translations';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { saveData } from '../components/StorageUtils';

const SharedStateContext = createContext();

//Fonts
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

    //This is hardcoded value of all the questions in each topic (I plan to keep questions the same in each topic, for now 100)
    const [totalNumofQ, setTotalNumofQ] = useState(100);

    //This is to give background color to all screens (Default)
    const LightTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: '#F7DCB9',
            //Icons & backgroundImg are the same 
            backgroundImg: '#000000',
            tabSelected: '#9ea87b',
            answer: '#ffffff',
            border: '#B99470',
            card: '#B5C18E',
            text: '#80532d',
            headerText: '#613f22',
        },
    };

    const DarkAppTheme = {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            background: '#1e1e1e',
            backgroundImg: '#ffffff',
            tabSelected: '#565656',
            answer: '#565656',
            border: '#565656',
            card: '#333333',
            text: '#ffffff',
            headerText: '#ffffff'
        },
    };

    //Mapped out themes based on strings as keys
    const themes = {
        "Light": LightTheme,
        "Dark": DarkAppTheme
    }

    //For settings
    const [language, setLanguage] = useState('English');
    //This stores the string for which theme
    const [colorThemeText, setColorThemeText] = useState("Light");

    //This stores the actual theme
    const [colorTheme, setColorTheme] = useState(themes[colorThemeText]);
    //Sounds 
    const [soundOn, setSoundOn] = useState(true);


    //For now I am just doing 2 themes
    const changeTheme = (theme) => {
        try {
            setColorThemeText(theme);
            setColorTheme(themes[theme]);
            //Save the theme 
            saveData("themeSet", theme);
        } catch (err) {
            console.log("Error in selecting a theme.. " + err);
        }
    };

    const changeLanguage = (lang) => {
        try {
            setLanguage(lang);
            saveData("languageSet", lang);
        } catch (err) {
            console.log("Error in selecting a language.. " + err);
        }
    };

    const changeSound = (sound) => {
        try {
            setSoundOn(sound);
            saveData("soundSet", sound);
        } catch (err) {
            console.log("Error in selecting a sound.. " + err);
        }
    };

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

                //Fetch data for preferences
                const storedLanguage = await AsyncStorage.getItem("languageSet");
                const storedTheme = await AsyncStorage.getItem("themeSet");
                const storedSound = await AsyncStorage.getItem("soundSet");

                //Found ? - if so then store it in our useState
                storedQuestions ? setQuestionCounter(Number(storedQuestions)) : setQuestionCounter(0);
                storedCorrectAns ? setCorrectAnsCounter(Number(storedCorrectAns)) : setCorrectAnsCounter(0);
                storedWrongAns ? setWrongAnsCounter(Number(storedWrongAns)) : setWrongAnsCounter(0);

                storedFoundations ? setFoundationsCounter(Number(storedFoundations)) : setFoundationsCounter(0);
                storedPractices ? setPracticesCounter(Number(storedPractices)) : setPracticesCounter(0);
                storedHistory ? setHistoryCounter(Number(storedHistory)) : setHistoryCounter(0);

                //Save the user's preferences:
                storedLanguage ? setLanguage(storedLanguage) : setLanguage("English");
                storedTheme ? setColorTheme(themes[storedTheme]) : changeTheme(colorThemeText);
                //Turns out I was saving the bool as a string.. so "true" does not equal true
                storedSound ? setSoundOn(JSON.parse(storedSound)) : changeSound(true);

            } catch (err) {
                console.log("we failed..." + err);
                console.error('Error loading from asyncstorage ', err);
            }
        }

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
        return null;
    }

    return (
        <SharedStateContext.Provider value={{ questionCounter, setQuestionCounter, correctAnsCounter, setCorrectAnsCounter, wrongAnsCounter, setWrongAnsCounter, foundationsCounter, setFoundationsCounter, practicesCounter, setPracticesCounter, historyCounter, setHistoryCounter, language, changeLanguage, colorTheme, changeTheme, soundOn, changeSound, translate, totalNumofQ }}>
            {children}
        </SharedStateContext.Provider>
    )
}

export const useContextProvider = () => useContext(SharedStateContext);
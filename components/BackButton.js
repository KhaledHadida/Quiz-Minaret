//The purpose of this js file arose from the fact QuizScreen.js was getting extremely long so I had to break it up for maintainability 
import React, { useEffect, useLayoutEffect } from 'react';
import { Alert, BackHandler, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useContextProvider } from '../screens/ContextProvider';

//Back action as an alert that pops up
const backAction = (navigation) => {
    Alert.alert(`Are you sure you want to exit?`, 'You will not lose progress.', [
        {
            text: 'No',
            onPress: () => null,
            style: 'cancel',
        },
        {
            text: 'YES', onPress: () => {
                navigation.goBack()
            }
        },
    ]);
    return true;
};

//The actual component for backbutton, passing isClicked to check if user has pressed or not since we want to ensure user ..
//Has already answered the question before going back - if so then remove the question
const BackButton = ({ navigation, removeTop, isClicked }) => {

    useEffect(() => {
        if (isClicked) {
            removeTop();
        }
    }, [isClicked])

    const { colorTheme } = useContextProvider();

    //This is for the back button created by default: (want to give it pop up modal if user accidentally exits)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={styles.backButton} onPress={() => {
                    backAction(navigation);
                }}>
                    <MaterialIcons name="arrow-back" size={24} color={colorTheme.colors.text} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);


    //The modal (aka pop up) via the mobile's back button (not the top left back button)
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => backAction(navigation),
        );
        return () => backHandler.remove();
    }, []);

}

const styles = StyleSheet.create({

    backButton: {
        padding: 5,
        marginRight: 15,
    }
});
export { BackButton, backAction };
//The purpose of this js file arose from the fact QuizScreen.js was getting extremely long so I had to break it up for maintainability 
import React, { useEffect, useLayoutEffect } from 'react';
import { Alert, BackHandler, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const backAction = (navigation) => {
    Alert.alert('Are you sure you want to exit?', 'All quiz progress will be lost.', [
        {
            text: 'No',
            onPress: () => null,
            style: 'cancel',
        },
        { text: 'YES', onPress: () => navigation.goBack() },
    ]);
    return true;
};


const BackButton = ({ navigation }) => {

    //This is for the back button created by default: (want to give it pop up modal if user accidentally exits)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={styles.backButton} onPress={() => backAction(navigation)}>
                    <MaterialIcons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);


    //The modal (aka pop up)
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            ()=> backAction(navigation),
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
export {BackButton, backAction};
import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Congrats from '../components/Congrats';
import { useContextProvider } from './ContextProvider';
import soundManager from '../components/SoundManager';

const QuizResultScreen = ({ route, navigation }) => {

    //Parameters
    const { img, topic } = route.params;
    const { translate, colorTheme, soundOn } = useContextProvider();

    const handleBackButton = () => {
        // Return true to prevent default behavior (i.e., prevent navigating back)
        return true;
    };


    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        // Clean up event listener when component unmounts
        return () => {
            backHandler.remove();
        };

    }, []);

    const styles = createStyles(colorTheme);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Congrats quizImg={img} quizTopic={topic} />
            </View>
            {/* Button to start quiz */}
            <TouchableOpacity style={styles.quizButton} onPress={() => {soundManager.playSound('buttonPress', soundOn) , navigation.navigate("Home")}}>
                <Text style={styles.startText}>{translate('home')}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const createStyles = (colorTheme) => StyleSheet.create({

    startButton: {
        backgroundColor: 'green',
        margin: 25,
        borderRadius: 10,
        padding: 20,
    },
    startText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },

    quizButton: {
        borderRadius: 30,
        marginHorizontal: 30,
        padding: 20,
        margin: 25,
        borderWidth: 2,
        borderColor: '#B99470',
        shadowColor: '#000',
        elevation: 6,
        backgroundColor: colorTheme.colors.card, 
        borderColor: colorTheme.colors.border
    },
});

export default QuizResultScreen;
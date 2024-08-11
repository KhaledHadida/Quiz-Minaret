import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContextProvider } from './ContextProvider';
import soundManager from '../components/SoundManager';

//This is the first screen a user would see when loading the app, showcases the different topics a user can navigate
const QuizHomeScreen = ({ navigation }) => {

    const { translate, colorTheme, soundOn } = useContextProvider();

    //These are the subtopics - i.e "Quran", "Prophets", "Sunnah and Hadith", "Aqeedah (Islamic Belief)"
    const foundationTopics = translate('foundations_topics');
    const practicesTopics = translate('practices_topics');
    const historyTopics = translate('history_topics');

    const styles = createStyles(colorTheme);

    return (
        <ImageBackground source={require('../assets/minaret.png')} opacity={0.1}
            style={{ height: '100%', width: '100%' }}
            imageStyle={styles.backgroundImg}>

            <SafeAreaView style={{ height: '100%' }}>
                <View style={styles.headerView}>
                    <Text style={[styles.salamText, { color: colorTheme.colors.headerText }]}>{translate('greeting')}</Text>
                    <Text style={[styles.headerText, { color: colorTheme.colors.text }]}>{translate('quiz_intro')}</Text>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.quizButton} onPress={() => {
                        navigation.navigate("Quiz Transition", {
                            points:
                                foundationTopics.map((topic) => {
                                    return { key: topic }
                                })
                            ,
                            topic: "Islamic Foundations"
                        }), soundManager.playSound('buttonPress', soundOn)
                    }}>
                        <Text style={styles.quizButtonText} >{translate('islamic_foundations')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quizButton} onPress={() => {
                        navigation.navigate("Quiz Transition", {
                            points:
                                practicesTopics.map((topic) => {
                                    return { key: topic }
                                })
                            ,
                            topic: "Islamic Practices"
                        }), soundManager.playSound('buttonPress', soundOn)
                    }}>
                        <Text style={styles.quizButtonText} >{translate('islamic_practices')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quizButton} onPress={() => {
                        navigation.navigate("Quiz Transition", {
                            points:
                                historyTopics.map((topic) => {
                                    return { key: topic }
                                })
                            ,
                            topic: "Islamic History"
                        }), soundManager.playSound('buttonPress', soundOn)
                    }}>
                        <Text style={styles.quizButtonText} >{translate('islamic_history')}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const createStyles = (colorTheme) => StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
    },

    backgroundImg: {
        resizeMode: 'repeat',
        borderColor: 'black',
        borderWidth: 2,
        tintColor: colorTheme.colors.backgroundImg
    },

    headerView: {
        paddingBottom: 15,
        paddingTop: 5,
    },

    salamText: {
        fontFamily: 'Anton',
        fontSize: 35,
        textAlign: 'center',
        color: '#613f22',
    },

    headerText: {
        fontFamily: 'Anton',
        fontSize: 20,
        textAlign: 'center',
        color: '#80532d',
    },

    backGroundImage: {
        backgroundColor: '#F7DCB9'
    },

    quizButton: {
        flex: 1,
        borderRadius: 50,
        marginHorizontal: 30,
        padding: 20,
        margin: 20,
        borderWidth: 2,
        shadowColor: '#000',
        elevation: 6,
        backgroundColor: colorTheme.colors.card,
        borderColor: colorTheme.colors.border

    },

    quizButtonText: {
        textAlign: 'center',
        margin: 'auto',
        fontSize: 18,
        fontFamily: 'Anton',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 10
    },
});

export default QuizHomeScreen;
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContextProvider } from './ContextProvider';

const QuizHomeScreen = ({ navigation }) => {

    const {translate} = useContextProvider();

    const foundationTopics = translate('foundations_topics');
    const practicesTopics = translate('practices_topics');
    const historyTopics = translate('history_topics');

    console.log(foundationTopics);
    return (
        <ImageBackground source={require('../assets/minaret.png')} opacity={0.15}
            style={{ height: '100%', width: '100%' }}
            imageStyle={{
                resizeMode: 'repeat',
                borderColor: 'black',
                borderWidth: 2,
            }}>
            <SafeAreaView style={{ height: '100%' }}>
                <View style={styles.headerView}>
                    <Text style={styles.salamText}>{translate('greeting')}</Text>
                    <Text style={styles.headerText}>{translate('quiz_intro')}</Text>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate("Quiz Transition", {
                        points: 
                            foundationTopics.map((topic)=>{
                                return {key: topic}
                            })
     
                        ,
                        topic: "Islamic Foundations"
                    })}>
                        <Text style={styles.quizButtonText} >{translate('button_foundations')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate("Quiz Transition", {
                        points: 
                            practicesTopics.map((topic)=>{
                                return {key: topic}
                            })
     
                        ,
                        topic: "Islamic Practices"
                    })}>
                        <Text style={styles.quizButtonText} >{translate('button_practices')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate("Quiz Transition", {
                        points: 
                        historyTopics.map((topic)=>{
                            return {key: topic}
                        })
 
                    ,
                        topic: "Islamic History"
                    })}>
                        <Text style={styles.quizButtonText} >{translate('button_history')}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>


    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
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
        // textShadowColor: 'rgba(0, 0, 0, 0.25)',
        // textShadowOffset: {width: 1, height: 1},
        // textShadowRadius: 10
    },

    headerText: {
        fontFamily: 'Anton',
        fontSize: 20,
        textAlign: 'center',
        //#634e10
        color: '#80532d',
        // textShadowColor: 'rgba(0, 0, 0, 0.5)',
        // textShadowOffset: {width: 1, height: 1},
        // textShadowRadius: 10
    },

    backGroundImage: {
        backgroundColor: '#F7DCB9'
    },

    quizButton: {
        flex: 1,
        backgroundColor: '#B5C18E',
        borderRadius: 50,
        marginHorizontal: 30,
        padding: 20,
        margin: 20,
        borderWidth: 2,
        borderColor: '#B99470',
        shadowColor: '#000',
        elevation: 6,

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
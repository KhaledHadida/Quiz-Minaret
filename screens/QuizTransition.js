import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';

//Quizzes statically imported
//Dynamically loading JSON was a bit troublesome (I may investigate it in future) - but as of now I'll statically load it all
import { quizDataMapping, imageMapping } from '../components/DataMapped';

//Import images
import imageIslamicFoundations from '../assets/Islamic Foundation.png'
import imageIslamicHistory from '../assets/Islamic History.png';
import imageIslamicPractices from '../assets/Islamic Practice.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContextProvider } from './ContextProvider';

import { saveData } from '../components/StorageUtils';

//Sounds
import soundManager from '../components/SoundManager';

const QuizTransition = ({ route, navigation }) => {
    const { points, topic } = route.params;
    //Encapsulate this using React's state mac
    const [currentIndices, setCurrentIndices] = useState([]);

    const { translate, totalNumofQ, colorTheme, language, soundOn } = useContextProvider();

    let dataIndices;

    //Load the collection of quiz according to language & topic, i.e English and Islamic Foundations gives us a dataset to display
    const data = quizDataMapping[language][topic];
    //Likewise images are retrieved similar to how quiz data is
    const currentImg = imageMapping[topic];

    //This switch case could be switched into dictionary i.e 
    //dict = {'topicName': 'FoundationsIndex' .. } 
    switch (topic) {
        case 'Islamic Foundations':
            dataIndices = 'FoundationsIndex';
            break;
        case 'Islamic History':
            dataIndices = 'HistoryIndex';
            break;
        case 'Islamic Practices':
            dataIndices = 'PracticesIndex';
            break;
    }


    //Does it exist? if so load the array
    const getQuestionIndices = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log("ERROR, NONE FOUND, WILL MAKE A NEW ARRAY");
            return null;
        }
    }

    //Dynamically change title
    useEffect(() => {
        const fetchIndices = async () => {
            let indices = await getQuestionIndices(dataIndices);
            if (indices != null) {
                console.log("WE FOUND THE INDICES");
                console.log(indices);
            } else {
                console.log("WE DID NOT FIND THE INDICES");
                //This generates a random sequence of unique numbers from 0 to n-1 (n being length of array)
                indices = Array.from({ length: totalNumofQ }, (_, i) => i).sort(() => Math.random() - 0.5);
                await saveData(dataIndices, indices);
            }
            setCurrentIndices(indices);
        };

        fetchIndices();
        //This is for the top bar title of the quiz
        navigation.setOptions({
            title: topic || 'Default Title',
        });
    }, []);


    const styles = createStyles(colorTheme);

    //Points is the bullet points explaining the topics, 
    //Topic is either Islamic Foundations, Islamic Practices or Islamic History
    return (
        <ImageBackground source={currentImg} opacity={0.1} resizeMode="repeat" style={styles.container}
            imageStyle={{
                tintColor: colorTheme.colors.backgroundImg
            }}>
            <SafeAreaView style={styles.container}>
                <View >
                    <Text style={[styles.headerText, { color: colorTheme.colors.headerText }]}>{translate('topics')}</Text>
                    <FlatList
                        data={points}
                        renderItem={({ item, index }) => (
                            <View style={
                                styles.topicButton
                            }>
                                <View style={styles.bulletPoint}>
                                    <Text style={{
                                        color: colorTheme.colors.text,
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                    }}>
                                        {index + 1}
                                    </Text>
                                </View>
                                <Text style={[styles.topics, { color: colorTheme.colors.text }]} numberOfLines={2}>
                                    {item.key}
                                </Text>
                            </View>
                        )}
                    />
                </View>

                {/* Button to start quiz */}
                <TouchableOpacity style={styles.startButton} onPress={() => {
                    navigation.navigate("Quiz", {
                        //Params we passing (No point retrieving it again in next screen)
                        //i.e "Islamic Foundations"
                        quizTopic: topic,
                        //i.e image.png (the actual image)
                        quizImg: currentImg,
                        //i.e {"question":" .... ", "Answers"["..."]}
                        quizData: data,
                        //i.e [0,1,2,3,4,5,6,7...]
                        chosenQuestions: currentIndices,
                        //i.e "FoundationsIndex", "HistoryIndex", etc
                        dataIndexKey: dataIndices,
                    }), soundManager.playSound('buttonPress', soundOn);
                }}>
                    <Text style={styles.startText}>{translate('start')}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
}

const createStyles = (colorTheme) => StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%', height: '100%',
    },
    headerText: {
        margin: 15,
        fontFamily: 'Anton',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',

    },
    topics: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        flexWrap: 'wrap',
        flexShrink: 1,
    },

    bulletPoint: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: '#B58E91',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    topicButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        borderWidth: 1,
        padding: 20,
        backgroundColor: colorTheme.colors.card,
        borderColor: colorTheme.colors.border
    },

    startButton: {
        margin: 25,
        borderRadius: 30,
        padding: 20,
        borderWidth: 1,
        backgroundColor: colorTheme.colors.card,
        borderColor: colorTheme.colors.border

    },

    startText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 10
    }
});

export default QuizTransition;

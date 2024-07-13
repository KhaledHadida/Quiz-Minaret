import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';

//Quizzes statically imported
import quizIslamicFoundations from '../quizzes/English/Islamic Foundations.json';
import quizIslamicHistory from '../quizzes/English/Islamic History.json';
import quizIslamicPractices from '../quizzes/English/Islamic Practices.json';

//Import images
import imageIslamicFoundations from '../assets/Islamic Foundation.png'
import imageIslamicHistory from '../assets/Islamic History.png';
import imageIslamicPractices from '../assets/Islamic Practice.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContextProvider } from './ContextProvider';

const QuizTransition = ({ route, navigation }) => {
    const { points, topic } = route.params;
    //Encapsulate this using React's state mac
    const [currentIndices, setCurrentIndices] = useState([]);

    const {translate} = useContextProvider();
    let currentImg;
    let data;
    let dataIndices;
    switch (topic) {
        case 'Islamic Foundations':
            currentImg = imageIslamicFoundations;
            data = quizIslamicFoundations;
            dataIndices = 'FoundationsIndex';
            break;
        case 'Islamic History':
            currentImg = imageIslamicHistory;
            data = quizIslamicHistory;
            dataIndices = 'HistoryIndex';
            break;
        case 'Islamic Practices':
            currentImg = imageIslamicPractices;
            data = quizIslamicPractices;
            dataIndices = 'PracticesIndex';
            break;
        default:
            currentImg = imageIslamicFoundations;
            //maybe temporary
            data = quizIslamicFoundations;
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

    //Save the indices of the questions (i.e 0,1,2,3,4.. etc) that have been seen by user.
    const saveQuestionIndices = async (key, array) => {
        try {
            const convertArrytoJson = JSON.stringify(array);
            await AsyncStorage.setItem(key, convertArrytoJson);
            console.log("Array has been successfully stored");

        } catch (e) {
            console.error('Failed to save array to AsyncStorage', e);
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
                const length = 10;
                //This generates a random sequence of unique numbers from 0 to n-1 (n being length of array)
                indices = Array.from({ length }, (_, i) => i).sort(() => Math.random() - 0.5);
                await saveQuestionIndices(dataIndices, indices);
                console.log(indices);
            }
            setCurrentIndices(indices);
        };

        fetchIndices();

        navigation.setOptions({
            title: topic || 'Default Title',
        });
    },[]);
    //Points is the bullet points explaining the topics, 
    //Topic is either Islamic Foundations, Islamic Practices or Islamic History
    return (
        <ImageBackground source={currentImg} opacity={0.15} resizeMode="repeat" style={styles.container}>
            <SafeAreaView style={styles.container}>
                <View >
                    <Text style={styles.headerText}>{translate('topics')}</Text>

                    <FlatList
                        data={points}
                        renderItem={({ item, index }) => (
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#B5C18E',
                                marginVertical: 10,
                                borderWidth: 1,
                                borderColor: '#B99470',
                                padding: 20, // Add padding to the container
                            }}>
                                <View style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    backgroundColor: '#B58E91',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: 10,
                                }}>
                                    <Text style={{
                                        color: 'white',
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                    }}>
                                        {index + 1}
                                    </Text>
                                </View>
                                <Text style={styles.topics} numberOfLines={2}>
                                    {item.key}
                                </Text>
                            </View>
                        )}
                    />
                </View>

                {/* Button to start quiz */}
                <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate("Quiz", {
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
                })}>
                    <Text style={styles.startText}>Start</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    headerText: {
        margin: 15,
        fontFamily: 'Anton',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 20,

    },
    topics: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        flexWrap: 'wrap',
        flexShrink: 1,


    },
    startButton: {
        backgroundColor: '#B5C18E',
        margin: 25,
        borderRadius: 30,
        padding: 20,
        borderWidth: 1,
        borderColor: '#B99470',
        
    },
    startText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: 1, height: 2},
        textShadowRadius: 10
    }
});

export default QuizTransition;

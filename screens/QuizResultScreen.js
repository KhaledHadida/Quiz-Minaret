import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const QuizResultScreen = ({ route, navigation }) => {

    //Parameters
    const { msg, resetBool } = route.params;

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
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>Results!</Text>
            <Text>{msg}</Text>
            {/* Button to start quiz */}
            <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.startText}>Go Home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    }
});

export default QuizResultScreen;
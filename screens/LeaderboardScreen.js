import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const LeaderboardScreen = () => {


    const references = [
        {
            id: 1, url: 'https://www.freepik.com/icon/minaret_4815747', text: 'Minaret icons created by Freepik - Flaticon',

        }
    ]
    return (
        <View style={{ flex: 1, }}>
            <ImageBackground source={require('../assets/minaret.png')} opacity={0.15} style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}
                imageStyle={{
                    resizeMode: 'repeat',
                    borderColor: 'black',
                    borderWidth: 2,
                }}>
                <Text>Leaderboard! Is currently in progress..</Text>
            </ImageBackground >
        </View >
    );
}

export default LeaderboardScreen;
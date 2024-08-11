import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useContextProvider } from './ContextProvider';

//This is put on pause for now, plan is to incorporate some integration with google sso for users to create their accounts
//The leaderboard would show usernames and their corresponding correct answer average.
const LeaderboardScreen = () => {

    const{translate, colorTheme} = useContextProvider();
    const styles = createStyles(colorTheme);
    return (
        <View style={{ flex: 1, }}>
            <ImageBackground source={require('../assets/minaret.png')} opacity={0.1} style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                imageStyle={{
                    resizeMode: 'repeat',
                    borderColor: 'black',
                    borderWidth: 2,
                    tintColor: colorTheme.colors.backgroundImg
                }}>
                <Text style={styles.headerText}>{translate("leaderboard")}</Text>
            </ImageBackground >
        </View >
    );
}

const createStyles = (colorTheme) => StyleSheet.create({
    headerText: {
        fontFamily: 'Anton',
        fontSize: 25,
        textAlign: 'center',
        color: '#80532d',
        color: colorTheme.colors.text,
    },
});

export default LeaderboardScreen;
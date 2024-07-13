import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground, Text, Linking, StyleSheet } from "react-native";
import { useContextProvider } from "./ContextProvider";

const CreditsScreen = () => {

    const {translate} = useContextProvider();
    //Link them 
    const handleLink = (url) => {
        Linking.openURL(url).catch((err) => console.log("URL not working.."));
    };
    return (
        <ImageBackground source={require('../assets/minaret.png')} opacity={0.15} style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}
            imageStyle={{
                resizeMode: 'repeat',
                borderColor: 'black',
                borderWidth: 2,
            }}>
            <SafeAreaView style={{ flex: 1, marginBottom: 25 }}>
                <Text style={styles.headerText}>{translate("credits_thanks")}</Text>
                <Text onPress={() => handleLink("https://www.freepik.com/icon/minaret_4815747")} style={styles.link}>
                    Minaret icons created by Freepik - Flaticon
                </Text>
                {/* Sun & moon pic */}
                <Text onPress={() => handleLink("https://www.freepik.com/icon/islam_1051465#fromView=search&page=1&position=6&uuid=10d6069a-57e0-4473-986a-6ad524d05f7a")} style={styles.link}>
                    Moon Crescent - Icon by Freepik
                </Text>
                {/* history pic */}
                <Text onPress={() => handleLink("https://www.freepik.com/icon/book_4613201#fromView=search&page=1&position=33&uuid=1e1d5b7c-791a-42c9-a9d0-086d567d6071")} style={styles.link}>
                   Book - Icon by Freepik
                </Text>
                {/* studying pic */}
                <Text onPress={() => handleLink("https://www.freepik.com/icon/read-quran_15993104#fromView=search&page=1&position=28&uuid=0a93c425-8df6-45d9-b059-93b2f1babe25")} style={styles.link}>
                    Read Quran icon - Icon by fadlyrusady13
                </Text>
                {/* Home Icon */}
                <Text onPress={() => handleLink("https://www.freepik.com/icon/home_263115#fromView=search&page=1&position=0&uuid=0961a490-da9e-448c-81ac-c87b7d572e85")} style={styles.link}>
                    Home - Icon by Freepik
                </Text>
                <Text onPress={() => handleLink("https://www.freepik.com/icon/podium_2619052#fromView=search&page=1&position=79&uuid=f623489d-015e-46ba-8ead-5081ab301bf1")} style={styles.link}>
                    Podium - Icon by Good Ware
                </Text>
                <Text onPress={() => handleLink("https://www.freepik.com/icon/business-intelligence_16844565#fromView=search&page=1&position=28&uuid=cb86896c-94d6-4e88-aa0d-fa45f9fd21f4")} style={styles.link}>
                    Business Intelligence Icon - Icon by gravisio
                </Text>
                <Text onPress={() => handleLink("https://www.freepik.com/icon/right-arrow-circular-button-outline_54240#fromView=search&page=1&position=1&uuid=1be409c0-cca8-4403-bdf3-8a9e4846330e")} style={styles.link}>
                    Right Arrow - Icon by Catalin Fertu
                </Text>
                <Text onPress={() => handleLink("https://www.freepik.com/icon/flag_12108429#fromView=search&page=1&position=0&uuid=70a81a56-014b-4aed-b3e1-8b6eb2bf97da")} style={styles.link}>
                    Flag Icon - Icon by Grand Iconic
                </Text>
                <Text onPress={() => handleLink("https://www.freepik.com/icon/settings_158384#fromView=search&page=1&position=6&uuid=430b2bf9-d693-4b8d-9585-fca46608c622")} style={styles.link}>
                    Settings Icon - Icon by Freepik
                </Text>
            </SafeAreaView>
        </ImageBackground >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    link: {
        color: 'blue',
        marginVertical: 5,
        flex: 1,
        backgroundColor: '#B5C18E',
        borderWidth: 1,
        borderColor: '#B99470',
        textAlign: 'center',
        fontStyle: 'italic'
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
});

export default CreditsScreen;

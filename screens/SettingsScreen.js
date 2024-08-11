import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image, Alert } from "react-native";
import { useContextProvider } from "./ContextProvider";
import { useState } from "react";
import { evaporateMyData } from "../components/StorageUtils";
import soundManager from "../components/SoundManager";

//This is for those radio buttons setting color theme of app & sound
const RadioButton = ({ onPress, selected, label, themeColor, styles }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
            <View style={[styles.radioButton, selected ? styles.radioButtonSelected : null]}>
                {selected ? <View style={styles.radioButtonInner} /> : null}
            </View>
            <Text style={[styles.radioButtonLabel, { color: themeColor }]}>{label}</Text>
        </TouchableOpacity>
    );
};


//Shows the "OK" sort of panel and tells user to restart their app
const confirmedPanel = (title, body) => {
    Alert.alert(title, body, [
        {
            text: 'OK',
            onPress: () => null,
            style: 'cancel',
        },
    ]);
    return true;
}

const confirmationPanel = async (title, body) => {
    //wait till the app has fully reset then show the user the panel
    const confirmed = await new Promise((resolve) => {
        Alert.alert(title, body, [
            {
                text: 'No',
                onPress: () => resolve(false),
                style: 'cancel',
            },
            {
                text: 'YES',
                onPress: () => resolve(true),
            },
        ]);
    });

    if (confirmed) {
        await evaporateMyData();
        confirmedPanel("Please restart your app.", "Your progress should be cleaned now!");
    } else {
        //In case the user has an issue resetting, showcase the error..
        //Omitted because if user presses "no" this occurs, I can definitely use a try-catch to avoid this
        //confirmedPanel("An error has occured..", "Please try again!");
    }
    return true;
};

const SettingsScreen = ({ navigation }) => {

    //For the title and desc of the popup modal
    const title = "Are you sure you want to reset your progress?";
    const body = "All topics will be reset.";

    //Import the variable settings
    const { translate, changeLanguage, colorTheme, changeTheme, soundOn, changeSound } = useContextProvider();

    //if I happen to add more themes, this will need to change as simply checking if theme is dark or light is not enough.
    const [selectedTheme, setSelectedTheme] = useState(colorTheme.dark ? "Dark" : "Light");

    const themeChoices = [
        { label: translate("Light"), value: 'Light' },
        { label: translate("Dark"), value: 'Dark' },
    ];
    //I just wanted to utilize the RadioButton I made
    const sounds = [
        { label: translate("Sound"), value: true },
    ]

    const styles = createStyles(colorTheme);

    return (
        <ImageBackground source={require('../assets/Settings.png')} opacity={0.1} style={{ height: '100%', width: '100%' }}
            imageStyle={{
                resizeMode: 'repeat',
                tintColor: colorTheme.colors.backgroundImg
            }}>
            <SafeAreaView style={styles.container}>

                {/* First leave the page and go back (backAction) then remove first question (top i guess) */}
                <View>
                    <Text style={styles.nextButtonText}>{translate("Languages")}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={[styles.buttons, { padding: 10 }]} onPress={() => {
                            changeLanguage('English'), soundManager.playSound('buttonPress', soundOn);
                        }}>
                            <Text style={styles.nextButtonText}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttons, { padding: 10 }]} onPress={() => { changeLanguage('Arabic'), soundManager.playSound('buttonPress', soundOn) }}>
                            <Text style={styles.nextButtonText}>عربي</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'black', margin: 10 }}></View>
                <Text style={[styles.nextButtonText, { marginBottom: 10 }]}>{translate("Themes")}</Text>
                <View style={styles.buttons}>
                    <View style={styles.themeContainer}>
                        {themeChoices.map((theme) => (
                            <RadioButton
                                key={theme.value}
                                label={theme.label}
                                selected={selectedTheme === theme.value}
                                onPress={() => { setSelectedTheme(theme.value), changeTheme(theme.value), soundManager.playSound('buttonPress', soundOn) }}
                                themeColor={colorTheme.colors.text}
                                styles={styles}
                            />
                        ))}
                    </View>
                </View>
                <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'black', margin: 10 }}></View>
                {sounds.map((sound) => (
                    <RadioButton
                        key={sound.value}
                        label={sound.label}
                        selected={soundOn === sound.value}
                        onPress={() => { changeSound(!soundOn), soundManager.playSound('buttonPress', soundOn) }}
                        themeColor={colorTheme.colors.text}
                        styles={styles}
                    />
                ))}
                <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'black', margin: 10 }}></View>
                <TouchableOpacity style={styles.buttons} onPress={() => { navigation.navigate("Credits"), soundManager.playSound('buttonPress', soundOn) }}>
                    <Text style={styles.nextButtonText}>{translate("Credits")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttons]} onPress={() => { navigation.navigate("Terms & Privacy"), soundManager.playSound('buttonPress', soundOn)}}>
                    <Text style={styles.nextButtonText}>{translate('terms_and_privacy')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttons, { backgroundColor: '#FF6171' }]} onPress={() => { confirmationPanel(title, body), soundManager.playSound('buttonPress', soundOn) }}>
                    <Text style={styles.nextButtonText}>{translate('reset')}</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </ImageBackground >
    );
}

const createStyles = (colorTheme) => StyleSheet.create({
    container: {
        marginHorizontal: 15,
        flex: 1,
        justifyContent: 'center',
    },

    themeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 25,
        margin: 'auto',
    },

    buttons: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colorTheme.colors.border,
        backgroundColor: colorTheme.colors.card,
        margin: 10,
        //for centering
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },

    nextButtonText: {
        fontSize: 18,
        fontFamily: 'Anton',
        margin: 'auto',
        color: colorTheme.colors.text
        // textShadowColor: 'rgba(0, 0, 0, 0.5)',
        //This is for casting shadow behind text
        // textShadowOffset: { width: 1, height: 2 },
        // textShadowRadius: 10,
        // paddingHorizontal: 20
    },

    radioButton: {
        height: 32,
        width: 32,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#4caf50',
        alignItems: 'center',
        justifyContent: 'center',
    },

    radioButtonSelected: {
        borderColor: '#4caf50',
    },
    radioButtonInner: {
        height: 24,
        width: 24,
        borderRadius: 9,
        backgroundColor: '#4caf50',
    },
    radioButtonLabel: {
        marginLeft: 15,
        fontSize: 18,
        fontFamily: 'Anton',
    },
    selectedOptionText: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
    },

});

export default SettingsScreen;

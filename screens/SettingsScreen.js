import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image } from "react-native";
import { useContextProvider } from "./ContextProvider";
import { useState } from "react";


const RadioButton = ({ onPress, selected, label }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
            <View style={[styles.radioButton, selected ? styles.radioButtonSelected : null]}>
                {selected ? <View style={styles.radioButtonInner} /> : null}
            </View>
            <Text style={styles.radioButtonLabel}>{label}</Text>
        </TouchableOpacity>
    );
};

const SettingsScreen = ({navigation}) => {


    //Import the variable settings
    const { translate, setLanguage, colorTheme, setColorTheme, soundOn, setSoundOn } = useContextProvider();

    const [selectedTheme, setSelectedTheme] = useState(colorTheme);

    const themeChoices = [
        { label: translate("Light"), value: 'Light' },
        { label: translate("Dark"), value: 'Dark' },
    ];
    //I just wanted to utilize the RadioButton I made
    const sounds = [
        { label: translate("Sound"), value: true },
    ]



    return (
        <ImageBackground source={require('../assets/Settings.png')} opacity={0.15} style={{ height: '100%' }}
            imageStyle={{
                resizeMode: 'repeat',
                overflow: 'visible',
                backfaceVisibility: 'visible',
                flex: 1,
            }}>
            <SafeAreaView style={styles.container}>

                {/* First leave the page and go back (backAction) then remove first question (top i guess) */}
                <View style={{ backgroundColor: 'green', padding: 20 }}>
                    <Text style={{ margin: 'auto', padding: 5, fontSize: 18 }}>{translate("Languages")}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.nextButton} onPress={() => { setLanguage('English')}}>
                            <Text style={styles.nextButtonText}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nextButton} onPress={() => {setLanguage('Arabic') }}>
                            <Text style={styles.nextButtonText}>عربي</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View style={{ flex: 1, flexDirection: 'row' }}>

                </View> */}

                <View style={{ backgroundColor: 'green', padding: 20, }}>
                    <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'black', margin: 10 }}></View>
                    <Text style={{ margin: 'auto', padding: 5, fontSize: 18 }}>{translate("Themes")}</Text>

                    <View style={styles.themeContainer}>
                        {themeChoices.map((theme) => (
                            <RadioButton
                                key={theme.value}
                                label={theme.label}
                                selected={selectedTheme === theme.value}
                                onPress={() => setSelectedTheme(theme.value)}
                            />
                        ))}
                        {/* Display selected results */}
                        {/* <Text style={styles.selectedOptionText}>
                        Selected Option: {selectedOption ? selectedOption : 'None'}
                    </Text> */}
                    </View>
                    <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'black', margin: 10 }}></View>
                    {sounds.map((sound) => (
                        <RadioButton
                            key={sound.value}
                            label={sound.label}
                            selected={soundOn === sound.value}
                            onPress={() => setSoundOn(!soundOn)}
                        />
                    ))}
                </View>
                <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'black', margin: 10 }}></View>
                <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("Credits")}>
                    <Text style={styles.nextButtonText}>{translate("Credits")}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 25,
        flex: 1,
        justifyContent: 'center',

    },

    themeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'grey',
    },

    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 25,
        margin: 'auto'
    },

    nextButton: {
        backgroundColor: '#B5C18E',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#B99470',
        margin: 10,
        //for centering
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },

    nextButtonText: {
        color: 'black',
        fontSize: 18,
        // textShadowColor: 'rgba(0, 0, 0, 0.5)',
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
        marginLeft: 10,
        fontSize: 16,
    },
    selectedOptionText: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
    },

});

export default SettingsScreen;

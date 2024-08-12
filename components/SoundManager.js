import { Audio } from 'expo-av';
import { AppState } from 'react-native';

//Sound class that handles loading, unloading, and the handling of disposing of sounds
//This class can be used for other apps, pretty versatile
class SoundManager {
    
    constructor() {
        this.sounds = {};
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.appStateSubscription = null;
    }

    async loadSound(key, file) {
        const { sound } = await Audio.Sound.createAsync(file);
        this.sounds[key] = sound;
    }

    async loadAllSounds() {
        //All the sounds for the app 
        const soundFiles = {
            buttonPress: require('../assets/sounds/button_click.wav'),
            menuButton: require('../assets/sounds/menu_button.wav'),
            correctSound: require('../assets/sounds/correct_sound.wav'),
            incorrectSound: require('../assets/sounds/incorrect_sound.wav'),
        };
        //Load each one
        for (const [key, file] of Object.entries(soundFiles)) {
            await this.loadSound(key, file);
        }
    }

    //SoundOn is the condition we get from settings user chose (i.e on or off)
    async playSound(key, soundOn) {
        if(!soundOn) return;

        const sound = this.sounds[key];
 
        if (sound) {
            //trycatch - because without it and user happens to spam the button then we get promise rejections
            try{
                await sound.replayAsync();
            }catch(error){
                console.log(`Error playing sound ${key}:`, error);
            }
        }
    }

    async unloadSounds() {
        console.log("Sounds unloaded");
        for (const sound of Object.values(this.sounds)) {
            await sound.unloadAsync();
        }
    }

    handleAppStateChange(nextAppState) {
        if (nextAppState.match(/inactive/)) {
            this.unloadSounds();
        }
    }

    init() {
        this.loadAllSounds();
        //event subscription basically
        this.appStateSubscription = AppState.addEventListener('change', this.handleAppStateChange);
    }

    //Ensure we are not misusing memory
    cleanup() {
        if(this.appStateSubscription ){
            this.appStateSubscription.remove();
            this.appStateSubscription = null;
        }
        this.unloadSounds();
    }
}

const soundManager = new SoundManager();
export default soundManager;

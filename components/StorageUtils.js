import AsyncStorage from '@react-native-async-storage/async-storage';

//Does it exist? if so load the array
export const getQuestionIndices = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        //console.error('Failed to load array', e);
        console.log("ERROR, NONE FOUND, WILL MAKE A NEW ARRAY");
        return null;
    }
}

//Delete indices from storage
export const removeQuestionIndex = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log(`${key} has been successfully removed`);
    } catch (e) {
        console.error(`Failed to remove ${key} from AsyncStorage`, e);
    }
};

//Save the indices of the questions (i.e 0,1,2,3,4.. etc) that have been seen by user.
export const saveData = async (key, data) => {
    try {

        //If we're saving the questions as an array otherwise we save the string
        if (Array.isArray(data)) {
            const convertArrytoJson = JSON.stringify(data);
            await AsyncStorage.setItem(key, convertArrytoJson);
        } else {
            await AsyncStorage.setItem(key, data.toString());
        }
        console.log(data + " : has been successfully stored");
    } catch (e) {
        console.error('Failed to save array to AsyncStorage', e);
    }

}


//DELETE ALL DATA!! In case user wants to re-quiz again
export const evaporateMyData = async () => {
    try {
        await AsyncStorage.clear();
        console.log("ALL DATA HAS BEEN WIPED! PLEASE RESTART YOUR APP!");
    } catch (e) {
        console.error('Failed to delete all data in AsyncStorage', e);
    }
};
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
        try{
            await AsyncStorage.removeItem(key);
            console.log(`${key} has been successfully removed`);
        }catch(e){
            console.error(`Failed to remove ${key} from AsyncStorage`, e);
        }
    };

    //Save the indices of the questions (i.e 0,1,2,3,4.. etc) that have been seen by user.
    export const saveQuestionIndices = async (key, array) => {
        try {
            const convertArrytoJson = JSON.stringify(array);
            await AsyncStorage.setItem(key, convertArrytoJson);
            console.log("Array has been successfully stored");

        } catch (e) {
            console.error('Failed to save array to AsyncStorage', e);
        }

    }
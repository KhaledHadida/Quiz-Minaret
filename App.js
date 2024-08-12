import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuizScreen from './screens/QuizHomeScreen';
import QuizResults from './screens/QuizResultScreen';
import Leaderboard from './screens/LeaderboardScreen';
import Progress from './screens/ProgressScreen';
import QuizTransition from './screens/QuizTransition';
import Quiz from './screens/QuizScreen';
import SettingsScreen from './screens/SettingsScreen';
import CreditsScreen from './screens/CreditsScreen';
import TermsScreen from './screens/TermsScreen';
import { SharedContextProvider, useContextProvider } from './screens/ContextProvider';
import soundManager from './components/SoundManager';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


//Below is the tabs that you find either on top  of screen or below at bottom.
const TabNavigator = ({ navigation }) => {
  const { colorTheme, soundOn } = useContextProvider();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: colorTheme.colors.tabSelected,
        tabBarLabel: '',
        //Setting gear icon on top - what happens if pressed
        headerRight: () => (
          <TouchableOpacity onPress={() => { navigation.navigate("Settings"), soundManager.playSound('menuButton', soundOn) }}>
            <Image style={{ width: 35, height: 35, marginRight: 25, tintColor: colorTheme.colors.backgroundImg }} source={require('./assets/Settings.png')} ></Image>
          </TouchableOpacity>
        ),
      }}
    >
      {/* The quiz tab at bottom (aka home) */}
      <Tab.Screen
        name="Quiz Minaret"
        component={QuizScreen}
        options={{
          headerShown: true,
          tabBarIcon: () => (
            <Image
              style={{ width: 25, height: 25, marginTop: 'auto', tintColor: colorTheme.colors.backgroundImg }}
              source={require('./assets/home.png')}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                soundManager.playSound('menuButton', soundOn);
                // Call the original onPress function
                if (props.onPress) {
                  props.onPress();
                }
              }}
            >
              {props.children}
            </TouchableOpacity>
          )
        }}
      />
      <Tab.Screen name="Leaderboard" component={Leaderboard}
        options={{
          headerShown: true,
          tabBarIcon: () => (
            <Image
              style={{ width: 25, height: 25, marginTop: 'auto', tintColor: colorTheme.colors.backgroundImg }}
              source={require('./assets/Leaderboard.png')}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                soundManager.playSound('menuButton', soundOn);
                // Call the original onPress function
                if (props.onPress) {
                  props.onPress();
                }
              }}
            >
              {props.children}
            </TouchableOpacity>
          )
        }}
      />
      <Tab.Screen name="My Progress" component={Progress}
        options={{
          headerShown: true,
          tabBarIcon: () => (
            <Image
              style={{ width: 25, height: 25, marginTop: 'auto', tintColor: colorTheme.colors.backgroundImg }}
              source={require('./assets/Progress.png')}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                soundManager.playSound('menuButton', soundOn);
                // Call the original onPress function
                if (props.onPress) {
                  props.onPress();
                }
              }}
            >
              {props.children}
            </TouchableOpacity>
          )
        }}
      />
    </Tab.Navigator>
  );
};

//Had to encapsulate/wrap it(?) so that the ContextProvider can be accessed in App component & in all other components
const ThemeApp = () => {
  return (
    <SharedContextProvider>
      <App />
    </SharedContextProvider>
  );
};

const App = () => {
  const { colorTheme } = useContextProvider();

  useEffect(() => {
    // Initialize the SoundManager
    soundManager.init();

    return () => {
      soundManager.cleanup();
    };
  }, []);

  return (
    //Navigation, that points to all the different routes if you will.
    <NavigationContainer theme={colorTheme}>
      {/* This is the equivalent of Redux (React context)*/}
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        {/* name here is dynamically changed so it's ok to keep it as "Quiz Transition" */}
        <Stack.Screen name="Quiz Transition" component={QuizTransition} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Credits" component={CreditsScreen} />
        <Stack.Screen name="Quiz Results" component={QuizResults} options={{ headerShown: false }} />
        <Stack.Screen name="My Progress" component={Progress} />
        <Stack.Screen name="Terms & Privacy" component={TermsScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    padding: 10,
  }
});


export default ThemeApp;
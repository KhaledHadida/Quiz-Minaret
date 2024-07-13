import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert, FlatList, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
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

//Context
import { SharedContextProvider } from './screens/ContextProvider';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



//Below is the tabs (so we can go from Quiz -> )
const TabNavigator = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: '#9ea87b',
        tabBarLabel: '', // Remove tab labels
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Image style={{ width: 35, height: 35, marginRight: 25 }} source={require('./assets/Settings.png')} ></Image>
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen name="Quiz Minaret" component={QuizScreen}
        options={{
          headerShown: true,
          tabBarIcon: () => (
            // <Text style={{ fontSize: 20 }}>📝</Text>
            <Image style={{ width: 25, height: 25, marginTop: 'auto' }} source={require('./assets/home.png')}></Image>
          ),

        }} />
      <Tab.Screen name="Leaderboard" component={Leaderboard}
        options={{
          tabBarIcon: () => (
            // <Text style={{ fontSize: 20 }}>📍</Text>
            <Image style={{ width: 25, height: 25, marginTop: 'auto' }} source={require('./assets/Leaderboard.png')}></Image>

          ),
        }} />
      <Tab.Screen name="My Progress" component={Progress}
        options={{
          tabBarIcon: () => (
            // <Text style={{ fontSize: 20 }}>🧠</Text>
            <Image style={{ width: 25, height: 25, marginTop: 'auto' }} source={require('./assets/Progress.png')}></Image>
          ),
        }} />
    </Tab.Navigator>
  );
};

//This is to give background color to all screens (Default)
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F7DCB9',
    card: '#B5C18E', // Background color for the navigation header
  },
};



export default function App() {
  return (

    //Navigation, that points to all the different routes if you will.
    <NavigationContainer theme={MyTheme}>
      {/* This is the equivalent of Redux (React context)*/}
      <SharedContextProvider>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
          {/* name here is dynamically changed so it's ok to keep it as "Quiz Transition" */}
          <Stack.Screen name="Quiz Transition" component={QuizTransition} />
          <Stack.Screen name="Quiz" component={Quiz} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Credits" component={CreditsScreen} />
          <Stack.Screen name="Quiz Results" component={QuizResults} options={{ headerShown: false }} />
          <Stack.Screen name="My Progress" component={Progress} />
        </Stack.Navigator>
      </SharedContextProvider>
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

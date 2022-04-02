import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CountriesScreen } from './libLearnRU/countries/countries';

const COLOURS = {
    pastelRed: "rgb(252, 126, 126)",
    pastelBlue: "rgb(126, 214, 252)",
    pastelYellow: "rgb(252, 229, 116)"
}

const LessonButton = (props) => {
    return (
        <TouchableOpacity
            style={{backgroundColor: props.colour,
                      borderRadius: 5,
                      padding: 5,
                      margin: 5,
                      minHeight: 80,
                      justifyContent: "center",
                      flex: 2}}
            onPress={props.onPress}>
            <Text style={{color: "white"}}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const LessonButtonsView = (props) => {
    return (
        <View>
            <View style={{display: "flex",
                        flexDirection: "row"}}>
                <LessonButton
                    title="Numbers"
                    colour={COLOURS.pastelRed}
                    onPress={() => {props.nav.navigate("Numbers")}}/>
                <LessonButton
                    title="Countries"
                    colour={COLOURS.pastelBlue}
                    onPress={() => {props.nav.navigate("Countries")}}/>
            </View>
            <View style={{display: "flex",
                        flexDirection: "row"}}>
                <LessonButton
                    title="Where"
                    colour={COLOURS.pastelYellow}
                    onPress={() => {props.nav.navigate("Where")}}/>
            </View>
        </View>
    );
};

const HomeScreen = ({navigation}) => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
       backgroundColor: isDarkMode ? "black" : "white",
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                <LessonButtonsView nav={navigation}></LessonButtonsView>
            </ScrollView>
        </SafeAreaView>
    );
}

const NumbersScreen = ({navigation}) => {
    return (
        <View></View>
    );
}

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{title: "learnRU"}}/>
                <Stack.Screen name="Numbers" component={NumbersScreen} options={{title: "Numbers"}}/>
                <Stack.Screen name="Countries" component={CountriesScreen} options={{title: "Countries"}}/>
                <Stack.Screen name="Where" component={NumbersScreen} options={{title: "Where"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

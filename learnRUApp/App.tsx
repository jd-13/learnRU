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
  FontAwesomeIcon,
} from 'react-native';

const COLOURS = {
    pastelRed: "rgb(252, 126, 126)",
    pastelBlue: "rgb(126, 214, 252)",
    pastelYellow: "rgb(252, 229, 116)"
}

const LessonButton = (props) => {
    return (
        <View style={{backgroundColor: props.colour,
                      borderRadius: 5,
                      padding: 5,
                      margin: 5,
                      minHeight: 80,
                      justifyContent: "center",
                      flex: 2}}>
            <Text style={{color: "white"}}>{props.title}</Text>
        </View>
    );
};

const LessonButtonsView = () => {
    return (
        <View>
            <View style={{display: "flex",
                        flexDirection: "row"}}>
                <LessonButton
                    title="Numbers"
                    colour={COLOURS.pastelRed}/>
                <LessonButton
                    title="Countries"
                    colour={COLOURS.pastelBlue}/>
            </View>
            <View style={{display: "flex",
                        flexDirection: "row"}}>
                <LessonButton
                    title="Где? Куда? Откуда?"
                    colour={COLOURS.pastelYellow}/>
            </View>
        </View>
    );
};

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
       backgroundColor: isDarkMode ? "black" : "white",
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                <LessonButtonsView></LessonButtonsView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default App;

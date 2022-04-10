import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text
} from 'react-native';

export const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

export const commonStyles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        margin: 5
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
    },
    questionText: {
        fontSize: 20,
        alignSelf: "center",
        margin: 10,
        color: "black"
    },
    answerInput: {
        borderBottomWidth: 1,
        margin: 10,
        color: "black"
    },
    feedbackLine1: {
        fontSize: 20,
        alignSelf: "center",
        margin: 10,
        color: "black"
    },
    feedbackLine2: {
        alignSelf: "center",
        color: "black"
    }
});

export const DefaultButton = (props) => {

    let colourToUse = "blue";
    if (props.isDisabled) {
        colourToUse = "grey";
    } else if ("colour" in props) {
        colourToUse = props.colour;
    }

    return (
        <Pressable style={{...commonStyles.button, backgroundColor: colourToUse}} onPress={props.onPress}>
            <Text style={{...commonStyles.buttonText, color: "white"}}>{props.text}</Text>
        </Pressable>
    )
};

export const ToggleButton = (props) => {

    let colourToUse = "blue";
    if (props.isDisabled) {
        colourToUse = "grey";
    } else if ("colour" in props) {
        colourToUse = props.colour;
    }

    let pressableStyle = {
        borderColor: colourToUse,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 5
    };

    if ("style" in props) {
        pressableStyle = {...pressableStyle, ...props.style};
    }

    let textColour = "";

    if (props.isOn) {
        pressableStyle.backgroundColor = colourToUse;
        textColour = "white";
    } else {
        textColour = colourToUse;
    }

    return (
        <Pressable style={{...commonStyles.button, ...pressableStyle}} onPress={props.onPress}>
            <Text style={{...commonStyles.buttonText, color: textColour}}>{props.text}</Text>
        </Pressable>
    )
};
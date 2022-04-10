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
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        margin: 5
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    questionText: {
        fontSize: 20,
        alignSelf: "center",
        margin: 10
    },
    answerInput: {
        borderBottomWidth: 1,
        margin: 10
    },
    feedbackLine1: {
        fontSize: 20,
        alignSelf: "center",
        margin: 10
    },
    feedbackLine2: {
        alignSelf: "center"
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
            <Text style={commonStyles.buttonText}>{props.text}</Text>
        </Pressable>
    )
};
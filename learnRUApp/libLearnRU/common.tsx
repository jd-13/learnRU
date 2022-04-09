import React, { useState, useRef } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text
} from 'react-native';

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
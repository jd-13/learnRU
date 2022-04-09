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
    const defaultColour = "blue";

    if (!("colour" in props)) {
        props.colour = defaultColour;
    }

    return (
        <Pressable style={{...commonStyles.button, backgroundColor: props.colour}}>
            <Text style={commonStyles.buttonText}>{props.text}</Text>
        </Pressable>
    )
};
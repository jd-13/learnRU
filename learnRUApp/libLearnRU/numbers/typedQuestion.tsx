import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  TextInput,
} from 'react-native';

import { getRandomNumber } from './numbersDb';

import { Colours, commonStyles, DefaultButton } from '../common';

class TypedQuestionData {
    questionText: string;
    answer: string;
    feedbackText: string;

    constructor(questionText: string,
                answer: string,
                feedbackText: string) {
        this.questionText = questionText;
        this.answer = answer;
        this.feedbackText = feedbackText;
    }
};

export const createTypedQuestionData = (selectedMaxNumber: number, enabledNumbers: object) => {
    const [chosenNumber, translatedString] = getRandomNumber(selectedMaxNumber, enabledNumbers);
    console.log(`Chose number: ${chosenNumber}`);

    return new TypedQuestionData(`Translate: ${chosenNumber}`,
                                 translatedString,
                                 `The correct answer is ${translatedString}`);
};

export let resetTypedQuestion = () => {
    // Do nothing for now
};

export const TypedQuestion = (props) => {

    const [isCorrectText, setIsCorrectText] = useState("");
    const [givenAnswer, setGivenAnswer] = useState("");
    const [feedbackText, setFeedbackText] = useState("");

    const onSubmit = () => {
        if (givenAnswer.toLowerCase() === props.data.answer) {
            setIsCorrectText("Correct!");
        } else {
            setIsCorrectText("Oops!");
            setFeedbackText(props.data.feedbackText);
        }

        setSubmitButton(<DefaultButton colour={Colours.submitButton} text="Submit" isDisabled={true}/>);
    };

    const [submitButton, setSubmitButton] = useState(<DefaultButton colour={Colours.submitButton} text="Submit" onPress={onSubmit}/>);

    resetTypedQuestion = () => {
        setIsCorrectText("");
        setGivenAnswer("");
        setFeedbackText("");
        setSubmitButton(<DefaultButton colour={Colours.submitButton} text="Submit" onPress={onSubmit}/>);
    };

    return (
        <View>
            <Text style={commonStyles.questionText}>{props.data.questionText}</Text>
            <TextInput style={commonStyles.answerInput} onChangeText={setGivenAnswer} value={givenAnswer} autoFocus={true} onSubmitEditing={onSubmit}/>
            {submitButton}

            <Text style={commonStyles.feedbackLine1}>{isCorrectText}</Text>
            <Text style={commonStyles.feedbackLine2}>{feedbackText}</Text>
        </View>
    );
}

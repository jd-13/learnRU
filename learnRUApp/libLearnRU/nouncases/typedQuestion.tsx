import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';

import { commonStyles } from '../common';
import { EnabledCases } from './nouncases';

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

export const createTypedQuestionData = (enabledCases: EnabledCases) => {
    return new TypedQuestionData("", "", "");
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
    };

    resetTypedQuestion = () => {
        setIsCorrectText("");
        setGivenAnswer("");
        setFeedbackText("");
    };

    return (
        <View>
            <Text style={commonStyles.questionText}>{props.data.questionText}</Text>
            <TextInput style={commonStyles.answerInput} onChangeText={setGivenAnswer} value={givenAnswer} autoFocus={true} onSubmitEditing={onSubmit}/>

            <Text style={commonStyles.feedbackLine1}>{isCorrectText}</Text>
            <Text style={commonStyles.feedbackLine2}>{feedbackText}</Text>
        </View>
    );
};

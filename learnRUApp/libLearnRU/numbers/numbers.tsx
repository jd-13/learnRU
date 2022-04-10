import React, { useState } from 'react';
import { useEffect } from 'react';
import {
    SafeAreaView,
    View
} from 'react-native';

import { DefaultButton } from '../common';

import { TypedQuestion, createTypedQuestionData, resetTypedQuestion } from './typedQuestion';
import { ChoiceQuestion, createChoiceQuestionData, resetChoiceQuestion } from './choiceQuestion';

const availableRanges = ["10", "20", "100", "1000"];
let enabledNumbers = { "cardinal": true, "ordinal": true };

export const NumbersScreen = ({navigation}) => {

    const [selectedMaxNumber, setSelectedMaxNumber] = useState(1000);
    const [enabledNumbers, setEnabledNumbers] = useState({ "cardinal": true, "ordinal": true });

    const onNext = () => {
        setQuestion(getNewQuestion());
    };

    const getNewQuestion = () => {
        console.log("New question requested");

        const typedQuestionElement = <TypedQuestion data={createTypedQuestionData(selectedMaxNumber, enabledNumbers)}/>

        const choiceQuestionElement = <ChoiceQuestion data={createChoiceQuestionData(selectedMaxNumber, enabledNumbers)}/>

        const questionElements = [typedQuestionElement, choiceQuestionElement]

        return questionElements[Math.floor(Math.random() * questionElements.length)];
    };

    useEffect(() => {
        resetTypedQuestion();
        resetChoiceQuestion();
    });

    const [question, setQuestion] = useState(getNewQuestion());

    return (
        <SafeAreaView style={{flex: 1, margin: 10}}>
            <View style={{flex: 1}}>
                {question}
            </View>
            <View>
                <DefaultButton text="Report" colour="red" isDisabled={true}/>
                <DefaultButton text="Next" colour="black" onPress={onNext}/>
            </View>
        </SafeAreaView>
    );
}

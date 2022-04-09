import React, { useState } from 'react';
import { useEffect } from 'react';
import {
    SafeAreaView,
    Pressable,
    View,
    Text
} from 'react-native';

import { commonStyles } from '../common';

import { TypedQuestion, createTypedQuestionData, resetTypedQuestion } from './typedQuestion';
import { ChoiceQuestion, createChoiceQuestionData, resetChoiceQuestion } from './choiceQuestion';

export const CountriesScreen = ({navigation}) => {

    const onNext = () => {
        setQuestion(getNewQuestion());
    }

    const getNewQuestion = () => {
        console.log("New question requested");

        const typedQuestionElement = <TypedQuestion data={createTypedQuestionData()}/>

        const choiceQuestionElement = <ChoiceQuestion data={createChoiceQuestionData()}/>

        const questionElements = [typedQuestionElement, choiceQuestionElement]

        return questionElements[Math.floor(Math.random() * questionElements.length)];
    }

    useEffect(() => {
        resetTypedQuestion();
        resetChoiceQuestion();
    });

    const [question, setQuestion] = useState(getNewQuestion());

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                {question}
            </View>
            <View>
                <Pressable style={{...commonStyles.button, backgroundColor: "red"}}>
                    <Text style={commonStyles.buttonText}>Report</Text>
                </Pressable>
                <Pressable style={{...commonStyles.button, backgroundColor: "black"}} onPress={onNext}>
                    <Text style={commonStyles.buttonText}>Next</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

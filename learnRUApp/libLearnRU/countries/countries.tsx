import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Button
} from 'react-native';

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
        <SafeAreaView>
            {question}
            <Button title="Report"/>
            <Button title="Next" onPress={onNext}/>
        </SafeAreaView>
    );
};

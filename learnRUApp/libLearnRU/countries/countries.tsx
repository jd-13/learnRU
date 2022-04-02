import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Button
} from 'react-native';

import { TypedQuestion, createTypedQuestionData } from './typedQuestion';
import { ChoiceQuestion, createChoiceQuestionData } from './choiceQuestion';

/**
 * Randomly generates and renders a new question from the provided dictionary.
 */
const newQuestion = () => {
    console.log("New question requested");

    const questionTypes = [{element: TypedQuestion, data: createTypedQuestionData},
                           {element: ChoiceQuestion, data: createChoiceQuestionData}];

    // Load the next question
    return questionTypes[Math.floor(Math.random() * questionTypes.length)];
};

export const CountriesScreen = ({navigation}) => {
    const onNext = () => {
        setQuestion(newQuestion());
        setData(question.data());
        setNeedsClearState(true);
    }

    const [question, setQuestion] = useState(newQuestion());
    const [data, setData] = useState(question.data());
    const [needsClearState, setNeedsClearState] = useState(false);

    return (
        <SafeAreaView>
            {question.element({data: data, needsClearState: needsClearState, setNeedsClearState: setNeedsClearState})}
            <Button title="Report"/>
            <Button title="Next" onPress={onNext}/>
        </SafeAreaView>
    );
};

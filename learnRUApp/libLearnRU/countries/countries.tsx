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
const getNewQuestion = () => {
    console.log("New question requested");

    const questionTypes = [{element: TypedQuestion, data: createTypedQuestionData},
                           {element: ChoiceQuestion, data: createChoiceQuestionData}];

    // Load the next question
    return questionTypes[Math.floor(Math.random() * questionTypes.length)];
};

export const CountriesScreen = ({navigation}) => {

    const onNext = () => {
        let newQuestion = getNewQuestion();
        data = newQuestion.data();
        setQuestion(newQuestion);
        setNeedsClearState(true);
    }

    const [question, setQuestion] = useState(getNewQuestion());
    const [needsClearState, setNeedsClearState] = useState(false);
    let data = question.data();

    return (
        <SafeAreaView>
            {question.element({data: data, needsClearState: needsClearState, setNeedsClearState: setNeedsClearState})}
            <Button title="Report"/>
            <Button title="Next" onPress={onNext}/>
        </SafeAreaView>
    );
};

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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const ChoiceQuestion = () => {
    return (
        <View>

        </View>
    );
}

/**
 * Randomly generates and renders a new question from the provided dictionary.
 */
const newQuestion = () => {
    console.log("New question requested");

    const questionTypes = [{element: TypedQuestion, data: createTypedQuestionData} /*, ChoiceQuestion*/];

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

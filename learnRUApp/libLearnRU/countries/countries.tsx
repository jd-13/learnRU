import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Button
} from 'react-native';

import { TypedQuestion } from './typedQuestion';

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
const newQuestion = (onSubmitCallback) => {
    console.log("New question requested");

    const questionTypes = [TypedQuestion/*, ChoiceQuestion*/];

    // Load the next question
    return questionTypes[Math.floor(Math.random() * questionTypes.length)]({onSubmit: onSubmitCallback});
};

export const CountriesScreen = ({navigation}) => {
    const [needsNewQuestion, setNeedsNewQuestion] = useState(false);

    const onNext = () => {
        setNextButton(<Button title="Next" disabled/>);
        setNeedsNewQuestion(true);
    }

    useEffect(() => {
        if (needsNewQuestion) {
            setNeedsNewQuestion(false);
        }
    });

    const [nextButton, setNextButton] = useState(<Button title="Next" disabled/>);

    const onSubmit = () => {
        setNextButton(<Button title="Next" onPress={onNext}/>);
    };

    const [question, setQuestion] = useState(newQuestion(onSubmit));

    return (
        <SafeAreaView>
            {question}
            <Button title="Report"/>
            {nextButton}
        </SafeAreaView>
    );
};

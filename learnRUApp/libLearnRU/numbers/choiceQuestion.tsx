import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  TextInput,
} from 'react-native';

import { getRandomNumber } from './numbersDb';

import { commonStyles, DefaultButton, shuffleArray } from '../common';

class ChoiceQuestionData {
    questionText: string;
    answer: string;
    incorrectChoices: string[];
    feedbackText: string;

    constructor(questionText: string,
                answer: string,
                incorrectChoices: string[],
                feedbackText: string) {
        this.questionText = questionText;
        this.answer = answer;
        this.incorrectChoices = incorrectChoices;
        this.feedbackText = feedbackText;
    }
};

export const createChoiceQuestionData = (selectedMaxNumber: number, enabledNumbers: object) => {
        // Choose a number at random
        const [chosenNumber, translatedString] = getRandomNumber(selectedMaxNumber, enabledNumbers)
        console.log(`Chose number: ${chosenNumber} ${translatedString}`);

        // Select 2 incorrect choices
        let incorrectChoices = [];
        for (let idx = 0; idx < 2; idx++) {
            const [_, incorrectChoice] = getRandomNumber(selectedMaxNumber, enabledNumbers);
            incorrectChoices.push(incorrectChoice);
        }

        console.log(`Incorrect choices: ${incorrectChoices}`);

        return new ChoiceQuestionData(`Choose the correct translation for: ${chosenNumber} `,
                                      translatedString,
                                      incorrectChoices,
                                      `The correct answer is ${translatedString}`);
};

export let resetChoiceQuestion = () => {
    // Do nothing for now
};


export const ChoiceQuestion = (props) => {

    const [isCorrectText, setIsCorrectText] = useState("");
    const [feedbackText, setFeedbackText] = useState("");

    const onAnswer = (givenAnswer: string) => {
        if (givenAnswer.toLowerCase() === props.data.answer.toLowerCase()) {
            setIsCorrectText("Correct!");
        } else {
            setIsCorrectText("Oops!");
            setFeedbackText(props.data.feedbackText);
        }
    }

    const createShuffledAnswers = (incorrectChoices: string[]) => {
        // Prepare the answer choices
        let shuffledAnswers: string[] = [...incorrectChoices];

        shuffledAnswers.push(props.data.answer);
        shuffleArray(shuffledAnswers);

        return shuffledAnswers;
    }

    resetChoiceQuestion = () => {
        setIsCorrectText("");
        setFeedbackText("");
        setShuffledAnswersState(createShuffledAnswers(props.data.incorrectChoices));
    }

    // Use state so that they don't get reshuffled on every render
    const [shuffledAnswersState, setShuffledAnswersState] = useState(createShuffledAnswers(props.data.incorrectChoices));

    return (
        <View>
            <Text style={commonStyles.questionText}>{props.data.questionText}</Text>

            <View style={{marginTop: 15}}>
                <DefaultButton text={shuffledAnswersState[0]} onPress={() => {onAnswer(shuffledAnswersState[0])}} isDisabled={isCorrectText !== ""}/>
                <DefaultButton text={shuffledAnswersState[1]} onPress={() => {onAnswer(shuffledAnswersState[1])}} isDisabled={isCorrectText !== ""}/>
                <DefaultButton text={shuffledAnswersState[2]} onPress={() => {onAnswer(shuffledAnswersState[2])}} isDisabled={isCorrectText !== ""}/>
            </View>

            <Text style={commonStyles.feedbackLine1}>{isCorrectText}</Text>
            <Text style={commonStyles.feedbackLine2}>{feedbackText}</Text>
        </View>
    );
};

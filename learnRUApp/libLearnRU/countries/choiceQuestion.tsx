import React, { useState } from 'react';
import {
    Text,
    View
} from 'react-native';

import { FlagImage } from "./flagImage";

import { commonStyles, DefaultButton, shuffleArray, Colours } from '../common';

import { Countries, Country } from './countriesDb';

class ChoiceQuestionData {
    flagURL;
    questionText: string;
    answers: string[];
    incorrectChoices: string[];
    feedbackText: string;

    constructor(flagURL,
                questionText: string,
                answers: string[],
                incorrectChoices: string[],
                feedbackText: string) {
        this.flagURL = flagURL;
        this.questionText = questionText;
        this.answers = answers;
        this.incorrectChoices = incorrectChoices;
        this.feedbackText = feedbackText;
    }
};

const setupCountry = (chosenCountry: Country) => {
    // TODO: there may be duplicate incorrect choices
    return new ChoiceQuestionData(chosenCountry.getFlagURL(),
                                  "Что это за страна?",
                                  [chosenCountry.getCountryName()],
                                  [Countries.getRandomCountry().getCountryName(),
                                   Countries.getRandomCountry().getCountryName()],
                                  `Это ${chosenCountry.getCountryName()}`);
};


const setupGenitive = (chosenCountry: Country) => {
    // TODO: there may be duplicate incorrect choices
    return new ChoiceQuestionData(chosenCountry.getFlagURL(),
                                  "Они из ...",
                                  [chosenCountry.getGenitive()],
                                  [Countries.getRandomCountry().getGenitive(),
                                   Countries.getRandomCountry().getGenitive()],
                                  `Они из ${chosenCountry.getGenitive()}`);
};

const setupLanguage = (chosenCountry: Country) => {
    // TODO: there may be duplicate incorrect choices
    return new ChoiceQuestionData(chosenCountry.getFlagURL(),
                                  "Они говорят по- ...",
                                  chosenCountry.getLanguages(),
                                  [Countries.getRandomCountry().getRandomLanguage(),
                                   Countries.getRandomCountry().getRandomLanguage()],
                                  `Они говорят по-${chosenCountry.getLanguages()}`);
};

const setupNationality = (chosenCountry: Country) => {
    // Choose a random gender
    const [chosenGender, chosenPronoun] = Countries.getRandomGender();

    // Collect all gender versions for this country
    const nationalities = {
        "masculine": chosenCountry.getNationality("masculine"),
        "feminine": chosenCountry.getNationality("feminine"),
        "plural": chosenCountry.getNationality("plural")
    }

    // Store the answer and remove it from the dictionary
    const answers: string[] = [nationalities[chosenGender]];
    delete nationalities[chosenGender];

    return new ChoiceQuestionData(chosenCountry.getFlagURL(),
                                  `${chosenPronoun} - это ...`,
                                  answers,
                                  Object.values(nationalities),
                                  `${chosenPronoun} ${chosenCountry.getNationality(chosenGender)}`);
};

export const createChoiceQuestionData = () => {
    console.log("Creating ChoiceQuestion");

    // Choose a country at random
    const chosenCountry = Countries.getRandomCountry();
    console.log(`Chose country: ${chosenCountry.getCountryName()}`);

    const questions = [
        setupCountry,
        setupGenitive,
        setupLanguage,
        setupNationality
    ];

    return questions[Math.floor(Math.random() * questions.length)](chosenCountry);
};

export let resetChoiceQuestion = () => {
    // Do nothing for now
};

export const ChoiceQuestion = (props) => {

    const [isCorrectText, setIsCorrectText] = useState("");
    const [feedbackText, setFeedbackText] = useState("");

    const onAnswer = (givenAnswer: string) => {
        let isCorrect: boolean = false;
        for (const validAnswer of props.data.answers) {
            if (givenAnswer.toLowerCase() === validAnswer.toLowerCase()) {
                isCorrect = true;
                break;
            }
        }

        if (isCorrect) {
            setIsCorrectText("Correct!");
        } else {
            setIsCorrectText("Oops!");
            setFeedbackText(props.data.feedbackText);
        }
    }

    const createShuffledAnswers = (incorrectChoices: string[]) => {
        // Prepare the answer choices
        let shuffledAnswers: string[] = [...incorrectChoices];

        // If there are multiple correct answers, just choose one
        let answer = props.data.answers;
        if (typeof answer === "object") {
            answer = answer[Math.floor(Math.random() * answer.length)];
        }

        shuffledAnswers.push(answer);
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
            <FlagImage flagURL={props.data.flagURL} height={180}/>
            <Text style={commonStyles.questionText}>{props.data.questionText}</Text>

            <View style={{marginTop: 15}}>
                <DefaultButton colour={Colours.answerButton} text={shuffledAnswersState[0]} onPress={() => {onAnswer(shuffledAnswersState[0])}} isDisabled={isCorrectText !== ""}/>
                <DefaultButton colour={Colours.answerButton} text={shuffledAnswersState[1]} onPress={() => {onAnswer(shuffledAnswersState[1])}} isDisabled={isCorrectText !== ""}/>
                <DefaultButton colour={Colours.answerButton} text={shuffledAnswersState[2]} onPress={() => {onAnswer(shuffledAnswersState[2])}} isDisabled={isCorrectText !== ""}/>
            </View>

            <Text style={commonStyles.feedbackLine1}>{isCorrectText}</Text>
            <Text style={commonStyles.feedbackLine2}>{feedbackText}</Text>
        </View>
    );
};

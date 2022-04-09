import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
} from 'react-native';

import { FlagImage } from "./flagImage";

import { Countries, Country } from './countriesDb';
import { commonStyles, DefaultButton } from '../common';

class TypeQuestionData {
    flagURL;
    questionText: string;
    answers: string[];
    feedbackText: string;

    constructor(flagURL,
                questionText: string,
                answers: string[],
                feedbackText: string) {
        this.flagURL = flagURL;
        this.questionText = questionText;
        this.answers = answers;
        this.feedbackText = feedbackText;
    }
}

const setupCountry = (chosenCountry: Country) => {
    return new TypeQuestionData(chosenCountry.getFlagURL(),
                                "Что это за страна?",
                                [chosenCountry.getCountryName()],
                                `Это ${chosenCountry.getCountryName()}`);
}

const setupGenitive = (chosenCountry: Country) => {
    return new TypeQuestionData(chosenCountry.getFlagURL(),
                                "Они из ...",
                                [chosenCountry.getGenitive()],
                                `Они из ${chosenCountry.getGenitive()}`);
}

const setupLanguage = (chosenCountry: Country) => {
    return new TypeQuestionData(chosenCountry.getFlagURL(),
                                "Они говорят по- ...",
                                chosenCountry.getLanguages(),
                                `Они говорят по-${chosenCountry.getLanguages()}`);
}

const setupNationality = (chosenCountry: Country) => {
    // Choose a random gender
    const [chosenGender, chosenPronoun] = Countries.getRandomGender();

    return new TypeQuestionData(chosenCountry.getFlagURL(),
                                `${chosenPronoun} - это ...`,
                                [chosenCountry.getNationality(chosenGender)],
                                `${chosenPronoun} ${chosenCountry.getNationality(chosenGender)}`);
}

export const createTypedQuestionData = () => {
    console.log("Creating TypedQuestion");

    // Choose a country at random
    const chosenCountry: Country = Countries.getRandomCountry();
    console.log(`Chose country: ${chosenCountry.getCountryName()}`);

    const questions = [
        setupCountry,
        setupGenitive,
        setupLanguage,
        setupNationality
    ];

    return questions[Math.floor(Math.random() * questions.length)](chosenCountry);
}

export let resetTypedQuestion = () => {
    // Do nothing for now
}

export const TypedQuestion = (props) => {

    const [isCorrectText, setIsCorrectText] = useState("");
    const [givenAnswer, setGivenAnswer] = useState("");
    const [feedbackText, setFeedbackText] = useState("");

    const onSubmit = () => {
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

        setSubmitButton(<DefaultButton text="Submit" isDisabled={true}/>);
    }

    const [submitButton, setSubmitButton] = useState(<DefaultButton text="Submit" onPress={onSubmit}/>);

    resetTypedQuestion = () => {
        setIsCorrectText("");
        setGivenAnswer("");
        setFeedbackText("");
        setSubmitButton(<DefaultButton text="Submit" onPress={onSubmit}/>);
    }

    return (
        <View>
            <FlagImage flagURL={props.data.flagURL} height={180}/>
            <Text style={commonStyles.questionText}>{props.data.questionText}</Text>
            <TextInput style={commonStyles.answerInput} onChangeText={setGivenAnswer} value={givenAnswer} autoFocus={true} onSubmitEditing={onSubmit}/>
            {submitButton}

            <Text style={commonStyles.feedbackLine1}>{isCorrectText}</Text>
            <Text style={commonStyles.feedbackLine2}>{feedbackText}</Text>
        </View>
    );
}
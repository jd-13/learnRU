import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
} from 'react-native';

import { Countries, Country } from './countriesDb';

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

        setSubmitButton(<Button title="Submit" disabled/>);
    }

    const [submitButton, setSubmitButton] = useState(<Button title="Submit" onPress={onSubmit}/>);

    resetTypedQuestion = () => {
        setIsCorrectText("");
        setGivenAnswer("");
        setFeedbackText("");
        setSubmitButton(<Button title="Submit" onPress={onSubmit}/>);
    }

    return (
        <View>
            <Image source={props.data.flagURL}
                   style={{width: "50%", height: "50%"}}/>
            <Text>{props.data.questionText}</Text>
            <TextInput onChangeText={setGivenAnswer} value={givenAnswer}/>
            {submitButton}

            <Text>{isCorrectText}</Text>
            <Text>{feedbackText}</Text>
        </View>
    );
}
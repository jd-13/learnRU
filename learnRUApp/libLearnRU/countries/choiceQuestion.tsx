import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  Button,
} from 'react-native';

import { Countries, Country } from './countriesDb';

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

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
}

const setupCountry = (chosenCountry: Country) => {
    // TODO: there may be duplicate incorrect choices
    return new ChoiceQuestionData(chosenCountry.getFlagURL(),
                                  "Что это за страна?",
                                  [chosenCountry.getCountryName()],
                                  [Countries.getRandomCountry().getCountryName(),
                                   Countries.getRandomCountry().getCountryName()],
                                  `Это ${chosenCountry.getCountryName()}`);
}


const setupGenitive = (chosenCountry: Country) => {
    // TODO: there may be duplicate incorrect choices
    return new ChoiceQuestionData(chosenCountry.getFlagURL(),
                                  "Они из ...",
                                  [chosenCountry.getGenitive()],
                                  [Countries.getRandomCountry().getGenitive(),
                                   Countries.getRandomCountry().getGenitive()],
                                  `Они из ${chosenCountry.getGenitive()}`);
}

const setupLanguage = (chosenCountry: Country) => {
    // TODO: there may be duplicate incorrect choices
    return new ChoiceQuestionData(chosenCountry.getFlagURL(),
                                  "Они говорят по- ...",
                                  chosenCountry.getLanguages(),
                                  [Countries.getRandomCountry().getRandomLanguage(),
                                   Countries.getRandomCountry().getRandomLanguage()],
                                  `Они говорят по-${chosenCountry.getLanguages()}`);
}

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
    const answers = [nationalities[chosenGender]];
    delete nationalities[chosenGender];

    return new ChoiceQuestionData(chosenCountry.getFlagURL(),
                                  `${chosenPronoun} - это ...`,
                                  answers,
                                  Object.values(nationalities),
                                  `${chosenPronoun} ${chosenCountry.getNationality(chosenGender)}`);
}

export const createChoiceQuestionData = () => {
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
}

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

    // Prepare the answer choices
    console.log(props.data);

    console.log(props.data.incorrectChoices);
    let shuffledAnswers: string[] = [...props.data.incorrectChoices];

    // If there are multiple correct answers, just choose one
    let answer = props.data.answers;
    if (typeof answer === "object") {
        answer = answer[Math.floor(Math.random() * answer.length)];
    }

    shuffledAnswers.push(answer);
    shuffleArray(shuffledAnswers);

    return (
        <View>
            <Image source={props.data.flagURL}
                   style={{width: "50%", height: "50%"}}/>
            <Text>{props.data.questionText}</Text>

            <Button title={shuffledAnswers[0]} onPress={() => {onAnswer(shuffledAnswers[0])}}/>
            <Button title={shuffledAnswers[1]} onPress={() => {onAnswer(shuffledAnswers[1])}}/>
            <Button title={shuffledAnswers[2]} onPress={() => {onAnswer(shuffledAnswers[2])}}/>

            <Text>{isCorrectText}</Text>
            <Text>{feedbackText}</Text>
        </View>
    );
}
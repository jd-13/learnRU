import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { Colours, commonStyles, DefaultButton, shuffleArray } from '../common';

import { CASE_RULES, PLURAL_RULES, SPELLING_RULES } from './rulesDb';

import { EnabledCases, getAvailableCasesList, getExcludedCasesList } from './enabledCases';

import { Noun } from './nounsDb';

import { Pronoun } from './pronounsDb';

class ChoiceQuestionData {
    questionText: string;
    answer: string;
    incorrectChoices: string[];
    feedbackText: string[];

    constructor(questionText: string,
                answer: string,
                incorrectChoices: string[],
                feedbackText: string[]) {
        this.questionText = questionText;
        this.answer = answer;
        this.incorrectChoices = incorrectChoices;
        this.feedbackText = feedbackText;
    }
};

const setupNoun = (enabledCases: EnabledCases) => {
    // Choose a noun from the dictionary
    const chosenNoun: Noun = Noun.getRandomNoun();
    console.log(`Chose noun: ${chosenNoun.getSingularDeclension("nominative").text}`);

    let chosenCase: string = "";
    let chosenDeclension = undefined;
    let questionText = `What is the `;
    let feedbackLine1 = "";

    if ((enabledCases.singular && enabledCases.plural && Math.random() > 0.5) ||
    (enabledCases.singular && !enabledCases.plural)) {
        // Singular
        const availableCases: string[] = getAvailableCasesList(enabledCases, false);
        chosenCase = availableCases[Math.floor(Math.random() * availableCases.length)];
        chosenDeclension = chosenNoun.getSingularDeclension(chosenCase);
        questionText += `${chosenCase} singular `;

        // Nominative case has no case rule
        if (chosenDeclension.hasOwnProperty("caseRule")) {
            feedbackLine1 = CASE_RULES[chosenCase][chosenDeclension.caseRule];
        }
    } else {
        // Plural
        const availableCases: string[] = getAvailableCasesList(enabledCases, true);
        chosenCase = availableCases[Math.floor(Math.random() * availableCases.length)];
        chosenDeclension = chosenNoun.getPluralDeclension(chosenCase);
        questionText += `${chosenCase} plural `;

        // Nominative case has no case rule
        if (chosenDeclension.hasOwnProperty("caseRule")) {
            feedbackLine1 = PLURAL_RULES[chosenCase][chosenDeclension.caseRule];
        }
    }
    questionText += `of ${chosenNoun.getSingularDeclension("nominative").text}?`;

    let feedbackLine2 = "";
    if (chosenDeclension.hasOwnProperty("spellingRule")) {
        feedbackLine2 = SPELLING_RULES[chosenDeclension.spellingRule];
    }

    const incorrectDelensions = chosenNoun.getRandomDeclensions(2, chosenCase);

    return new ChoiceQuestionData(questionText,
                                  chosenDeclension.text,
                                  incorrectDelensions,
                                  [feedbackLine1, feedbackLine2]);
};

const setupPronoun = (enabledCases: EnabledCases) => {
    // Choose a pronoun from the dictionary
    let chosenPronoun = undefined;
    if (Math.random() < 0.5) {
        chosenPronoun = Pronoun.getRandomPersonalPronoun();
    } else {
        chosenPronoun = Pronoun.getRandomPossessivePronoun();
    }

    console.log(`Chose pronoun: ${chosenPronoun.getDeclension("nominative")}`);

    const excludedCases: string[] = getExcludedCasesList(enabledCases);

    const [chosenCase, isAninmate, chosenDeclension] = chosenPronoun.getRandomCase(excludedCases);

    let questionText = `What is the ${chosenCase} `;
    if (chosenCase === "accusative") {
        if (isAninmate) {
            questionText += "(animate) ";
        } else {
            questionText += "(inanimate) ";
        }
    }
    questionText += `of ${chosenPronoun.getDeclension("nominative")}?`;

    const feedbackLine1 = `The correct answer is ${chosenDeclension}`;

    let incorrectChoices: string[] = [];
    for (let index = 0; index < 2; index++) {
        const [randomCase, randomIsAnimate, randomDeclension] = chosenPronoun.getRandomCase();
        incorrectChoices.push(randomDeclension);
    }

    return new ChoiceQuestionData(questionText,
                                  chosenDeclension,
                                  incorrectChoices,
                                  [feedbackLine1, ""]);
};

export const createChoiceQuestionData = (enabledCases: EnabledCases) => {
    if ((enabledCases.nouns && enabledCases.pronouns && Math.random() < 0.5) ||
        (enabledCases.nouns && !enabledCases.pronouns)) {
        return setupNoun(enabledCases);
    } else {
        return setupPronoun(enabledCases);
    }
};

export let resetChoiceQuestion = () => {
    // Do nothing for now
};

export const ChoiceQuestion = (props) => {
    const [isCorrectText, setIsCorrectText] = useState("");
    const [feedbackText, setFeedbackText] = useState([]);

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
        setFeedbackText([]);
        setShuffledAnswersState(createShuffledAnswers(props.data.incorrectChoices));
    }

    // Use state so that they don't get reshuffled on every render
    const [shuffledAnswersState, setShuffledAnswersState] = useState(createShuffledAnswers(props.data.incorrectChoices));

    return (
        <View>
            <Text style={commonStyles.questionText}>{props.data.questionText}</Text>

            <View style={{marginTop: 15}}>
                <DefaultButton colour={Colours.answerButton} text={shuffledAnswersState[0]} onPress={() => {onAnswer(shuffledAnswersState[0])}} isDisabled={isCorrectText !== ""}/>
                <DefaultButton colour={Colours.answerButton} text={shuffledAnswersState[1]} onPress={() => {onAnswer(shuffledAnswersState[1])}} isDisabled={isCorrectText !== ""}/>
                <DefaultButton colour={Colours.answerButton} text={shuffledAnswersState[2]} onPress={() => {onAnswer(shuffledAnswersState[2])}} isDisabled={isCorrectText !== ""}/>
            </View>

            <Text style={commonStyles.feedbackLine1}>{isCorrectText}</Text>
            <Text style={commonStyles.feedbackLine2}>{feedbackText[0]}</Text>
            <Text style={commonStyles.feedbackLine2}>{feedbackText[1]}</Text>
        </View>
    );
};

import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';

import { commonStyles } from '../common';
import { EnabledCases, getAvailableCasesList, getExcludedCasesList } from './enabledCases';
import { Noun } from './nounsDb';
import { Pronoun } from './pronounsDb';
import { CASE_RULES, PLURAL_RULES, SPELLING_RULES } from './rulesDb';


class TypedQuestionData {
    questionText: string;
    answer: string;
    feedbackText: string[];

    constructor(questionText: string,
                answer: string,
                feedbackText: string[]) {
        this.questionText = questionText;
        this.answer = answer;
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

    return new TypedQuestionData(questionText,
                                 chosenDeclension.text,
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

    return new TypedQuestionData(questionText,
                                  chosenDeclension,
                                  [feedbackLine1, ""]);
};

export const createTypedQuestionData = (enabledCases: EnabledCases) => {
    if ((enabledCases.nouns && enabledCases.pronouns && Math.random() < 0.5) ||
        (enabledCases.nouns && !enabledCases.pronouns)) {
        return setupNoun(enabledCases);
    } else {
        return setupPronoun(enabledCases);
    }
};

export let resetTypedQuestion = () => {
    // Do nothing for now
};

export const TypedQuestion = (props) => {

    const [isCorrectText, setIsCorrectText] = useState("");
    const [givenAnswer, setGivenAnswer] = useState("");
    const [feedbackText, setFeedbackText] = useState("");

    const onSubmit = () => {
        if (givenAnswer.toLowerCase() === props.data.answer) {
            setIsCorrectText("Correct!");
        } else {
            setIsCorrectText("Oops!");
            setFeedbackText(props.data.feedbackText);
        }
    };

    resetTypedQuestion = () => {
        setIsCorrectText("");
        setGivenAnswer("");
        setFeedbackText("");
    };

    return (
        <View>
            <Text style={commonStyles.questionText}>{props.data.questionText}</Text>
            <TextInput style={commonStyles.answerInput} onChangeText={setGivenAnswer} value={givenAnswer} autoFocus={true} onSubmitEditing={onSubmit}/>

            <Text style={commonStyles.feedbackLine1}>{isCorrectText}</Text>
            <Text style={commonStyles.feedbackLine2}>{feedbackText}</Text>
        </View>
    );
};

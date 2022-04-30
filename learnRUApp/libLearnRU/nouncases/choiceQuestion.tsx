import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { Colours, commonStyles, DefaultButton, shuffleArray } from '../common';

import { CASE_RULES, PLURAL_RULES, SPELLING_RULES } from './rulesDb';

import { EnabledCases } from './nouncases';

import { Noun } from './nounsDb';

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

    let availableCases: string[] = [];
    if (enabledCases.genitive) {
        availableCases.push("genitive");
    }

    if (enabledCases.accusative) {
        availableCases.push("accusative");
    }

    if (enabledCases.dative) {
        availableCases.push("dative");
    }

    if (enabledCases.instrumental) {
        availableCases.push("instrumental");
    }

    if (enabledCases.prepositional) {
        availableCases.push("prepositional");
    }


    let chosenCase: string = "";
    let chosenDeclension = undefined;
    let questionText = `What is the `;
    let feedbackLine1 = "";

    if ((enabledCases.singular && enabledCases.plural && Math.random() > 0.5) ||
        (enabledCases.singular && !enabledCases.plural)) {
        // Singular
        chosenCase = availableCases[Math.floor(Math.random() * availableCases.length)];
        chosenDeclension = chosenNoun.getSingularDeclension(chosenCase);
        questionText += `${chosenCase} singular `;
        feedbackLine1 = `Singular ${chosenCase} case`;

        // Nominative case has no case rule
        if (chosenDeclension.hasOwnProperty("caseRule")) {
            feedbackLine1 = feedbackLine1.concat(`, ${CASE_RULES[chosenCase][chosenDeclension.caseRule]}`);
        }
    } else {
        // Nominative may be available for plural
        if (enabledCases.nominative) {
            availableCases.push("nominative");
        }

        chosenCase = availableCases[Math.floor(Math.random() * availableCases.length)];
        chosenDeclension = chosenNoun.getPluralDeclension(chosenCase);
        questionText += `${chosenCase} plural `;
        feedbackLine1 = `Plural ${chosenCase} case`;

        // Nominative case has no case rule
        if (chosenDeclension.hasOwnProperty("caseRule")) {
            feedbackLine1 = feedbackLine1.concat(`, ${PLURAL_RULES[chosenCase][chosenDeclension.caseRule]}`);
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

// const setupPronoun = (enabledCases: EnabledCases) => {
//     // Choose a pronoun from the dictionary
//     const chosenProoun = Noun.getRandomNoun();
//     console.log(`Chose pronoun: ${chosenNoun.getSingularDeclension("nominative")}`);

//     let availableCases: string[] = [];
//     if (enabledCases.genitive) {
//         availableCases.push("genitive");
//     }

//     if (enabledCases.accusative) {
//         availableCases.push("accusative");
//     }

//     if (enabledCases.dative) {
//         availableCases.push("dative");
//     }

//     if (enabledCases.instrumental) {
//         availableCases.push("instrumental");
//     }

//     if (enabledCases.prepositional) {
//         availableCases.push("prepositional");
//     }
// };

export const createChoiceQuestionData = (enabledCases: EnabledCases) => {
    // if (Math.random() < 0.5) {
        return setupNoun(enabledCases);
    // } else {

    // }
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

// class CaseChoiceQuestion extends BaseQuestion {
//     constructor() {
//         super();

//         console.log("Creating CaseChoiceQuestion");

//         // Choose a noun or pronoun
//         if (Math.random() > 0.5) {
//             this._setupNoun();
//         } else {
//             this._setupPronoun();
//         }
//     }

//     _setupPronoun() {
//         // Choose a phrase from the dictionary
//         const chosenPhrase = Dictionary.getRandomPronounChoicePhrase(excludeCases=getDisabledCasesList());
//         console.log(`Chose pronoun phrase: ${chosenPhrase.getText()}`);

//         // Lookup the correct case of the noun for this phrase
//         let [correctPronounCase, incorrectChoices] = chosenPhrase.getCorrectAndIncorrectPronounDeclensions();
//         this._incorrectChoices = incorrectChoices;
//         console.log(`Correct case: ${correctPronounCase}`);

//         // Get the text for the feedback
//         const feedbackLine1 = `The correct answer is ${correctPronounCase}`;

//         // Store the results
//         this._questionText = chosenPhrase.getText();
//         this._answer = correctPronounCase;
//         this._feedbackText = [feedbackLine1, ""];
//     }

//     renderQuestion() {
//         // Prepare the answer choices
//         shuffledAnswers = [...this._incorrectChoices];
//         shuffledAnswers.push(this._answer);
//         shuffleArray(shuffledAnswers);

//         // Render the question
//         ReactDOM.render(<CaseChoiceQuestionElement questionText={this._questionText} answer={this._answer} shuffledAnswers={shuffledAnswers} incorrectChoices={this._incorrectChoices} feedbackLine1={this._feedbackText[0]} feedbackLine2={this._feedbackText[1]}/>, questionDiv);

//         // Render the buttons
//         const reportTitle = this._questionText;
//         const reportBody = `[${this._shuffledAnswers}][${this._answer}]`;
//         ReactDOM.render(<MainButtonsElement reportTitle={reportTitle} reportBody={reportBody} nextButtonDisabled={true}/>, buttonsDiv);
//     }
// }

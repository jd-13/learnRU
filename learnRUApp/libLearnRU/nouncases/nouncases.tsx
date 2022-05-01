import React, { useState } from 'react';
import { useEffect } from 'react';
import {
    SafeAreaView,
    View
} from 'react-native';

import { Colours, DefaultButton, ToggleButton } from '../common';

import { EnabledCases, enabledCasesIsValid,  } from './enabledCases';

import { TypedQuestion, createTypedQuestionData, resetTypedQuestion } from './typedQuestion';
import { ChoiceQuestion, createChoiceQuestionData, resetChoiceQuestion } from './choiceQuestion';

const Configuration = (props) => {

    const setNominativeEnabled = (isEnabled: boolean) => {
        let enabledCases = props.enabledCases;
        enabledCases.nominative = isEnabled;

        if (enabledCasesIsValid(enabledCases)) {
            props.setEnabledCases(enabledCases);
        }
    };

    const setGenitiveEnabled = (isEnabled: boolean) => {
        let enabledCases = props.enabledCases;
        enabledCases.genitive = isEnabled;

        if (enabledCasesIsValid(enabledCases)) {
            props.setEnabledCases(enabledCases);
        }
    };

    const setAccusativeEnabled = (isEnabled: boolean) => {
        let enabledCases = props.enabledCases;
        enabledCases.accusative = isEnabled;

        if (enabledCasesIsValid(enabledCases)) {
            props.setEnabledCases(enabledCases);
        }
    };

    const setDativeEnabled = (isEnabled: boolean) => {
        let enabledCases = props.enabledCases;
        enabledCases.dative = isEnabled;

        if (enabledCasesIsValid(enabledCases)) {
            props.setEnabledCases(enabledCases);
        }
    };

    const setInstrumentalEnabled = (isEnabled: boolean) => {
        let enabledCases = props.enabledCases;
        enabledCases.instrumental = isEnabled;

        if (enabledCasesIsValid(enabledCases)) {
            props.setEnabledCases(enabledCases);
        }
    };

    const setPrepositionalEnabled = (isEnabled: boolean) => {
        let enabledCases = props.enabledCases;
        enabledCases.prepositional = isEnabled;

        if (enabledCasesIsValid(enabledCases)) {
            props.setEnabledCases(enabledCases);
        }
    };

    const setSingularEnabled = (isEnabled: boolean) => {
        let enabledCases = props.enabledCases;
        enabledCases.singular = isEnabled;

        if (enabledCasesIsValid(enabledCases)) {
            props.setEnabledCases(enabledCases);
        }
    };

    const setPluralEnabled = (isEnabled: boolean) => {
        let enabledCases = props.enabledCases;
        enabledCases.plural = isEnabled;

        if (enabledCasesIsValid(enabledCases)) {
            props.setEnabledCases(enabledCases);
        }
    };

    const setNounsEnabled = (isEnabled: boolean) => {
        let enabledCases = props.enabledCases;
        enabledCases.nouns = isEnabled;

        if (enabledCasesIsValid(enabledCases)) {
            props.setEnabledCases(enabledCases);
        }
    };

    const setPronounsEnabled = (isEnabled: boolean) => {
        let enabledCases = props.enabledCases;
        enabledCases.pronouns = isEnabled;

        if (enabledCasesIsValid(enabledCases)) {
            props.setEnabledCases(enabledCases);
        }
    };

    return (
        <View>
            <View style={{flexDirection: "row", width: "100%"}}>
                <ToggleButton style={{flex: 1}} colour={Colours.optionsButton} isOn={props.enabledCases.nominative} text="Nom" onPress={() => { setNominativeEnabled(!props.enabledCases.nominative) }}/>
                <ToggleButton style={{flex: 1}} colour={Colours.optionsButton} isOn={props.enabledCases.genitive} text="Gen" onPress={() => { setGenitiveEnabled(!props.enabledCases.genitive) }}/>
                <ToggleButton style={{flex: 1}} colour={Colours.optionsButton} isOn={props.enabledCases.accusative} text="Acc" onPress={() => { setAccusativeEnabled(!props.enabledCases.accusative) }}/>
                <ToggleButton style={{flex: 1}} colour={Colours.optionsButton} isOn={props.enabledCases.dative} text="Dat" onPress={() => { setDativeEnabled(!props.enabledCases.dative) }}/>
                <ToggleButton style={{flex: 1}} colour={Colours.optionsButton} isOn={props.enabledCases.instrumental} text="Inst" onPress={() => { setInstrumentalEnabled(!props.enabledCases.instrumental) }}/>
                <ToggleButton style={{flex: 1}} colour={Colours.optionsButton} isOn={props.enabledCases.prepositional} text="Prep" onPress={() => { setPrepositionalEnabled(!props.enabledCases.prepositional) }}/>
            </View>
            <View style={{flexDirection: "row", width: "100%"}}>
                <ToggleButton style={{flex: 1}} colour={Colours.optionsButton} isOn={props.enabledCases.singular} text="Singular" onPress={() => { setSingularEnabled(!props.enabledCases.singular) }}/>
                <ToggleButton style={{flex: 1}} colour={Colours.optionsButton} isOn={props.enabledCases.plural} text="Plural" onPress={() => { setPluralEnabled(!props.enabledCases.plural) }}/>
            </View>
            <View style={{flexDirection: "row", width: "100%"}}>
                <ToggleButton style={{flex: 1}} colour={Colours.optionsButton} isOn={props.enabledCases.nouns} text="Nouns" onPress={() => { setNounsEnabled(!props.enabledCases.nouns) }}/>
                <ToggleButton style={{flex: 1}} colour={Colours.optionsButton} isOn={props.enabledCases.pronouns} text="Pronouns" onPress={() => { setPronounsEnabled(!props.enabledCases.pronouns) }}/>
            </View>
        </View>
    );
};

export const NounCasesScreen = ({navigation}) => {
    const [enabledCases, setEnabledCases] = useState(new EnabledCases());

    const onNext = () => {
        setQuestion(getNewQuestion(enabledCases));
    };

    const getNewQuestion = (enabledCases: EnabledCases) => {
        console.log("New question requested");

        const typedQuestionElement = <TypedQuestion data={createTypedQuestionData(enabledCases)}/>

        const choiceQuestionElement = <ChoiceQuestion data={createChoiceQuestionData(enabledCases)}/>

        const questionElements = [typedQuestionElement, choiceQuestionElement];

        return questionElements[Math.floor(Math.random() * questionElements.length)];
    };

    useEffect(() => {
        resetTypedQuestion();
        resetChoiceQuestion();
    });

    const onSetEnabledCases = (newEnabledCases: EnabledCases) => {
        setEnabledCases(newEnabledCases);
        setQuestion(getNewQuestion(newEnabledCases))
    }

    const [question, setQuestion] = useState(getNewQuestion(enabledCases));

    return (
        <SafeAreaView style={{flex: 1, margin: 10}}>
            <View style={{flex: 1}}>
                {question}
            </View>
            <Configuration enabledCases={enabledCases}
                           setEnabledCases={onSetEnabledCases}/>
            <View>
                <DefaultButton text="Report" colour="red" isDisabled={true}/>
                <DefaultButton colour={Colours.nextButton} text="Next" onPress={onNext}/>
            </View>
        </SafeAreaView>
    );
};
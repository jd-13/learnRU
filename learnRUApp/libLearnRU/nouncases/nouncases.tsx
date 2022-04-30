import React, { useState } from 'react';
import { useEffect } from 'react';
import {
    SafeAreaView,
    View
} from 'react-native';

import { Colours, DefaultButton, ToggleButton } from '../common';

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
        </View>
    );
};

export class EnabledCases {
    nominative: boolean;
    genitive: boolean;
    accusative: boolean;
    dative: boolean;
    instrumental: boolean;
    prepositional: boolean;

    singular: boolean;
    plural: boolean;

    constructor() {
        this.nominative = true;
        this.genitive = true;
        this.accusative = true;
        this.dative = true;
        this.instrumental = true;
        this.prepositional = true;

        this.singular = true;
        this.plural = true;
    }
};

const enabledCasesIsValid = (enabledCases: EnabledCases) => {
    if (enabledCases.nominative && enabledCases.plural) {
        // Just having nominative is enough if we have plural enabled
        return true;
    } else {
        return (enabledCases.genitive ||
                enabledCases.accusative ||
                enabledCases.dative ||
                enabledCases.instrumental ||
                enabledCases.prepositional) &&
               (enabledCases.singular ||
                enabledCases.plural);
    }

};

export const NounCasesScreen = ({navigation}) => {
    const [enabledCases, setEnabledCases] = useState(new EnabledCases());

    const onNext = () => {
        setQuestion(getNewQuestion(enabledCases));
    };

    const getNewQuestion = (enabledCases: EnabledCases) => {
        console.log("New question requested");

        // const typedQuestionElement = <TypedQuestion data={createTypedQuestionData(enabledCases)}/>

        const choiceQuestionElement = <ChoiceQuestion data={createChoiceQuestionData(enabledCases)}/>

        const questionElements = [/*typedQuestionElement,*/ choiceQuestionElement]

        return questionElements[Math.floor(Math.random() * questionElements.length)];
    };

    useEffect(() => {
        // resetTypedQuestion();
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
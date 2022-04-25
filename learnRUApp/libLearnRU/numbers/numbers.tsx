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
    const setCardinalEnabled = (isEnabled: boolean) => {
        if (isEnabled || props.enabledNumbers.ordinal) {
            props.setEnabledNumbers({"cardinal": isEnabled, "ordinal": props.enabledNumbers.ordinal});
        }
    };

    const setOrdinalEnabled = (isEnabled: boolean) => {
        if (isEnabled || props.enabledNumbers.cardinal) {
            props.setEnabledNumbers({"cardinal": props.enabledNumbers.cardinal, "ordinal": isEnabled});
        }
    };

    return (
        <View>
            <View style={{flexDirection: "row", width: "100%"}}>
                <ToggleButton style={{flex: 1}} colour={Colours.optionsButton} isOn={props.selectedMaxNumber === 10} text="<10" onPress={() => { props.setSelectedMaxNumber(10) }}/>
                <ToggleButton style={{flex: 1}} colour={Colours.optionsButton} isOn={props.selectedMaxNumber === 20} text="<20" onPress={() => { props.setSelectedMaxNumber(20) }}/>
                <ToggleButton style={{flex: 1}} colour={Colours.optionsButton} isOn={props.selectedMaxNumber === 100} text="<100" onPress={() => { props.setSelectedMaxNumber(100) }}/>
                <ToggleButton style={{flex: 1}} colour={Colours.optionsButton} isOn={props.selectedMaxNumber === 1000} text="<1000" onPress={() => { props.setSelectedMaxNumber(1000) }}/>
            </View>
            <View style={{flexDirection: "row"}}>
                <ToggleButton style={{flex: 1}} colour={Colours.optionsButton} isOn={props.enabledNumbers.cardinal} text="Cardinal" onPress={() => { setCardinalEnabled(!props.enabledNumbers.cardinal) }}/>
                <ToggleButton style={{flex: 1}} colour={Colours.optionsButton} isOn={props.enabledNumbers.ordinal} text="Ordinal" onPress={() => { setOrdinalEnabled(!props.enabledNumbers.ordinal) }}/>
            </View>
        </View>
    );
};

export const NumbersScreen = ({navigation}) => {
    const [selectedMaxNumber, setSelectedMaxNumber] = useState(1000);
    const [selectedNumberTypes, setSelectedNumberTypes] = useState({ "cardinal": true, "ordinal": true });

    const onNext = () => {
        setQuestion(getNewQuestion(selectedMaxNumber, selectedNumberTypes));
    };

    const getNewQuestion = (maxNumber: number, numberTypes: object) => {
        console.log("New question requested");

        const typedQuestionElement = <TypedQuestion data={createTypedQuestionData(maxNumber, numberTypes)}/>

        const choiceQuestionElement = <ChoiceQuestion data={createChoiceQuestionData(maxNumber, numberTypes)}/>

        const questionElements = [typedQuestionElement, choiceQuestionElement]

        return questionElements[Math.floor(Math.random() * questionElements.length)];
    };

    useEffect(() => {
        resetTypedQuestion();
        resetChoiceQuestion();
    });

    const onSetSelectedMaxNumber = (maxNumber: number) => {
        setSelectedMaxNumber(maxNumber);
        setQuestion(getNewQuestion(maxNumber, selectedNumberTypes));
    };

    const onSetSelectedNumberTypes = (numberTypes: object) => {
        setSelectedNumberTypes(numberTypes);
        setQuestion(getNewQuestion(selectedMaxNumber, numberTypes));
    };

    const [question, setQuestion] = useState(getNewQuestion(selectedMaxNumber, selectedNumberTypes));

    return (
        <SafeAreaView style={{flex: 1, margin: 10}}>
            <View style={{flex: 1}}>
                {question}
            </View>
            <Configuration selectedMaxNumber={selectedMaxNumber}
                           setSelectedMaxNumber={onSetSelectedMaxNumber}
                           enabledNumbers={selectedNumberTypes}
                           setEnabledNumbers={onSetSelectedNumberTypes}/>
            <View>
                <DefaultButton text="Report" colour="red" isDisabled={true}/>
                <DefaultButton colour={Colours.nextButton} text="Next" onPress={onNext}/>
            </View>
        </SafeAreaView>
    );
}

import React, { useState } from 'react';
import { useEffect } from 'react';
import {
    SafeAreaView,
    View
} from 'react-native';

import { DefaultButton, ToggleButton } from '../common';

import { TypedQuestion, createTypedQuestionData, resetTypedQuestion } from './typedQuestion';
import { ChoiceQuestion, createChoiceQuestionData, resetChoiceQuestion } from './choiceQuestion';

const availableRanges = ["10", "20", "100", "1000"];

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
            <View style={{flexDirection: "row"}}>
                <ToggleButton isOn={props.selectedMaxNumber === 10} text="0-10" onPress={() => { props.setSelectedMaxNumber(10) }}/>
                <ToggleButton isOn={props.selectedMaxNumber === 20} text="0-20" onPress={() => { props.setSelectedMaxNumber(20) }}/>
                <ToggleButton isOn={props.selectedMaxNumber === 100} text="0-100" onPress={() => { props.setSelectedMaxNumber(100) }}/>
                <ToggleButton isOn={props.selectedMaxNumber === 1000} text="0-1000" onPress={() => { props.setSelectedMaxNumber(1000) }}/>
            </View>
            <View style={{flexDirection: "row"}}>
                <ToggleButton isOn={props.enabledNumbers.cardinal} text="Cardinal" onPress={() => { setCardinalEnabled(!props.enabledNumbers.cardinal) }}/>
                <ToggleButton isOn={props.enabledNumbers.ordinal} text="Ordinal" onPress={() => { setOrdinalEnabled(!props.enabledNumbers.ordinal) }}/>
            </View>
        </View>
    );
};

export const NumbersScreen = ({navigation}) => {
    const [selectedMaxNumber, setSelectedMaxNumber] = useState(1000);
    const [enabledNumbers, setEnabledNumbers] = useState({ "cardinal": true, "ordinal": true });

    const onNext = () => {
        setQuestion(getNewQuestion());
    };

    const getNewQuestion = () => {
        console.log("New question requested");

        const typedQuestionElement = <TypedQuestion data={createTypedQuestionData(selectedMaxNumber, enabledNumbers)}/>

        const choiceQuestionElement = <ChoiceQuestion data={createChoiceQuestionData(selectedMaxNumber, enabledNumbers)}/>

        const questionElements = [typedQuestionElement, choiceQuestionElement]

        return questionElements[Math.floor(Math.random() * questionElements.length)];
    };

    useEffect(() => {
        resetTypedQuestion();
        resetChoiceQuestion();
    });

    const [question, setQuestion] = useState(getNewQuestion());

    return (
        <SafeAreaView style={{flex: 1, margin: 10}}>
            <View style={{flex: 1}}>
                {question}
            </View>
            <Configuration selectedMaxNumber={selectedMaxNumber}
                           setSelectedMaxNumber={setSelectedMaxNumber}
                           enabledNumbers={enabledNumbers}
                           setEnabledNumbers={setEnabledNumbers}/>
            <View>
                <DefaultButton text="Report" colour="red" isDisabled={true}/>
                <DefaultButton text="Next" colour="black" onPress={onNext}/>
            </View>
        </SafeAreaView>
    );
}

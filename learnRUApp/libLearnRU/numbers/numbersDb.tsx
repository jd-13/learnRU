const NUMBERS =
{
    "cardinal":
    { // A dict with number indicies and an array are exactly the same thing in JS

        // Final positiion digits (if present in a number, they will always be last)
        0: "ноль",
        1: ["один", "одна", "одно"],
        2: ["два", "две", "два"],
        3: "три",
        4: "четыре",
        5: "пять",
        6: "шесть",
        7: "семь",
        8: "восемь",
        9: "девять",
        10: "десять",
        11: "одиннадцать",
        12: "двенадцать",
        13: "тринадцать",
        14: "четырнадцать",
        15: "пятнадцать",
        16: "шестнадцать",
        17: "семнадцать",
        18: "восемнадцать",
        19: "девятнадцать",

        // 10s
        20: "двадцать",
        30: "тридцать",
        40: "сорок",
        50: "пятьдесят",
        60: "шестьдесят",
        70: "семьдесят",
        80: "восемьдесят",
        90: "девяносто",

        // 100s
        100: "сто",
        200: "двести",
        300: "триста",
        400: "четыреста",
        500: "пятьсот",
        600: "шестьсот",
        700: "семьсот",
        800: "восемьсот",
        900: "девятьсот",
    },

    "ordinal":
    { // A dict with number indicies and an array are exactly the same thing in JS

        // Final positiion digits (if present in a number, they will always be last)
        1: ["первый", "первая", "первое", "первые"],
        2: ["второй", "вторая", "второе", "вторые"],
        3: ["третий", "третья", "третье", "третьи"],
        4: ["четвёртый", "четвёртая", "четвёртое", "четвёртые"],
        5: ["пятый", "пятая", "пятое", "пятые"],
        6: ["шестой", "шестая", "шестое", "шестые"],
        7: ["седьмой", "седьмая", "седьмое", "седьмые"],
        8: ["восьмой", "восьмая", "восьмое", "восьмые"],
        9: ["девятый", "девятая", "девятое", "девятые"],
        10: ["десятый", "десятая", "десятое", "десятые"],
        11: ["одиннадцатый", "одиннадцатая", "одиннадцатое", "одиннадцатые"],
        12: ["двенадцатый", "двенадцатая", "двенадцатое", "двенадцатые"],
        13: ["тринадцатый", "тринадцатая", "тринадцатое", "тринадцатые"],
        14: ["четырнадцатый", "четырнадцатая", "четырнадцатое", "четырнадцатые"],
        15: ["пятнадцатый", "пятнадцатая", "пятнадцатое", "пятнадцатые"],
        16: ["шестнадцатый", "шестнадцатая", "шестнадцатое", "шестнадцатые"],
        17: ["семнадцатый", "семнадцатая", "семнадцатое", "семнадцатые"],
        18: ["восемнадцатый", "восемнадцатая", "восемнадцатое", "восемнадцатые"],
        19: ["девятнадцатый", "девятнадцатая", "девятнадцатое", "девятнадцатые"],

        // 10s
        20: ["двадцатый", "двадцатая", "двадцатое", "двадцатые"],
        30: ["тридцатый", "тридцатая", "тридцатое", "тридцатые"],
        40: ["сороковой", "сороковая", "сороковое", "сороковые"],
        50: ["пятидесятый", "пятидесятая", "пятидесятое", "пятидесятые"],
        60: ["шестидесятый", "шестидесятая", "шестидесятое", "шестидесятые"],
        70: ["семидесятый", "семидесятая", "семидесятое", "семидесятые"],
        80: ["восьмидесятый", "восьмидесятая", "восьмидесятое", "восьмидесятые"],
        90: ["девяностый", "девяностая", "девяностое", "девяностые"],

        // 100s
        100: ["сотый", "сотая", "сотое", "сотые"],
        200: ["двухсотый", "двухсотая", "двухсотое", "двухсотые"],
        300: ["трёхсотый", "трёхсотая", "трёхсотое", "трёхсотые"],
        400: ["четырёхсотый", "четырёхсотая", "четырёхсотое", "четырёхсотые"],
        500: ["пятисотый", "пятисотая", "пятисотое", "пятисотые"],
        600: ["шестисотый", "шестисотая", "шестисотое", "шестисотые"],
        700: ["семисотый", "семисотая", "семисотое", "семисотые"],
        800: ["восьмисотый", "восьмисотая", "восьмисотое", "восьмисотые"],
        900: ["девятисотый", "девятисотая", "девятисотое", "девятисотые"]
    }
}

/**
 * Provides the interface to the dictionary data structure. Nothing should access the JSON data
 * directly.
 */
export class Numbers {
    /**
     * Returns a randomly chosen cardinal number from the dictionary.
     */
    static getRandomCardinal(maxNumber: string) {
        let chosenNumber: string = Math.floor(Math.random() * maxNumber).toString();
        let translatedString: string = "";

        const hundreds = chosenNumber.length >= 3 ? chosenNumber[chosenNumber.length - 3] : undefined;
        const tens = chosenNumber.length >= 2 ? chosenNumber[chosenNumber.length - 2] : undefined;
        const ones = chosenNumber[chosenNumber.length - 1];

        let isDone = false;

        // Hundreds
        if (hundreds !== undefined) {
            translatedString += NUMBERS.cardinal[Number(hundreds) * 100] + " ";
        }

        // Tens
        if (tens !== undefined) {

            if (tens === "0") {
                // Do nothing

            } else if (tens === "1" && ones !== 0) {
                // Teens
                isDone = true;
                translatedString += NUMBERS.cardinal[Number(tens) * 10 + Number(ones)] + " ";

            } else {
                // Normal 10s
                translatedString += NUMBERS.cardinal[Number(tens) * 10] + " ";

            }
        }

        // Ones
        if (!isDone) {
            if (ones === "1" || ones === "2") {
                // One/two is a special case as it is gendered
                const genders = ["masculine", "feminine", "neuter"];
                const chosenGenderIdx = Math.floor(Math.random() * genders.length);

                translatedString += NUMBERS.cardinal[Number(ones)][chosenGenderIdx];
                chosenNumber += ` (${genders[chosenGenderIdx]})`;

            } else {
                // Don't put a "ноль" on the end of a number like 20, 350 etc
                if (ones !== "0" || chosenNumber.length === 1) {
                    translatedString += NUMBERS.cardinal[Number(ones)];
                }
            }
        }

        return [chosenNumber, translatedString.trim()];
    }

    /**
     * Returns a randomly chosen ordinal number from the dictionary.
     */
    static getRandomOrdinal(maxNumber: number) {
        let chosenNumber = Math.floor(Math.random() * (maxNumber - 1) + 1).toString(); // +1 because 0th doesn't count
        let translatedString = "";

        const hundreds = chosenNumber.length >= 3 ? chosenNumber[chosenNumber.length - 3] : undefined;
        const tens = chosenNumber.length >= 2 ? chosenNumber[chosenNumber.length - 2] : undefined;
        const ones = chosenNumber[chosenNumber.length - 1];

        let isDone = false;

        const genders = ["masculine", "feminine", "neuter", "plural"];
        const chosenGenderIdx = Math.floor(Math.random() * genders.length);

        // Hundreds
        if (hundreds !== undefined) {

            if (tens !== "0" || ones !== "0") {
                // Hundreds will be cardinal
                translatedString += NUMBERS.cardinal[Number(hundreds) * 100] + " ";

            } else {
                // Hundreds will be ordinal
                translatedString = NUMBERS.ordinal[Number(hundreds) * 100][chosenGenderIdx];
                chosenNumber += `th (${genders[chosenGenderIdx]})`;
                isDone = true;
            }
        }

        // Tens
        if (!isDone && tens !== undefined && tens !== "0") {

            if (tens !== "1" && ones !== "0") {
                // Only the final digit is ordinal
                translatedString += NUMBERS.cardinal[Number(tens) * 10] + " ";

            } else if (tens !== "1" && ones === "0") {
                // The tens are ordinal
                translatedString += NUMBERS.ordinal[Number(tens) * 10][chosenGenderIdx];
                chosenNumber += `th (${genders[chosenGenderIdx]})`;
                isDone = true;

            } else {
                // The teens are ordinal
                translatedString += NUMBERS.ordinal[Number(tens) * 10 + Number(ones)][chosenGenderIdx];
                chosenNumber += `th (${genders[chosenGenderIdx]})`;
                isDone = true;

            }
        }

        // Ones
        if (!isDone) {
            // The final digit must be ordinal
            translatedString += NUMBERS.ordinal[Number(ones)][chosenGenderIdx];

            if (ones === "1") {
                chosenNumber += "st";
            } else if (ones == "2") {
                chosenNumber += "nd";
            } else if (ones == "3") {
                chosenNumber += "rd";
            } else {
                chosenNumber += "th";
            }

            chosenNumber += ` (${genders[chosenGenderIdx]})`;
        }

        return [chosenNumber, translatedString.trim()];
    }
}

export const getRandomNumber = (maxNumber: number, enabledNumbers: string[]) => {
    let availableFunctions = [];

    if (enabledNumbers["cardinal"]) {
        availableFunctions.push(Numbers.getRandomCardinal);
    }

    if (enabledNumbers["ordinal"]) {
        availableFunctions.push(Numbers.getRandomOrdinal);
    }

    return availableFunctions[Math.floor(Math.random() * availableFunctions.length)](maxNumber);
}
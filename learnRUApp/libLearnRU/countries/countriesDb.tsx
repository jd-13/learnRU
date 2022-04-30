const COUNTRIES = [
    // TODO find an Australian flag jpg I can use (this svg breaks during conversion)
    // {
    //     "flag": "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg",
    //     "country": "Австралия",
    //     "genitive": "Австралии",
    //     "languages": ["английски"],
    //     "nationality": {
    //         "masculine": "австралиец",
    //         "feminine": "австралийка",
    //         "plural": "австралийцы"
    //     }
    // },
    {
        "flag": require("./images/Flag_of_the_United_States.jpg"),
        "country": "Америка",
        "genitive": "Америки",
        "languages": ["английски"],
        "nationality": {
            "masculine": "американец",
            "feminine": "американка",
            "plural": "американцы"
        }
    },
    {
        "flag": require("./images/Flag_of_England.jpg"),
        "country": "Англия",
        "genitive": "Англии",
        "languages": ["английски"],
        "nationality": {
            "masculine": "англичанин",
            "feminine": "англичанка",
            "plural": "англичане"
        }
    },
    {
        "flag": require("./images/Flag_of_Argentina.jpg"),
        "country": "Аргентина",
        "genitive": "Аргентины",
        "languages": ["испански"],
        "nationality": {
            "masculine": "аргентинец",
            "feminine": "аргентинка",
            "plural": "аргентинцы"
        }
    },
    {
        "flag": require("./images/Flag_of_Belgium.jpg"),
        "country": "Бельгия",
        "genitive": "Бельгии",
        "languages": ["нидерландски", "французски"],
        "nationality": {
            "masculine": "бельгиец",
            "feminine": "бельгийка",
            "plural": "бельгийцы"
        }
    },
    {
        "flag": require("./images/Flag_of_Denmark.jpg"),
        "country": "Дания",
        "genitive": "Дании",
        "languages": ["датски"],
        "nationality": {
            "masculine": "датчанин",
            "feminine": "датчанка",
            "plural": "датчане"
        }
    },
    {
        "flag": require("./images/Flag_of_Germany.jpg"),
        "country": "Германия",
        "genitive": "Германии",
        "languages": ["немецки"],
        "nationality": {
            "masculine": "немец",
            "feminine": "немка",
            "plural": "немцы"
        }
    },
    {
        "flag": require("./images/Flag_of_Greece.jpg"),
        "country": "Греция",
        "genitive": "Греции",
        "languages": ["гречески"],
        "nationality": {
            "masculine": "грек",
            "feminine": "гречанка",
            "plural": "греки"
        }
    },
    {
        "flag": require("./images/Flag_of_Spain.jpg"),
        "country": "Испания",
        "genitive": "Испании",
        "languages": ["испански"],
        "nationality": {
            "masculine": "испанец",
            "feminine": "испанка",
            "plural": "испанцы"
        }
    },
    {
        "flag": require("./images/Flag_of_Italy.jpg"),
        "country": "Италия",
        "genitive": "Италии",
        "languages": ["итальянски"],
        "nationality": {
            "masculine": "итальянец",
            "feminine": "итальянка",
            "plural": "итальянцы"
        }
    },
    {
        "flag": require("./images/Flag_of_Canada_(Pantone).jpg"),
        "country": "Канада",
        "genitive": "Канады",
        "languages": ["английски", "французски"],
        "nationality": {
            "masculine": "канадец",
            "feminine": "канадка",
            "plural": "канадцы"
        }
    },
    {
        "flag": require("./images/Flag_of_the_People's_Republic_of_China.jpg"),
        "country": "Китай",
        "genitive": "Китая",
        "languages": ["китайски"],
        "nationality": {
            "masculine": "китаец",
            "feminine": "китаянка",
            "plural": "китайцы"
        }
    },
    {
        "flag": require("./images/Flag_of_Mexico.jpg"),
        "country": "Мексика",
        "genitive": "Мексики",
        "languages": ["испански"],
        "nationality": {
            "masculine": "мексиканец",
            "feminine": "мексиканка",
            "plural": "мексиканцы"
        }
    },
    {
        "flag": require("./images/Flag_of_Norway.jpg"),
        "country": "Норвегия",
        "genitive": "Норвегии",
        "languages": ["норвежски"],
        "nationality": {
            "masculine": "норвежец",
            "feminine": "норвежка",
            "plural": "норвежцы"
        }
    },
    {
        "flag": require("./images/Flag_of_Portugal.jpg"),
        "country": "Португалия",
        "genitive": "Португалии",
        "languages": ["португальски"],
        "nationality": {
            "masculine": "португалец",
            "feminine": "португалка",
            "plural": "португальцы"
        }
    },
    {
        "flag": require("./images/Flag_of_Russia.jpg"),
        "country": "Россия",
        "genitive": "России",
        "languages": ["русски"],
        "nationality": {
            "masculine": "русскии",
            "feminine": "русская",
            "plural": "русские"
        }
    },
    {
        "flag": require("./images/Flag_of_Ukraine.jpg"),
        "country": "Украина",
        "genitive": "Украины",
        "languages": ["украински"],
        "nationality": {
            "masculine": "украинец",
            "feminine": "украинка",
            "plural": "украинцы"
        }
    },
    {
        "flag": require("./images/Flag_of_France.jpg"),
        "country": "Франция",
        "genitive": "Франции",
        "languages": ["французски"],
        "nationality": {
            "masculine": "француз",
            "feminine": "француженка",
            "plural": "французы"
        }
    },
    {
        "flag": require("./images/Flag_of_Switzerland_(Pantone).jpg"),
        "country": "Швейцария",
        "genitive": "Швейцарии",
        "languages": ["немецки"],
        "nationality": {
            "masculine": "швейцарец",
            "feminine": "швейцарка",
            "plural": "швейцарцы"
        }
    }
]

export class Country {
    constructor(json) {
        this._json = json;
    }

    getFlagURL() { return this._json["flag"]; }
    getCountryName() { return this._json["country"]; }
    getGenitive() { return this._json["genitive"]; }
    getLanguages() { return this._json["languages"]; }
    getNationality(gender: string) { return this._json["nationality"][gender]; }

    getRandomLanguage() {
        return this._json["languages"][Math.floor(Math.random() * this._json["languages"].length)]
    }
}

/**
 * Provides the interface to the dictionary data structure. Nothing should access the JSON data
 * directly.
 */
export class Countries {
    /**
     * Returns a randomly chosen country from the dictionary.
     */
    static getRandomCountry() {
        return new Country(COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)]);
    }

    /**
     * Returns a randomly chosen gender that can be used for nationalities.
     */
    static getRandomGender() {
        const genders = [
            ["masculine", "он"],
            ["feminine", "она"],
            ["plural", "они"]
        ];
        return genders[Math.floor(Math.random() * genders.length)];
    }
}
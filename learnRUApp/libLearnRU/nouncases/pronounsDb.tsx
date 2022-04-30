const PRONOUNS = {
    "personal": {
        "singular": [
            {
                "nominative": "я",
                "genitive": "меня",
                "accusative": "меня",
                "dative": "мне",
                "instrumental": "мной"
            },
            {
                "nominative": "ты",
                "genitive": "тебя",
                "accusative": "тебя",
                "dative": "тебе",
                "instrumental": "тобой"
            },
        ],
        // TODO: confirm where we need to use него, неё
        "masculine": [
            {
                "nominative": "он",
                "genitive": "его",
                "accusative": "его",
                "dative": "ему",
                "instrumental": "им"
            },
        ],
        "feminine": [
            {
                "nominative": "она",
                "genitive": "её",
                "accusative": "её",
                "dative": "ей",
                "instrumental": "ей"
            },
        ],
        "neuter": [
            {
                "nominative": "оно",
                "genitive": "его",
                "accusative": "его",
                "dative": "ему",
                "instrumental": "им"
            }
        ],
        "plural": [
            {
                "nominative": "вы",
                "genitive": "вас",
                "accusative": "вас",
                "dative": "вам",
                "instrumental": "вами"
            },
            {
                "nominative": "мы",
                "genitive": "нас",
                "accusative": "нас",
                "dative": "нам",
                "instrumental": "нами"
            },

            // TODO: confirm where we need to use них
            {
                "nominative": "они",
                "genitive": "их",
                "accusative": "их",
                "dative": "им",
                "instrumental": "ими"
            }
        ]
    },

    "possessive":
    {
        "masculine": [
            {
                "nominative": "мой",
                "genitive": "моего",
                "accusative": {"inanimate": "мой", "animate": "моего"},
                "dative": "моему",
                "instrumental": "моим"
            },
            {
                "nominative": "твой",
                "genitive": "твоего",
                "accusative": {"inanimate": "твой", "animate": "твоего"},
                "dative": "твоему",
                "instrumental": "твоим"
            },
            {
                "nominative": "наш",
                "genitive": "нашего",
                "accusative": {"inanimate": "наш", "animate": "нашего"},
                "dative": "нашему",
                "instrumental": "нашим"
            },
            {
                "nominative": "ваш",
                "genitive": "вашего",
                "accusative": {"inanimate": "ваш", "animate": "вашего"},
                "dative": "вашему",
                "instrumental": "вашим"
            }
        ],
        "feminine": [
            {
                "nominative": "моя",
                "genitive": "моей",
                "accusative": {"inanimate": "мою", "animate": "мою"},
                "dative": "моей",
                "instrumental": "моей"
            },
            {
                "nominative": "твоя",
                "genitive": "твоей",
                "accusative": {"inanimate": "твою", "animate": "твою"},
                "dative": "твоей",
                "instrumental": "твоей"
            },
            {
                "nominative": "наша",
                "genitive": "нашей",
                "accusative": {"inanimate": "нашу", "animate": "нашу"},
                "dative": "нашей",
                "instrumental": "нашей"
            },
            {
                "nominative": "ваша",
                "genitive": "вашей",
                "accusative": {"inanimate": "вашу", "animate": "вашу"},
                "dative": "вашей",
                "instrumental": "вашей"
            }
        ],
        "neuter": [
            {
                "nominative": "моё",
                "genitive": "моего",
                "accusative": {"inanimate": "моё", "animate": "моё"},
                "dative": "моему",
                "instrumental": "моим"
            },
            {
                "nominative": "твоё",
                "genitive": "твоего",
                "accusative": {"inanimate": "твоё", "animate": "твоё"},
                "dative": "твоему",
                "instrumental": "твоим"
            },
            {
                "nominative": "наше",
                "genitive": "нашего",
                "accusative": {"inanimate": "наше", "animate": "наше"},
                "dative": "нашему",
                "instrumental": "нашим"
            },
            {
                "nominative": "ваше",
                "genitive": "вашего",
                "accusative": {"inanimate": "ваше", "animate": "ваше"},
                "dative": "вашему",
                "instrumental": "вашим"
            }
        ],
        "plural": [
            {
                "nominative": "мои",
                "genitive": "моих",
                "accusative": {"inanimate": "мои", "animate": "моих"},
                "dative": "моим",
                "instrumental": "моими"
            },
            {
                "nominative": "твои",
                "genitive": "твоих",
                "accusative": {"inanimate": "твои", "animate": "твоих"},
                "dative": "твоим",
                "instrumental": "твоими"
            },
            {
                "nominative": "наши",
                "genitive": "наших",
                "accusative": {"inanimate": "наши", "animate": "наших"},
                "dative": "нашим",
                "instrumental": "нашими"
            },
            {
                "nominative": "ваши",
                "genitive": "ваших",
                "accusative": {"inanimate": "ваши", "animate": "ваших"},
                "dative": "вашим",
                "instrumental": "вашими"
            }
        ]
    }
}

export class Pronoun {
    constructor(json) {
        this._json = json;
    }

    /**
     * Returns a randomly chosen case and declension for this pronoun.
     */
    getRandomCase(excludeCases=undefined) {
        // Choose a case at random
        let availableCases = Object.keys(this._json);

        // Exclude cases if requested
        if (excludeCases != undefined) {
            availableCases = availableCases.filter(function(element) {
                return excludeCases.indexOf(element) < 0;
            });
        }

        const chosenCaseKey = availableCases[Math.floor(Math.random() * availableCases.length)];
        let chosenCase = this._json[chosenCaseKey];

        // Accusative possesive pronouns have different declensions for animate and inanimate
        // objects, handle this here
        let isAnimate = undefined;
        if (typeof chosenCase === "object") {

            // Choose animate or inanimate randomly
            if (Math.random() > 0.5) {
                chosenCase = chosenCase.animate;
                isAnimate = true;
            } else {
                chosenCase = chosenCase.inanimate;
                isAnimate = false;
            }
        }

        return [chosenCaseKey, isAnimate, chosenCase];
    }

    getDeclension(caseKey: string) { return this._json[caseKey]; }

    static getRandomPersonalPronoun(genders: string[]=["singular", "masculine", "feminine", "neuter", "plural"]) {

        // Choose a personal pronoun
        const chosenGender = genders[Math.floor(Math.random() * genders.length)];
        const pronouns = PRONOUNS.personal[chosenGender];

        const chosenPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];

        return new Pronoun(chosenPronoun);
    }

    /**
     * Returns a randomly chosen possessive pronoun from the dictionary.
     */
    static getRandomPossessivePronoun(gender: string="") {
        let chosenPronoun = undefined;

        // Pick a gender randomly
        if (gender === "") {
            const genders = ["masculine", "feminine", "neuter", "plural"];
            gender = genders[Math.floor(Math.random() * genders.length)];
        }

        // Choose a possesive pronoun
        const pronouns = PRONOUNS.possessive[gender];
        chosenPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];

        return new Pronoun(chosenPronoun);
    }
}
const NOUNS = {
    // We're not including gender exceptions such as папа for now
    собака: {
        "singular":
        {
            "nominative": {"text": "собака"},
            "genitive": {"text": "собаки", "caseRule": 2, "spellingRule": 0},
            "accusative": {"text": "собаку", "caseRule": 4},
            "dative": {"text": "собаке", "caseRule": 2},
            "instrumental": {"text": "собакой", "caseRule": 3},
            "prepositional": {"text": "собаке", "caseRule": 2}
        },
        "plural":
        {
            "nominative": {"text": "собаки", "caseRule": 2, "spellingRule": 0},
            "genitive": {"text": "собак", "caseRule": 3},
            "accusative": {"text": "собак", "caseRule": 1},
            "dative": {"text": "собакам", "caseRule": 2},
            "instrumental": {"text": "собаками", "caseRule": 1},
            "prepositional": {"text": "собаках", "caseRule": 1}
        }
    },
    кошка: {
        "singular":
        {
            "nominative": {"text": "кошка"},
            "genitive": {"text": "кошки", "caseRule": 2, "spellingRule": 0},
            "accusative": {"text": "кошку", "caseRule": 4},
            "dative": {"text": "кошке", "caseRule": 2},
            "instrumental": {"text": "кошкой", "caseRule": 3},
            "prepositional": {"text": "кошке", "caseRule": 2}
        },
        "plural":
        {
            "nominative": {"text": "кошки", "caseRule": 2, "spellingRule": 0},
            "genitive": {"text": "кошек", "caseRule": 3, "spellingRule": 6},
            "accusative": {"text": "кошек", "caseRule": 1},
            "dative": {"text": "кошкам", "caseRule": 2},
            "instrumental": {"text": "кошками", "caseRule": 1},
            "prepositional": {"text": "кошках", "caseRule": 1}
        }
    },
    человек: {
        "singular":
        {
            "nominative": {"text": "человек"},
            "genitive": {"text": "человека", "caseRule": 0},
            "accusative": {"text": "человека", "caseRule": 1},
            "dative": {"text": "человеку", "caseRule": 0},
            "instrumental": {"text": "человеком", "caseRule": 0},
            "prepositional": {"text": "человеке", "caseRule": 0}
        },
        "plural":
        {
            "nominative": {"text": "люди", "caseRule": undefined},
            "genitive": {"text": "людей", "caseRule": undefined},
            "accusative": {"text": "людей", "caseRule": 1},
            "dative": {"text": "людям", "caseRule": undefined},
            "instrumental": {"text": "людьми", "caseRule": undefined},
            "prepositional": {"text": "людях", "caseRule": undefined}
        }
    },
    женщина: {
        "singular":
        {
            "nominative": {"text": "женщина"},
            "genitive": {"text": "женщины", "caseRule": 2},
            "accusative": {"text": "женщину", "caseRule": 4},
            "dative": {"text": "женщине", "caseRule": 2},
            "instrumental": {"text": "женщиной", "caseRule": 3},
            "prepositional": {"text": "женщине", "caseRule": 2}
        },
        "plural":
        {
            "nominative": {"text": "женщины", "caseRule": 2},
            "genitive": {"text": "женщин", "caseRule": 3},
            "accusative": {"text": "женщин", "caseRule": 1},
            "dative": {"text": "женщинам", "caseRule": 2},
            "instrumental": {"text": "женщинами", "caseRule": 1},
            "prepositional": {"text": "женщинах", "caseRule": 1}
        }
    },
    медведь: {
        "singular":
        {
            "nominative": {"text": "медведь"},
            "genitive": {"text": "медведя", "caseRule": 1},
            "accusative": {"text": "медведя", "caseRule": 3},
            "dative": {"text": "медведю", "caseRule": 1},
            "instrumental": {"text": "медведем", "caseRule": 2},
            "prepositional": {"text": "медведе", "caseRule": 1}
        },
        "plural":
        {
            "nominative": {"text": "медведи", "caseRule": 1},
            "genitive": {"text": "медведей", "caseRule": 9},
            "accusative": {"text": "медведей", "caseRule": 1},
            "dative": {"text": "медведям", "caseRule": 1},
            "instrumental": {"text": "медведями", "caseRule": 2},
            "prepositional": {"text": "медведях", "caseRule": 2}
        }
    },
    змея: {
        "singular":
        {
            "nominative": {"text": "змея"},
            "genitive": {"text": "змеи", "caseRule": 3},
            "accusative": {"text": "змею", "caseRule": 5},
            "dative": {"text": "змее", "caseRule": 2},
            "instrumental": {"text": "змеёй", "caseRule": 4},
            "prepositional": {"text": "змее", "caseRule": 2}
        },
        "plural":
        {
            "nominative": {"text": "змеи", "caseRule": 1},
            "genitive": {"text": "змей", "caseRule": 5},
            "accusative": {"text": "змей", "caseRule": 1},
            "dative": {"text": "змеям", "caseRule": 1},
            "instrumental": {"text": "змеями", "caseRule": 2},
            "prepositional": {"text": "змеях", "caseRule": 2}
        }
    },
    врач: {
        "singular":
        {
            "nominative": {"text": "врач"},
            "genitive": {"text": "врача", "caseRule": 0},
            "accusative": {"text": "врача", "caseRule": 1},
            "dative": {"text": "врачу", "caseRule": 0},
            "instrumental": {"text": "врачом", "caseRule": 0},
            "prepositional": {"text": "враче", "caseRule": 0}
        },
        "plural":
        {
            "nominative": {"text": "врачи", "caseRule": 0, "spellingRule": 0},
            "genitive": {"text": "врачей", "caseRule": 2},
            "accusative": {"text": "врачей", "caseRule": 1},
            "dative": {"text": "врачам", "caseRule": 0},
            "instrumental": {"text": "врачами", "caseRule": 0},
            "prepositional": {"text": "врачах", "caseRule": 0}
        }
    },
    чай: {
        "singular":
        {
            "nominative": {"text": "чай"},
            "genitive": {"text": "чая", "caseRule": 1},
            "accusative": {"text": "чая", "caseRule": 2},
            "dative": {"text": "чаю", "caseRule": 1},
            "instrumental": {"text": "чаем", "caseRule": 1},
            "prepositional": {"text": "чае", "caseRule": 2}
        },
        "plural":
        {
            "nominative": {"text": "чаи", "caseRule": 1},
            "genitive": {"text": "чаёв", "caseRule": undefined},
            "accusative": {"text": "чаи", "caseRule": 0},
            "dative": {"text": "чаям", "caseRule": 1},
            "instrumental": {"text": "чаями", "caseRule": 2},
            "prepositional": {"text": "чаях", "caseRule": 2}
        }
    },
    масло: {
        "singular":
        {
            "nominative": {"text": "масло"},
            "genitive": {"text": "масла", "caseRule": 4},
            "accusative": {"text": "масло", "caseRule": 6},
            "dative": {"text": "маслу", "caseRule": 4},
            "instrumental": {"text": "маслом", "caseRule": 6},
            "prepositional": {"text": "масле", "caseRule": 4}
        },
        "plural":
        {
            "nominative": {"text": "масла", "caseRule": 3},
            "genitive": {"text": "масел", "caseRule": 3, "spellingRule": 6},
            "accusative": {"text": "масла", "caseRule": 0},
            "dative": {"text": "маслам", "caseRule": 2},
            "instrumental": {"text": "маслами", "caseRule": 1},
            "prepositional": {"text": "маслах", "caseRule": 1}
        }
    },
    мяч: {
        "singular":
        {
            "nominative": {"text": "мяч"},
            "genitive": {"text": "мяча", "caseRule": 0},
            "accusative": {"text": "мяч", "caseRule": 0},
            "dative": {"text": "мячу", "caseRule": 0},
            "instrumental": {"text": "мячом", "caseRule": 0},
            "prepositional": {"text": "мяче", "caseRule": 0}
        },
        "plural":
        {
            "nominative": {"text": "мячи", "caseRule": 0, "spellingRule": 0},
            "genitive": {"text": "мячей", "caseRule": 2},
            "accusative": {"text": "мячи", "caseRule": 0},
            "dative": {"text": "мячам", "caseRule": 0},
            "instrumental": {"text": "мячами", "caseRule": 0},
            "prepositional": {"text": "мячах", "caseRule": 0}
        }
    },
    дом: {
        "singular":
        {
            "nominative": {"text": "дом"},
            "genitive": {"text": "дома", "caseRule": 0},
            "accusative": {"text": "дом", "caseRule": 0},
            "dative": {"text": "дому", "caseRule": 0},
            "instrumental": {"text": "домом", "caseRule": 0},
            "prepositional": {"text": "доме", "caseRule": 0}
        },
        "plural":
        {
            "nominative": {"text": "дома", "caseRule": undefined},
            "genitive": {"text": "домов", "caseRule": 0},
            "accusative": {"text": "дома", "caseRule": 0},
            "dative": {"text": "домам", "caseRule": 0},
            "instrumental": {"text": "домами", "caseRule": 0},
            "prepositional": {"text": "домах", "caseRule": 0}
        }
    },
    коробка: {
        "singular":
        {
            "nominative": {"text": "коробка"},
            "genitive": {"text": "коробки", "caseRule": 2, "spellingRule": 0},
            "accusative": {"text": "коробку", "caseRule": 4},
            "dative": {"text": "коробке", "caseRule": 2},
            "instrumental": {"text": "коробкой", "caseRule": 3},
            "prepositional": {"text": "коробке", "caseRule": 2}
        },
        "plural":
        {
            "nominative": {"text": "коробки", "caseRule": 2, "spellingRule": 0},
            "genitive": {"text": "коробок", "caseRule": 3, "spellingRule": 6},
            "accusative": {"text": "коробки", "caseRule": 0},
            "dative": {"text": "коробкам", "caseRule": 2},
            "instrumental": {"text": "коробками", "caseRule": 1},
            "prepositional": {"text": "коробках", "caseRule": 1}
        }
    },
    вода: {
        "singular":
        {
            "nominative": {"text": "вода"},
            "genitive": {"text": "воды", "caseRule": 2},
            "accusative": {"text": "воду", "caseRule": 4},
            "dative": {"text": "воде", "caseRule": 2},
            "instrumental": {"text": "водой", "caseRule": 1},
            "prepositional": {"text": "воде", "caseRule": 2}
        },
        "plural":
        {
            "nominative": {"text": "воды", "caseRule": 2},
            "genitive": {"text": "вод", "caseRule": 3},
            "accusative": {"text": "воды", "caseRule": 0},
            "dative": {"text": "водам", "caseRule": 2},
            "instrumental": {"text": "водами", "caseRule": 1},
            "prepositional": {"text": "водах", "caseRule": 1}
        }
    },
    парк: {
        "singular":
        {
            "nominative": {"text": "парк"},
            "genitive": {"text": "парка", "caseRule": 0},
            "accusative": {"text": "парк", "caseRule": 0},
            "dative": {"text": "парку", "caseRule": 0},
            "instrumental": {"text": "парком", "caseRule": 0},
            "prepositional": {"text": "парке", "caseRule": 0}
        },
        "plural":
        {
            "nominative": {"text": "парки", "caseRule": 0, "spellingRule": 0},
            "genitive": {"text": "парков", "caseRule": 0},
            "accusative": {"text": "парки", "caseRule": 0},
            "dative": {"text": "паркам", "caseRule": 0},
            "instrumental": {"text": "парками", "caseRule": 0},
            "prepositional": {"text": "парках", "caseRule": 0}
        }
    },
    тарелка: {
        "singular":
        {
            "nominative": {"text": "тарелка"},
            "genitive": {"text": "тарелки", "caseRule": 2, "spellingRule": 0},
            "accusative": {"text": "тарелку", "caseRule": 4},
            "dative": {"text": "тарелке", "caseRule": 2},
            "instrumental": {"text": "тарелкой", "caseRule": 3},
            "prepositional": {"text": "тарелке", "caseRule": 2}
        },
        "plural":
        {
            "nominative": {"text": "тарелки", "caseRule": 0, "spellingRule": 0},
            "genitive": {"text": "тарелок", "caseRule": 3, "spellingRule": 6},
            "accusative": {"text": "тарелки", "caseRule": 0},
            "dative": {"text": "тарелкам", "caseRule": 2},
            "instrumental": {"text": "тарелками", "caseRule": 1},
            "prepositional": {"text": "тарелках", "caseRule": 1}
        }
    },
    город: {
        "singular":
        {
            "nominative": {"text": "город"},
            "genitive": {"text": "города", "caseRule": 0},
            "accusative": {"text": "город", "caseRule": 0},
            "dative": {"text": "городу", "caseRule": 0},
            "instrumental": {"text": "городом", "caseRule": 0},
            "prepositional": {"text": "городе", "caseRule": 0}
        },
        "plural":
        {
            "nominative": {"text": "города", "caseRule": undefined},
            "genitive": {"text": "городов", "caseRule": 0},
            "accusative": {"text": "города", "caseRule": 0},
            "dative": {"text": "городам", "caseRule": 0},
            "instrumental": {"text": "городами", "caseRule": 0},
            "prepositional": {"text": "городах", "caseRule": 0}
        }
    },
    дерево: {
        "singular":
        {
            "nominative": {"text": "дерево"},
            "genitive": {"text": "дерева", "caseRule": 4},
            "accusative": {"text": "дерево", "caseRule": 6},
            "dative": {"text": "дереву", "caseRule": 4},
            "instrumental": {"text": "деревом", "caseRule": 6},
            "prepositional": {"text": "дереве", "caseRule": 4}
        },
        "plural":
        {
            "nominative": {"text": "деревья", "caseRule": undefined},
            "genitive": {"text": "деревьев", "caseRule": undefined},
            "accusative": {"text": "деревья", "caseRule": 0},
            "dative": {"text": "деревьям", "caseRule": undefined},
            "instrumental": {"text": "деревьями", "caseRule": undefined},
            "prepositional": {"text": "деревьях", "caseRule": undefined}
        }
    },
    шуба: {
        "singular":
        {
            "nominative": {"text": "шуба"},
            "genitive": {"text": "шубы", "caseRule": 2},
            "accusative": {"text": "шубу", "caseRule": 4},
            "dative": {"text": "шубе", "caseRule": 2},
            "instrumental": {"text": "шубой", "caseRule": 3},
            "prepositional": {"text": "шубе", "caseRule": 2}
        },
        "plural":
        {
            "nominative": {"text": "шубы", "caseRule": 2},
            "genitive": {"text": "шуб", "caseRule": 3},
            "accusative": {"text": "шубы", "caseRule": 0},
            "dative": {"text": "шубам", "caseRule": 2},
            "instrumental": {"text": "шубами", "caseRule": 1},
            "prepositional": {"text": "шубах", "caseRule": 1}
        }
    },
    багаж: {
        "singular":
        {
            "nominative": {"text": "багаж"},
            "genitive": {"text": "багажа", "caseRule": 0},
            "accusative": {"text": "багаж", "caseRule": 0},
            "dative": {"text": "багажу", "caseRule": 0},
            "instrumental": {"text": "багажом", "caseRule": 0},
            "prepositional": {"text": "багаже", "caseRule": 0}
        },
        "plural":
        {
            "nominative": {"text": "багажи", "caseRule": 0, "spellingRule": 0},
            "genitive": {"text": "багажей", "caseRule": 2},
            "accusative": {"text": "багажи", "caseRule": 0},
            "dative": {"text": "багажам", "caseRule": 0},
            "instrumental": {"text": "багажами", "caseRule": 0},
            "prepositional": {"text": "багажах", "caseRule": 0}
        }
    }
};

const ANIMATE_NOUNS = [
    NOUNS.собака,
    NOUNS.кошка,
    NOUNS.человек,
    NOUNS.женщина,
    NOUNS.медведь,
    NOUNS.змея,
    NOUNS.врач,
];

const INANIMATE_NOUNS = [
    NOUNS.чай,
    NOUNS.масло,
    NOUNS.мяч,
    NOUNS.дом,
    NOUNS.коробка,
    NOUNS.вода,
    NOUNS.парк,
    NOUNS.тарелка,
    NOUNS.город,
    NOUNS.дерево,
    NOUNS.шуба,
    NOUNS.багаж,
];

export class Noun {
    constructor(json) {
        this._json = json;
    }

    getRandomCase(excludeCases=undefined, plural: boolean) {

        // Use singular here as the result is the same for singular or plural
        let availableCases = Object.keys(this._json.singular);

        // Exclude cases if requested
        if (excludeCases != undefined) {
            availableCases = availableCases.filter(function(element) {
                return excludeCases.indexOf(element) < 0;
            });
        }

        // Randomly choose the case
        const chosenCaseKey = availableCases[Math.floor(Math.random() * availableCases.length)];

        let chosenCase = "";
        if (plural) {
            chosenCase = this._json.plural[chosenCaseKey];
        } else {
            chosenCase = this._json.singular[chosenCaseKey]
        }

        return [chosenCaseKey, chosenCase];
    }

    getSingularDeclensions() { return this._json.singular; }

    getSingularDeclension(caseKey: string) {
        return this._json.singular[caseKey];
    }

    getPluralDeclensions() { return this._json.plural; }

    getPluralDeclension(caseKey: string) {
        return this._json.plural[caseKey];
    }

    /**
     * Returns an array of randomly chosen declensions for this noun, all of which are incorrect for
     * the given phrase.substitution.
     */
     getRandomDeclensions(numDeclensions: number, excludeCase: string) {
        // Pick two cases at random, exclude the correct case
        let availableCases: string[] =
            Object.keys(this._json.singular).filter(word => word !== excludeCase);

        let incorrectChoices = [];
        for (let idx = 0; idx < numDeclensions; idx++) {
            // Choose a case at random
            const caseIdx = Math.floor(Math.random() * availableCases.length);
            if (Math.random() < 0.5) {
                incorrectChoices.push(this._json.singular[availableCases[caseIdx]].text);
            } else {
                incorrectChoices.push(this._json.plural[availableCases[caseIdx]].text);
            }

            // Remove the chosen case from the options
            availableCases = availableCases.slice(caseIdx);
        }

        return incorrectChoices;
    }

    static getRandomNoun(nounsSource=NOUNS) {
        const keys = Object.keys(nounsSource);
        const chosenKey = keys[Math.floor(Math.random() * keys.length)];
        return new Noun(nounsSource[chosenKey]);
    }
}

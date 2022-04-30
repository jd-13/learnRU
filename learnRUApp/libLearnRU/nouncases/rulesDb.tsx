export const CASE_RULES = {
    // TODO: remove use of masculine/feminine/neuter in rules
    "genitive": [
        /*0*/"For masculine nouns ending in a consonant, add а",
        /*1*/"For masculine nouns ending in й or ь, replace with я",
        /*2*/"For feminine nouns ending in а, replace with ы",
        /*3*/"For feminine nouns ending in я or ь, replace with и",
        /*4*/"For neuter nouns ending in о, replace with а",
        /*5*/"For neuter nouns ending in е, replace with я"
    ],
    "accusative": [
        /*0*/"For inanimate masculine nouns there is no change",
        /*1*/"For animate masculine nouns ending in a consonant, add а",
        /*2*/"For animate masculine nouns ending in й, replace with я",
        /*3*/"For animate masculine nouns ending in ь, replace with я",
        /*4*/"For feminine nouns ending in а, replace with у",
        /*5*/"For feminine nouns ending in я, replace with ю",
        /*6*/"For inanimate neuter nouns there is no change"
    ],
    "dative": [
        /*0*/"For masculine nouns ending in a consonant, add у",
        /*1*/"For masculine nouns ending in й or ь, replace with ю",
        /*2*/"For feminine nouns ending in а or я, replace with е",
        /*3*/"For feminine nouns ending in ь, replace with и",
        /*4*/"For neuter nouns ending in о, replace with у",
        /*5*/"For neuter nouns ending in е, replace with ю"
    ],
    "instrumental": [
        /*0*/"For masculine nouns ending in a consonant (except й), add ом",
        /*1*/"For masculine nouns ending in й, replace with eм (ём if stressed)",
        /*2*/"For masculing nouns ending in ь, replace with ем (ём if stressed)",
        /*3*/"For feminine nouns ending in а, replace with ой (or rarely ою)",
        /*4*/"For feminine nouns ending in я, replace with ей (ёй if stressed)",
        /*5*/"For feminine nouns ending in ь, add ю",
        /*6*/"For neuter nouns add м"
    ],
    "prepositional": [
        /*0*/"For nouns ending in a consonant, add е",
        /*1*/"For nouns ending in ь (masculine), replace with е",
        /*2*/"For nouns ending in а, я or й, replace with е",
        /*3*/"For nouns ending in ь (feminine), replace with и",
        /*4*/"For nouns ending in о, replace with е",
        /*5*/"For nouns ending in ия, ий, or ие, replace with ии"
    ]
};

export const PLURAL_RULES = {
    "nominative": [
        /*0*/"For nouns ending in a consonant, add ы",
        /*1*/"For nouns ending in й, я, or ь, replace with и",
        /*2*/"For nouns ending in а, replace with ы",
        /*3*/"For nouns ending in о, replace with а",
        /*4*/"For nouns ending in е, replace with я"
    ],

    "genitive": [
        /*0*/"For nouns ending in a consonant (except ж, ч, ш, щ), add ов",
        /*1*/"For nouns ending in й or ц, add ев",
        /*2*/"For nouns ending in ж, ч, ш, or щ, add ей",
        /*3*/"For nouns ending in а, remove а",
        /*4*/"For nouns ending in a consonant followed by я, replace я with ь",
        /*5*/"For nouns ending in a vowel followed by я, replace я with й",
        /*6*/"For nouns ending in о, remove о",
        /*7*/"For nouns ending in е, add й",
        /*8*/"For nouns ending in ие, replace е with й",
        /*9*/"For nouns ending ь, replace with ей",

    ],

    // TODO: there might be a better way to explain this, as the user might not know the
    // nominative and genitive rules
    "accusative": [
        /*0*/"For inanimate nouns, the accusative plural declension is the same as the nominative plural",
        /*1*/"For animate nouns, the accusative plural declension is the same as the genitive plural"
    ],

    "dative": [
        /*0*/"For nouns ending in a consonant, add ам",
        /*1*/"For nouns ending in й, ь, е, or я, replace with ям",
        /*2*/"For nouns ending in а or о, replace with ам",
    ],

    "instrumental": [
        /*0*/"For nouns ending in a consonant, add ами",
        /*1*/"For nouns ending in а or о, replace with ами",
        /*2*/"For nouns ending in й, ь, е, or я, replace with ями"
    ],

    "prepositional": [
        /*0*/"For nouns ending in a consonant, add ах",
        /*1*/"For nouns ending in а or о, replace with ах",
        /*2*/"For nouns ending in й, ь, е, or я, replace with ях"
    ]
};

export const SPELLING_RULES = [
    // Spelling rules for most cases
    /*0*/"Except here this would put ы after one of 'г, к, х, ж, ч, ш, щ', so instead use и",
    /*1*/"Except here this would put an unstressed о after one of 'ж, ч, ш, щ, ц', so instead use е",
    /*2*/"Except here this would put я after one of 'г, к, х, ж, ч, ш, щ, ц', so instead use а",
    /*3*/"Except here this would put ю after one of 'г, к, х, ж, ч, ш, щ, ц', so instead use у",

    // Spelling rules for instrumental case
    /*4*/"Except here this would put ом after one of 'ж, ч, ш, щ, ц', so instead use ем",
    /*5*/"Except here this would put ой after one of 'ж, ч, ш, щ, ц', so instead use ей",

    // Spelling rule for feminine genitive plural
    /*6*/"Except here an о or е is added before the last letter to aid pronunciation",
];

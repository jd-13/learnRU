export class EnabledCases {
    nominative: boolean;
    genitive: boolean;
    accusative: boolean;
    dative: boolean;
    instrumental: boolean;
    prepositional: boolean;

    singular: boolean;
    plural: boolean;

    nouns: boolean;
    pronouns: boolean;

    constructor() {
        this.nominative = true;
        this.genitive = true;
        this.accusative = true;
        this.dative = true;
        this.instrumental = true;
        this.prepositional = true;

        this.singular = true;
        this.plural = true;

        this.nouns = true;
        this.pronouns = true;
    }
};

export const enabledCasesIsValid = (enabledCases: EnabledCases) => {
    if (enabledCases.nominative && enabledCases.plural && enabledCases.nouns && !enabledCases.pronouns) {
        // Just having nominative is enough if we have plural enabled and only nouns
        return true;
    } else {
        return (enabledCases.genitive ||
                enabledCases.accusative ||
                enabledCases.dative ||
                enabledCases.instrumental ||
                enabledCases.prepositional) &&
               (enabledCases.singular ||
                enabledCases.plural) &&
               (enabledCases.nouns ||
                enabledCases.pronouns);
    }

};

export const getAvailableCasesList = (enabledCases: EnabledCases, usePlural: boolean) => {
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

    // Nominative may be available for plural
    if (usePlural && enabledCases.nominative) {
        availableCases.push("nominative");
    }

    return availableCases;
};

export const getExcludedCasesList = (enabledCases: EnabledCases) => {
    let excludedCases: string[] = ["nominative"];
    if (!enabledCases.genitive) {
        excludedCases.push("genitive");
    }

    if (!enabledCases.accusative) {
        excludedCases.push("accusative");
    }

    if (!enabledCases.dative) {
        excludedCases.push("dative");
    }

    if (!enabledCases.instrumental) {
        excludedCases.push("instrumental");
    }

    if (!enabledCases.prepositional) {
        excludedCases.push("prepositional");
    }

    return excludedCases;
};

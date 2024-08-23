export enum LanguageLevel {
    Beginner = 'Beginner',
    UpperBeginner = 'UpperBeginner',
    Intermediary = 'Intermediary',
    UpperIntermediary = 'UpperIntermediary',
    Advanced = "Advanced",
    Fluent = "Fluent"
}

export enum AppLanguage {
    Japanese = 'Japanese',
    European = 'European'
}

type LanguageLevelMatch = Record<LanguageLevel, string>;

type LevelType = Record<AppLanguage, LanguageLevelMatch>;

export const languageLevelDefinition: LevelType = {
    [AppLanguage.Japanese]: {
        [LanguageLevel.Beginner]: "N5",
        [LanguageLevel.UpperBeginner]: "N4",
        [LanguageLevel.Intermediary]: "N3",
        [LanguageLevel.UpperIntermediary]: "N2",
        [LanguageLevel.Advanced]: "N1",
        [LanguageLevel.Fluent]: "N1"
    },
    [AppLanguage.European]: {
        [LanguageLevel.Beginner]: "A1",
        [LanguageLevel.UpperBeginner]: "A2",
        [LanguageLevel.Intermediary]: "B1",
        [LanguageLevel.UpperIntermediary]: "B2",
        [LanguageLevel.Advanced]: "C1",
        [LanguageLevel.Fluent]: "C2"
    },
}

export const LanguageLevelColour: LevelType = {
    [AppLanguage.Japanese]: {
        [LanguageLevel.Beginner]: "bg-red-300",
        [LanguageLevel.UpperBeginner]: "bg-red-500",
        [LanguageLevel.Intermediary]: "bg-amber-300",
        [LanguageLevel.UpperIntermediary]: "bg-amber-500",
        [LanguageLevel.Advanced]: "bg-green-300",
        [LanguageLevel.Fluent]: "bg-green-300"
    },
    [AppLanguage.European]: {
        [LanguageLevel.Beginner]: "bg-red-300",
        [LanguageLevel.UpperBeginner]: "bg-red-500",
        [LanguageLevel.Intermediary]: "bg-amber-300",
        [LanguageLevel.UpperIntermediary]: "bg-amber-500",
        [LanguageLevel.Advanced]: "bg-green-300",
        [LanguageLevel.Fluent]: "bg-green-500"
    },
}
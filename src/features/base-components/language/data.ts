import { LanguageProficienyLevel, LevelLanguage } from "@/types";

type LanguageLevelMatch = Record<LanguageProficienyLevel, string>;

type LevelType = Record<LevelLanguage, LanguageLevelMatch>;

export const languageLevelDefinition: LevelType = {
    [LevelLanguage.Japanese]: {
        [LanguageProficienyLevel.Beginner]: "N5",
        [LanguageProficienyLevel.UpperBeginner]: "N4",
        [LanguageProficienyLevel.Intermediary]: "N3",
        [LanguageProficienyLevel.UpperIntermediary]: "N2",
        [LanguageProficienyLevel.Advanced]: "N1",
        [LanguageProficienyLevel.Fluent]: "N1"
    },
    [LevelLanguage.European]: {
        [LanguageProficienyLevel.Beginner]: "A1",
        [LanguageProficienyLevel.UpperBeginner]: "A2",
        [LanguageProficienyLevel.Intermediary]: "B1",
        [LanguageProficienyLevel.UpperIntermediary]: "B2",
        [LanguageProficienyLevel.Advanced]: "C1",
        [LanguageProficienyLevel.Fluent]: "C2"
    },
}

export const LanguageLevelColour: LevelType = {
    [LevelLanguage.Japanese]: {
        [LanguageProficienyLevel.Beginner]: "bg-red-300",
        [LanguageProficienyLevel.UpperBeginner]: "bg-red-500",
        [LanguageProficienyLevel.Intermediary]: "bg-amber-300",
        [LanguageProficienyLevel.UpperIntermediary]: "bg-amber-500",
        [LanguageProficienyLevel.Advanced]: "bg-green-300",
        [LanguageProficienyLevel.Fluent]: "bg-green-300"
    },
    [LevelLanguage.European]: {
        [LanguageProficienyLevel.Beginner]: "bg-red-300",
        [LanguageProficienyLevel.UpperBeginner]: "bg-red-500",
        [LanguageProficienyLevel.Intermediary]: "bg-amber-300",
        [LanguageProficienyLevel.UpperIntermediary]: "bg-amber-500",
        [LanguageProficienyLevel.Advanced]: "bg-green-300",
        [LanguageProficienyLevel.Fluent]: "bg-green-500"
    },
}
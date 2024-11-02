import getLangConfig from "./langConfig";
import { AppLanguage, LevelLanguage } from "./types";

describe("getLangConfig", () => {
  it("should return the default language configuration for 'de'", () => {
    const result = getLangConfig();

    expect(result).toEqual({
      langCode: "de",
      language: AppLanguage.German,
      levelLanguage: LevelLanguage.European,
    });
  });

  it("should return the language configuration for 'fr'", () => {
    const result = getLangConfig("fr");

    expect(result).toEqual({
      langCode: "fr",
      language: AppLanguage.French,
      levelLanguage: LevelLanguage.European,
    });
  });

  it("should return the language configuration for 'jp'", () => {
    const result = getLangConfig("jp");

    expect(result).toEqual({
      langCode: "jp",
      language: AppLanguage.Japanese,
      levelLanguage: AppLanguage.Japanese, // 'jp' should return its language as LevelLanguage
    });
  });
});
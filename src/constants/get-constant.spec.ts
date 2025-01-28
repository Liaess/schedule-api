import { getConstant } from './get-constant';
import { LANGUAGES, LANG_DOCS } from './languages';
import * as lang from './languages';

jest.mock('./en_US/users', () => ({
  __esModule: true,
  USER: {
    NAME_MUST_BE_STRING: 'Name must be a string',
  },
}));

jest.mock('./pt_BR/users', () => ({
  __esModule: true,
  USER: {
    NAME_MUST_BE_STRING: 'Nome deve ser uma string',
  },
}));

describe('getConstant', () => {
  describe('English tests', () => {
    it('should return "english summary" when the key is HELLO_WORLD_SUMMARY and the lang is not passed', () => {
      expect(getConstant().USER.NAME_MUST_BE_STRING).toBe(
        'Name must be a string',
      );
    });

    it('should return "portuguese summary" when the key is HELLO_WORLD_SUMMARY and the lang passed is en_US', () => {
      expect(getConstant(LANGUAGES.EN_US).USER.NAME_MUST_BE_STRING).toBe(
        'Name must be a string',
      );
    });
  });

  describe('Portuguese tests', () => {
    it('should return "portuguese summary" when the key is HELLO_WORLD_SUMMARY and the lang passed is pt_BR', () => {
      expect(getConstant(LANGUAGES.PT_BR).USER.NAME_MUST_BE_STRING).toBe(
        'Nome deve ser uma string',
      );
    });
  });

  describe('when getConstant has been called and getLanguage return LANG_DOCS', () => {
    it('then language should be set to LANGUAGES.EN_US', () => {
      jest.spyOn(lang, 'getLanguage').mockReturnValue(LANG_DOCS);
      expect(getConstant(LANGUAGES.EN_US).USER.NAME_MUST_BE_STRING).toBe(
        'Name must be a string',
      );
    });
  });
});

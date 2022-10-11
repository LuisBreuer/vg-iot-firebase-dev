import {describe, expect, test} from '@jest/globals';
import { parseKeys } from './translator';

describe('translator tests', () => {
    beforeEach(async () => {

    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should transform bracket keys to dot keys', async () => {
        const mockTranslationKey = "test.test1.test2"
        const mockLocaleTranslation = {
            "test": {
                "test1": {
                    "test2": "That should work",
                    }
                }
            }
        const parsedKey = parseKeys(mockTranslationKey,mockLocaleTranslation)
        expect(parsedKey).toEqual("That should work")
    })
})
import * as translator from './translator';
import {expect} from "@jest/globals";

// TODO: Funktionen modularer aufbauen, um Testbarkeit zu verbessern

/*jest.mock('./translator', () => ({
    parseKeys: jest.fn().mockImplementation(() => {return "zzw"}),
}));*/

describe('translator tests', () => {
    function setupFetchStub(data) {
        return function fetchStub(_url) {
            return new Promise((resolve) => {
                resolve({
                    json: () =>
                        Promise.resolve({
                            data,
                        }),
                })
            })
        }
    }

    it('should translate an element', async () => {
        const mockElement = document.createElement('p')
        mockElement.innerText = "should be translated"
        mockElement.setAttribute("data-i18n-key","common.email")
        document.body.appendChild(mockElement)

        translator.translateElement(mockElement)

        expect(mockElement.innerText).toEqual("E-mail")
    })

    it('should translate all elements on the DOM', async () => {
        const mockElement = document.createElement('p')
        mockElement.innerText = "should be translated"
        mockElement.setAttribute("data-i18n-key","common.email")
        document.body.appendChild(mockElement)

        translator.translatePage()

        expect(mockElement.innerText).toEqual("E-mail")
    })

    it('should set the new locale', async () => {
        const fakeData = {
            "translation": {
                "common": {
                    "email": "That should work",
                }
            }
        }
        global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData))

        await translator.setLocale("de_DE")

        expect(translator.locale).toEqual("de_DE")
        expect(translator.locale_translation.data).toEqual(fakeData)
        global.fetch.mockClear()
    })

    it('should set the initial value of language switcher', async () => {
        const mockElement = document.createElement('select')
        mockElement.setAttribute("data-i18n-switcher", '')

        const selectOptionEN = document.createElement("option")
        selectOptionEN.value = "en"
        const selectOptionDE = document.createElement("option")
        selectOptionDE.value = "de_DE"

        mockElement.appendChild(selectOptionEN)
        mockElement.appendChild(selectOptionDE)
        document.body.appendChild(mockElement)

        expect(mockElement.value).toEqual("en")

        translator.bindLocaleSwitcher("de_DE")

        expect(mockElement.value).toEqual("de_DE")
    })

    it('should transform dot keys to bracket keys', async () => {
        const mockTranslationKey = "test.test1.test2"
        const mockLocaleTranslation = {
            "test": {
                "test1": {
                    "test2": "That should work",
                    }
                }
            }
        const parsedKey = translator.parseKeys(mockTranslationKey, mockLocaleTranslation)
        expect(parsedKey).toEqual("That should work")
    })

    it('should fetch a file', async () => {
        const fakeData = {
            "test": {
                "test1": {
                    "test2": "That should work",
                }
            }
        }
        global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData))

        const translationFile = await translator.fetchTranslationsFor("en")

        expect(Array.isArray(translationFile)).toEqual(false)
        expect(translationFile.data).toEqual(fakeData)

    })
})
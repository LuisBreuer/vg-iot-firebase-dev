import locales from "./i18n/en.json" assert { type: "json" }

let default_locale = "en";
let locale
let locale_translation

const userLang = navigator.language;
console.log("Preferred language: "+ userLang)

locale_translation = locales

// default_locale = userLang ? userLang : default_locale

document.addEventListener("DOMContentLoaded", () => {
    setLocale(default_locale);
    bindLocaleSwitcher(default_locale);
});

function parseKeys(path, obj=self, separator='.') {
    var properties = Array.isArray(path) ? path : path.split(separator)
    return properties.reduce((prev, curr) => prev?.[curr], obj)
}

async function fetchTranslationsFor(newLocale) {
    const response = await fetch(`./i18n/${newLocale}.json`);
    return await response.json();
}

async function setLocale(newLocale) {
    if (newLocale === locale) return;
    const newTranslations =
        await fetchTranslationsFor(newLocale);
    locale = newLocale;
    locale_translation = newTranslations;
    translatePage();
}

function translateElement(element) {
    const key = element.getAttribute("data-i18n-key");
    const translation = parseKeys(`translation.${key}`, locale_translation)
    element.innerText = translation;
}

function translatePage() {
    document
        .querySelectorAll("[data-i18n-key]")
        .forEach(translateElement);
}

function bindLocaleSwitcher(initialValue) {
    const switcher =
        document.querySelector("[data-i18n-switcher]");
    switcher.value = initialValue;
    switcher.onchange = (e) => {
        setLocale(e.target.value).then(r => "Selected Language Changed");
    };
}
// Soll die präferierte Browser language abgefragt werden und die Seite danach übersetzt werden?
// Test (Jest)?
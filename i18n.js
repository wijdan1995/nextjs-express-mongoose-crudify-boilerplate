const NextI18Next = require('next-i18next').default


const localeSubpathVariations = {
    none: {},
    foreign: {
        ar: 'ar',
    },
    all: {
        en: 'en',
        ar: 'ar',
    },
}

module.exports = new NextI18Next({
    otherLanguages: ['ar'],
    localeSubpaths: localeSubpathVariations['all'],
})
export const getLang = () => process.browser && localStorage.getItem('lang')
const setLang = (lang) => process.browser && localStorage.setItem('lang', lang)

export const state = () => ({
    lang: getLang() || ''
})

export const mutations = {
    changeLocal (state, lang) {
        state.lang = lang
        setLang(lang)
    }
}

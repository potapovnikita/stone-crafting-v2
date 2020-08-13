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
const gulp = require('gulp');
const GulpSSH = require('gulp-ssh')

const config = {
    host: '31.31.196.159',
    port: 22,
    username: 'u0507339',
    password: 's!Q2L6zE',
}

const gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
})

gulp.task('deploy:production', function () {
    return gulp
        .src(['dist/**/*'])
        .pipe(gulpSSH.dest('www/stone-crafting.com/'))
})

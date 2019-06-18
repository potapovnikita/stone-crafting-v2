export const state = () => ({
    load: true
})

export const mutations = {
    offLoad (state) {
        state.load = false
    }
}

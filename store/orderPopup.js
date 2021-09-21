export const state = () => ({
    isOpened: false,
    type: null,
})

export const mutations = {
    onClose (state) {
        state.isOpened = false
        state.type = null
    },
    onOpen (state, type) {
        state.isOpened = true
        state.type = type
    }
}

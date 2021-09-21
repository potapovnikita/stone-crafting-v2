export const state = () => ({
    isOpened: false,
    type: null,
    statusSuccess: false,
})

export const mutations = {
    onClose (state) {
        state.isOpened = false
        state.type = null
        state.statusSuccess = false
    },
    onOpen (state, type) {
        state.isOpened = true
        state.type = type
    },
    setSuccessStatus (state, status) {
        state.statusSuccess = status
    },
}

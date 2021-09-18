export const state = () => ({
    isOpened: false
})

export const mutations = {
    onClose (state) {
        state.isOpened = false
    },
    onOpen (state) {
        state.isOpened = true
    }
}

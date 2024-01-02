export default {
    namespaced: true,
    state: () => ({
        collapse: ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'].some(keyword => navigator.userAgent.includes(keyword)),
    }),
    mutations: {
        changeCollapse(state) {
            state.collapse = !state.collapse
        }
    },
    actions: {}
}

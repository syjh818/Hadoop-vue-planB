const height = window.innerHeight - 58 //-58去除顶栏后高度
const isMobile = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'].some(keyword => navigator.userAgent.includes(keyword))
let isAdmin = false
export default {
    namespaced: true, state: () => ({
        isMobile: isMobile,
        isAdmin: isAdmin,
        height: height,
        width: window.innerWidth,
        containerStyle: {'padding-top': height * 0.03 + 'px'},
        headerStyle: isMobile ? isAdmin ? {'height': height * 0.15 + 'px', 'box-sizing': 'border-box'} : {
            'height': height * 0.05 + 'px', 'box-sizing': 'border-box'
        } : {'height': height * 0.05 + 'px', 'box-sizing': 'border-box'},
        mainStyle: isMobile ? isAdmin ? {'height': height * 0.82 + 'px', 'box-sizing': 'border-box'} : {
            'height': height * 0.92 + 'px', 'box-sizing': 'border-box'
        } : {'height': height * 0.92 + 'px', 'box-sizing': 'border-box'},
        tableHeight: isMobile ? isAdmin ? height * 0.77 - 40 + 'px' : height * 0.87 - 40 + 'px' : height * 0.87 - 40 + 'px',
        tableContainerHeight: (isMobile ? isAdmin ? height * 0.77 - 40 : height * 0.87 - 40 : height * 0.87 - 40) - 40, //，40的表头高度
        chartStyle: isMobile ? {
            'width': window.innerWidth - 64 + 'px',
            'height': height * 0.82 / 2 + 'px'
        } : {'width': (window.innerWidth - 150) / 2 + 'px', 'height': height * 0.92 / 2 + 'px'},
        paginationStyle: {
            'height': height * 0.05 + 'px', 'padding-top': height * 0.01 + 'px', 'box-sizing': 'border-box'
        }
    }), mutations: {
        updateHeight(state, height) {
            state.height = height
            state.containerStyle = {'padding-top': height * 0.03 + 'px'}
            state.paginationStyle = {
                'height': height * 0.05 + 'px', 'padding-top': height * 0.01 + 'px', 'box-sizing': 'border-box'
            }
            state.headerStyle = isMobile ? isAdmin ? {'height': height * 0.15 + 'px', 'box-sizing': 'border-box'} : {
                'height': height * 0.05 + 'px', 'box-sizing': 'border-box'
            } : {'height': height * 0.05 + 'px', 'box-sizing': 'border-box'}
            state.mainStyle = isMobile ? isAdmin ? {'height': height * 0.82 + 'px', 'box-sizing': 'border-box'} : {
                'height': height * 0.92 + 'px', 'box-sizing': 'border-box'
            } : {'height': height * 0.92 + 'px', 'box-sizing': 'border-box'}
            state.tableHeight = isMobile ? isAdmin ? height * 0.77 - 40 + 'px' : height * 0.87 - 40 + 'px' : height * 0.87 - 40 + 'px'

        }, updateAdminStatus(state, adminStatus) {
            isAdmin = adminStatus
            state.headerStyle = isMobile ? adminStatus ? {
                'height': height * 0.15 + 'px',
                'box-sizing': 'border-box'
            } : {
                'height': height * 0.05 + 'px', 'box-sizing': 'border-box'
            } : {'height': height * 0.05 + 'px', 'box-sizing': 'border-box'}
            state.mainStyle = isMobile ? adminStatus ? {'height': height * 0.82 + 'px', 'box-sizing': 'border-box'} : {
                'height': height * 0.92 + 'px', 'box-sizing': 'border-box'
            } : {'height': height * 0.92 + 'px', 'box-sizing': 'border-box'}
            state.tableHeight = isMobile ? adminStatus ? height * 0.77 - 40 + 'px' : height * 0.87 - 40 + 'px' : height * 0.87 - 40 + 'px'
        }
    }, actions: {}
}

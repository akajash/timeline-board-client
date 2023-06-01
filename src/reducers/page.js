const pageState = {
    page: 1,
    totalPages: 0
}

export default (page = pageState, action) => {
    switch (action.type) {
        case 'SET_PAGE':
            return {
                ...pageState,
                page: action.payload.page,
                totalPages: action.payload.totalPages
            }
                
        default:
            return page
    }
}
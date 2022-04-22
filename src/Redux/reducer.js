export const allcoinsReducer = (state = { coinsLists: [], }, action) => {
    switch (action.type) {
        case "GET_ALL_COINS_REQUEST":
            return { loading: true }
        case "GET_ALL_COINS_SUCCESS":
            return { loading: false, success: true, coinsLists: action.payload }
        case "GET_ALL_COINS_FAILED":
            return { loading: false, success: false, error: action.payload }
        default:
            return state;
    }
}
export const trendCoinsReducer = (state = { trending: [], }, action) => {
    switch (action.type) {
        case 'GET_TREND_COINS_REQUEST':
            return { loading: true }
        case "GET_TREND_COINS_SUCCESS":
            return { loading: false, success: true, trending: action.payload }
        case "GET_TREND_COINS_FAILED":
            return { loading: false, success: false, error: action.payload }
        default:
            return state;
    }
}
export const coinReducer = (state = { coin: {} }, action) => {
    switch (action.type) {
        case 'COIN_REQUEST':
            return { loading: true }
        case 'COIN_SUCCESS':
            return { loading: false, success: true, coin: action.payload }
        case 'COIN_FAILED':
            return { loading: false, success: false, error: action.payload }
        default:
            return state;
    }
}
export const coinInfoReducer = (state = { coinInfo: {} }, action) => {
    switch (action.type) {
        case "COIN_INFO_REQUEST":
            return { loading: true }
        case "COIN_INFO_SECCESS":
            return { loading: false, success: true, coinInfo: action.payload }
        case "COIN_INFO_FAILED":
            return { loading: false, success: false, error: action.payload }
        default:
            return state;
    }
}
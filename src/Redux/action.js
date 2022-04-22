import axios from "axios";
export const tendCoinsAction = () => async (dispatch) => {
    try {
        dispatch({ type: 'GET_TREND_COINS_REQUEST' })
        const { data } = await axios.get
            ('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h')
        dispatch({ type: 'GET_TREND_COINS_SUCCESS', payload: data })
    } catch (error) {
        dispatch({
            type: 'GET_TREND_COINS_FAILED', payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}
export const allcoinsAction = () => async (dispatch) => {
    try {
        dispatch({ type: "GET_ALL_COINS_REQUEST" })
        const { data } = await axios.get
            ('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        dispatch({ type: "GET_ALL_COINS_SUCCESS", payload: data })
    } catch (error) {
        dispatch({
            type: "GET_ALL_COINS_FAILED", payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })

    }
}
export const coinAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'COIN_REQUEST' })
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
        dispatch({ type: "COIN_SUCCESS", payload: data })
    } catch (error) {
        dispatch({
            type: "COIN_FAILED", payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}
export const coinInfoAction = (id, days) => async (dispatch) => {
    try {
        dispatch({ type: "COIN_INFO_REQUEST" })
        const { data } = await axios.get
            (`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`)
        dispatch({ type: "COIN_INFO_SECCESS", payload: data })
    } catch (error) {
        dispatch({
            type: "COIN_INFO_FAILED", payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { coinInfoAction } from '../Redux/action'
import { Line } from "react-chartjs-2";
import {
    CircularProgress,
    createTheme,
    makeStyles,
    ThemeProvider,
} from "@material-ui/core";


function CoinInfo() {
    const [days, setDays] = useState(1);
    const { id } = useParams()
    const dispatch = useDispatch()
    const { loading, success, error, coinInfo } = useSelector(store => store.coinInformaion)
    useEffect(() => {
        dispatch(coinInfoAction(id))
    }, [dispatch, id])
    console.log(coinInfo)
    const useStyles = makeStyles((theme) => ({
        container: {
            width: "75%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            padding: 40,
            [theme.breakpoints.down("md")]: {
                width: "100%",
                marginTop: 0,
                padding: 20,
                paddingTop: 0,
            },
        },
    }));
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });
    const classes = useStyles();
    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {loading ? (<CircularProgress
                    style={{ color: "gold" }}
                    size={250}
                    thickness={1}
                />) : success ? (<>

                    <Line
                        data={{
                            labels: coinInfo.price.map((coin) => {
                                let date = new Date(coin[0]);
                                let time =
                                    date.getHours() > 12
                                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                        : `${date.getHours()}:${date.getMinutes()} AM`;
                                return days === 1 ? time : date.toLocaleDateString();
                            }),

                            datasets: [
                                {
                                    data: coinInfo.prices.map((coin) => coin[1]),
                                    label: `Price ( Past ${days} Days ) in usd`,
                                    borderColor: "#EEBC1D",
                                },
                            ],
                        }}
                        options={{
                            elements: {
                                point: {
                                    radius: 1,
                                },
                            },
                        }}
                    />


                </>) : error ? (<p>{error}</p>) : (<></>)}
            </div>
        </ThemeProvider>

    )
}

export default CoinInfo
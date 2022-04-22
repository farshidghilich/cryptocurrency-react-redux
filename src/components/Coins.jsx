import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
    Container,
    createTheme,
    TableCell,
    LinearProgress,
    ThemeProvider,
    Typography,
    TextField,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    Table,
    Paper,
} from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux'
import { allcoinsAction } from '../Redux/action'
import { useNavigate } from "react-router-dom";
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function Coins() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const dispatch = useDispatch()
    const { coinsLists, loading, error, success } = useSelector(store => store.coinList)
    useEffect(() => {
        dispatch(allcoinsAction())
    }, [dispatch])
    console.log(coinsLists)
    const useStyles = makeStyles({
        row: {
            backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#131111",
            },
            fontFamily: "Montserrat",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "gold",
            },
        },
    });

    const classes = useStyles();
    const navigate = useNavigate()

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography
                    variant="h4"
                    style={{ margin: 18, fontFamily: "Montserrat" }}
                >
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField
                    label="Search For a Crypto Currency.."
                    variant="outlined"
                    style={{ marginBottom: 20, width: "100%" }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer component={Paper}>
                    {loading ? (
                        <LinearProgress style={{ backgroundColor: "gold" }} />
                    ) : (<Table aria-label="simple table">
                        <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                    <TableCell
                                        style={{
                                            color: "black",
                                            fontWeight: "700",
                                            fontFamily: "Montserrat",
                                        }}
                                        key={head}
                                        align={head === "Coin" ? "" : "right"}
                                    >
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (<LinearProgress style={{ backgroundColor: "gold" }} />) : success ? (
                                <>{coinsLists.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
                                    .map((coins) => {
                                        const profit = coins.price_change_percentage_24h > 0;
                                        return (<TableRow
                                            onClick={() => navigate(`/coins/${coins.id}`)}
                                            className={classes.coins}
                                            key={coins.name}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                style={{
                                                    display: "flex",
                                                    gap: 15,
                                                    cursor: "pointer"
                                                }}
                                            >
                                                <img
                                                    src={coins.image}
                                                    alt={coins.name}
                                                    height="50"
                                                    style={{ marginBottom: 10, cursor: "pointer" }}
                                                />
                                                <div
                                                    style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
                                                >
                                                    <span
                                                        style={{
                                                            textTransform: "uppercase",
                                                            fontSize: 22,
                                                        }}
                                                    >
                                                        {coins.symbol}
                                                    </span>
                                                    <span style={{ color: "darkgrey", cursor: "pointer" }}>
                                                        {coins.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right" style={{ cursor: "pointer" }}>

                                                {numberWithCommas(coins.current_price.toFixed(2))} {""}
                                                USD
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                style={{
                                                    cursor: "pointer",
                                                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {profit && "+"}
                                                {coins.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>
                                            <TableCell align="right">
                                                {coins.symbol}{" "}
                                                {numberWithCommas(
                                                    coins.market_cap.toString().slice(0, -6)
                                                )}
                                                M
                                            </TableCell>
                                        </TableRow>)
                                    })}</>

                            ) : error ? (<p>{error}</p>) : (<></>)}

                        </TableBody>
                    </Table>)}
                </TableContainer>
            </Container>
        </ThemeProvider>

    )
}

export default Coins
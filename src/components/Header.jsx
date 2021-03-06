import {
    AppBar,
    Container,
    MenuItem,
    Select,
    Toolbar,
    Typography,
} from "@material-ui/core";
import {
    createTheme,
    makeStyles,
    ThemeProvider,
} from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
;

const useStyles = makeStyles((theme) => ({
    title: {
        flex: 1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    },
}));

const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#000",
        },
        type: "dark",
    },
});

function Header() {
    const classes = useStyles();


    const navigate = useNavigate()

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <Typography
                            onClick={() => navigate(`/`)}
                            variant="h6"
                            className={classes.title}
                        >
                            Cryptocurrency
                        </Typography>

                        <Select
                            variant="outlined"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"

                            style={{ width: 100, height: 40, marginLeft: 15 }}

                        >
                            <MenuItem value={"USD"}>USD</MenuItem>

                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}

export default Header;
import React, {createContext, FunctionComponent, useEffect, useMemo, useState} from 'react';
import {createTheme, CssBaseline, PaletteMode} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import NavBar from "../components/NavBar";
import Rides from "../components/Rides";
import Head from 'next/head';

const ColorModeContext = createContext({
    toggleColorMode: () => {
    }
});

interface OwnProps {
}

type Props = OwnProps;

const Home: FunctionComponent<Props> = (props) => {

    const [mode, setMode] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        setMode(localStorage.getItem('theme') as 'light' | 'dark');
    }, []);

    const theme = useMemo(() => createTheme({
        palette: {
            mode
        },
    }), [mode]);

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            localStorage.setItem('theme', mode === 'light' ? 'dark' : 'light');
            setMode((prevMode: 'light' | 'dark') =>
                prevMode === 'light' ? 'dark' : 'light'
            )
        }
    }), [mode]);

    return (
        <>
            <Head>
                <title>Routes</title>
            </Head>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <React.StrictMode>
                        <CssBaseline/>
                        <NavBar colorMode={colorMode} mode={mode} theme={theme}/>
                        <Rides/>
                    </React.StrictMode>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </>
    );
};

export default Home;

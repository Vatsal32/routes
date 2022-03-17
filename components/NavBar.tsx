import React, {useEffect, useState} from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {AppBar, Avatar, Box, Container, IconButton, PaletteMode, Typography} from "@mui/material";

interface OwnProps {
    colorMode: { toggleColorMode: () => void };
    mode: PaletteMode;
    theme: { palette: { background: { paper: string } } };
}

type Props = OwnProps;

const NavBar: React.FC<Props> = (props) => {
    const [dp, setDp] = useState<string>("");
    const [name, setName] = useState<string>("");

    async function getUser() {
        return fetch('/api/user', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "GET"
        }).then(res => res.json()).then(res => {
            setName(res.name);
            setDp(res.url);
        });
    }

    useEffect(() => {
        getUser().catch(console.log);
    }, []);

    return (
        <AppBar position="static">
            <Container maxWidth="xl" sx={{display: 'flex', padding: '1rem'}}>
                <Typography
                    variant="h4"
                    noWrap
                    component="div"
                    sx={{mr: 2, display: {xs: 'none', md: 'flex'}, flexGrow: 1, alignContent: 'center'}}
                >
                    Edvora
                </Typography>

                <Box sx={{
                    flexGrow: 0,
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    &ensp;&ensp;
                    <Typography variant={'h6'} color={'white'} mr={2}>
                        {name}
                    </Typography>
                    <Avatar src={dp}/>
                    <IconButton sx={{ml: 1}} onClick={props.colorMode.toggleColorMode} color="inherit">
                        {props.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                    </IconButton>
                </Box>
            </Container>
        </AppBar>
    );

};

export default NavBar;
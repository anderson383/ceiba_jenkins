import * as React from 'react';
import {HeaderNav} from './styles';
import LogoCeiba from 'assets/img/logo-ceiba.png';
import {NavBrand} from './NavBrand';
import {NavList} from './NavList';
import {Button, AppBar, IconButton, Typography, MenuItem, Menu, makeStyles, Toolbar, Icon} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    headerApp: {
        marginTop: 20,
        marginBottom: 20
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export const NavigationHeader: React.FC = () => {
    const routes = [
        {label: 'Home', url: '/home'},
        {label: 'Productos', url: '/productos'},
    ];
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event:any) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event:any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <AppBar position="static" color="inherit" className={classes.headerApp}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Icon>menu</Icon>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        VETERINARIA
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                            >
                                <Icon>account_circle</Icon>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            {/*<HeaderNav>
              <NavBrand imgSrc={LogoCeiba} text="Ceiba Software"></NavBrand>
              <NavList items={routes} />
          </HeaderNav>*/}
        </>
);
};

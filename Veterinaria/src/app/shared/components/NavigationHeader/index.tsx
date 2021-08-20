import * as React from 'react';
import {AppBar, Icon, IconButton, Menu, MenuItem, Toolbar, Typography, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    headerApp: {
        marginTop: 0,   
        boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
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

    const classes = useStyles();
    const [auth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

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
        </>
);
};

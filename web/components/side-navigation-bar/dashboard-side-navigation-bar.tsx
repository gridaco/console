import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { LinkNavigationMenuItem } from "./link-navigation-menu-item"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100%',
            backgroundColor: theme.palette.background.paper,
            position: 'fixed',
            zIndex: 1,
            top: 0,
            left: 0,
            overflowX: 'hidden',
        },
    }),
);

export function DashboardSideNavigationBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                    <ListItemText primary="Screens" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Components" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Assets" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Icons" />
                </ListItem>
            </List>
        </div>
    )
}


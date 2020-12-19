import React from "react";
import { styled } from "@linaria/react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export function DashboardSideNavigationBar() {
    return (
        <ListContainer>
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
        </ListContainer>
    );
}

const ListContainer = styled.div`
    height: 100%;
    background-color: white;
    width: 200px;
    border-right: 1px solid #efefef;
`;

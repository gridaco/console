import React from "react"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
export interface ISceneItemDisplay {
    name: string
    description: string
    lastEdit: string
    preview: string
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 360,
            maxHeight: 800,
            backgroundColor: theme.palette.background.paper,
        },
        preview: {
            height: 'inherit',
            width: 'inherit',
        }
    }),
);


export function SceneItem(props: ISceneItemDisplay) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <p>{props.name}</p>
            <p>{props.description}</p>
            <img className={classes.preview} src={props.preview}></img>
        </div>
    )
}
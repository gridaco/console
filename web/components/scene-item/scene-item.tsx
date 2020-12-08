import React, { useState } from "react"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { SceneItemContextMenu } from "../context-menus";


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
            maxHeight: 500,
            width: 'inherit',
            objectFit: 'cover',
        },
        contentArea: {
            boxSizing: 'border-box',
            padding: 12
        }
    }),
);


export function SceneItem(props: {
    id: string
    selected: boolean
    data: ISceneItemDisplay,
    onSelected?: (id: string) => void,
    onDoubleClick?: (id: string) => void
}) {
    const classes = useStyles();
    const data = props.data;
    const id = props.id
    const [hover, setHover] = useState<boolean>(false)

    const handleDoubleClick = (e: any) => {
        props.onDoubleClick && props.onDoubleClick(id)
    }

    const handleClick = (e: any) => {
        props.onSelected && props.onSelected(id)
    }

    const handleMouseEnter = (e: any) => {
        setHover(true)
    }
    const handleMouseLeave = (e: any) => {
        setHover(false)
    }

    return (
        <div>
            <ContextMenuTrigger id={id}>
                <div className={classes.root}
                    onClick={handleClick}
                    onDoubleClick={handleDoubleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Paper
                        elevation={hover ? 3 : 0}
                    >
                        <Box
                            className={classes.contentArea}
                            border={props.selected && 1}>
                            <img className={classes.preview} src={data.preview}></img>
                            <Typography variant="h6">{data.name}</Typography>
                            <Typography variant="body2">{data.description}</Typography>
                        </Box>
                    </Paper>
                </div >
            </ContextMenuTrigger>
            <ContextMenu id={id}>
                <SceneItemContextMenu />
            </ContextMenu>
        </div>
    )
}
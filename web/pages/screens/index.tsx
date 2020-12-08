import React, { useState } from "react"
import { useRouter } from "next/router"
import DashboardLayout from "../../layouts/dashboard"
import { SceneItem } from "../../components/scene-item"
import { makeStyles } from "@material-ui/core"
import { Theme } from "@material-ui/core/styles"
import { createStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        control: {
            padding: theme.spacing(2),
        },
    }),
);

export default function ScreensPage() {
    const classes = useStyles()
    const router = useRouter()
    const [focusedScreenId, setFocusedScreenId] = useState<string>()
    const testsrc = "https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iOS/ios14-iphone-11pro-edit-home-screen.jpg"
    const data = {
        name: 'screen1',
        description: 'my first scene',
        lastEdit: '2 days ago',
        preview: testsrc
    }

    const datas = [data, data, data, data, data, data, data, data, data, data, data]

    const handleSelection = (id: string) => {
        setFocusedScreenId(id)
    }

    const handleDoubleClick = (id: string) => {
        router.push(`/globalization/?scene=${id}`)
    }

    return (
        <DashboardLayout>
            <Grid container className={classes.root} spacing={2}>
                {
                    datas.map((d, i) => {
                        const id = i.toString()
                        return <SceneItem
                            key={id}
                            id={id}
                            onSelected={handleSelection}
                            onDoubleClick={handleDoubleClick}
                            selected={focusedScreenId === id}
                            data={d} />
                    })
                }
            </Grid>
        </DashboardLayout >
    )
}
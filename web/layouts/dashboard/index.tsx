import { makeStyles } from "@material-ui/core"
import React from "react"
import { DashboardSideNavigationBar } from "../../components/side-navigation-bar/dashboard-side-navigation-bar"


const useStyles = makeStyles({
    sidenavigation: {
        width: '160px'
    },
    contentpage: {
        marginLeft: '160px'
    }
})

export default function DashboardLayout(props: {
    children: JSX.Element
}) {
    const calsses = useStyles()
    return <div>
        <DashboardSideNavigationBar />
        <div className={calsses.contentpage}>
            {props.children}
        </div>
    </div>
}
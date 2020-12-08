import { makeStyles } from "@material-ui/core"
import React from "react"
import DashboardAppbar from "../../components/appbar/dashboard.appbar"
import { DashboardSideNavigationBar } from "../../components/side-navigation-bar/dashboard-side-navigation-bar"


const useStyles = makeStyles({
    sidenavigation: {
        width: 160
    },
    contentpage: {
        marginLeft: '160px',
        padding: 48
    },
    appbar: {
        marginLeft: 160
    }
})

export default function DashboardLayout(props: {
    children: JSX.Element
}) {
    const calsses = useStyles()
    return <div>
        <div className={calsses.appbar}>
            <DashboardAppbar />
        </div>
        <DashboardSideNavigationBar />
        <div className={calsses.contentpage}>
            {props.children}
        </div>
    </div>
}
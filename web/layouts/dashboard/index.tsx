import React from "react"
import { DashboardSideNavigationBar } from "../../components/side-navigation-bar/dashboard-side-navigation-bar"

export default function DashboardLayout(props: {
    children: JSX.Element
}) {
    return <div>
        <DashboardSideNavigationBar />
        {props.children}
    </div>
}
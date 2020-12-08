import React from "react"
import { useRouter } from "next/router"
import DashboardLayout from "../../layouts/dashboard"
import { SceneItem } from "../../components/scene-item"
export default function ScreensPage() {
    const router = useRouter()
    const testsrc = "https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iOS/ios14-iphone-11pro-edit-home-screen.jpg"
    return (
        <DashboardLayout>
            <div>
                <SceneItem name={'screen1'} description={'my first scene'} lastEdit={'2 days ago'} preview={testsrc} />
                <SceneItem name={'screen1'} description={'my first scene'} lastEdit={'2 days ago'} preview={testsrc} />
                <SceneItem name={'screen1'} description={'my first scene'} lastEdit={'2 days ago'} preview={testsrc} />
                <SceneItem name={'screen1'} description={'my first scene'} lastEdit={'2 days ago'} preview={testsrc} />
            </div>
        </DashboardLayout>
    )
}
import React from "react"
import { useRouter } from 'next/router'
import FrameFlutter from "../components/frame-flutter"
export default function Frame() {
    const router = useRouter();
    const id = router.query.frame as string
    const jsCdn = `https://s3-us-west-1.amazonaws.com/xyz.bridged.console.quicklook/${id}.dart.js`
    if (id) {
        return <FrameFlutter js={jsCdn}></FrameFlutter>
    }
    return <div>loading..</div>
}

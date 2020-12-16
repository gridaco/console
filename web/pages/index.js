import React from "react"
import Link from 'next/link'

function Index(){
    return (
        <ul>
            <li>
            <Link href="/globalization">globalization</Link>
            </li>
            <li>
            <Link href="/screens">screens</Link>
            </li>
        </ul>
    )
}


export default Index
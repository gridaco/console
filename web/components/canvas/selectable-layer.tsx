import React, { useState } from "react"
import { Group, Rect } from "react-konva";


export function SelectableLayer(props: {
    children: JSX.Element
    width: number
    height: number
    selected?: boolean
    onFocusChange?: (id: string, focus: boolean) => void;
}) {
    const [hover, setHover] = useState<boolean>();

    const childId = props.children.key as string

    const handleClick = (e: any) => {
        if (props.onFocusChange) {
            props.onFocusChange(childId as string, true);
        }
    };

    const handleDoubleClick = (e: any) => {
        if (props.onFocusChange) {
            props.onFocusChange(childId, true);
        }
    };

    const handleOutFocus = (e: any) => {
        setHover(false)
    };
    const handleInFocus = (e: any) => {
        setHover(true)
    };

    return <Group
        width={props.width}
        height={props.height}
        onMouseLeave={handleOutFocus}
        onMouseEnter={handleInFocus}
        // ondblclick={handleDoubleClick}
        onClick={handleClick}>
        {/* selection indicator */}
        <Rect
            width={props.width}
            height={props.height}
            stroke={'#FF2B5E'}
            strokeWidth={props.selected ? 2 : 0} />
        {/* hover indicator */}
        <Rect
            width={props.width}
            height={props.height}
            stroke={'#5900B2'}
            strokeWidth={hover ? 1 : 0} />
        {props.children}
    </Group>
}


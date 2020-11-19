import React, { Component, useState } from "react"
import dynamic from "next/dynamic"
// import { renderToString } from 'react-dom/server';
import { Stage, Layer, Rect, Text, Image, Group, } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';

const Sketch = dynamic(import("react-p5"), { ssr: false });
const imageurl = 'https://upload.wikimedia.org/wikipedia/en/9/95/Test_image.jpg'
interface Props {
    //Your component props
}

let img: any
export default class extends Component {
    constructor(props: Props) {
        super(props)
    }


    render() {
        if (typeof window !== 'undefined') {
            return (
                <div>
                    <Stage width={window.innerWidth} height={window.innerHeight}>
                        <Layer>
                            <StaticDesignImageDisplay url={imageurl} />
                        </Layer>
                        <Layer>
                            <EditableG11nText text="hi" />
                        </Layer>
                    </Stage>
                </div>
            )
        } else {
            return <p>loading..</p>
        }
    }
}

// the first very simple and recommended way:
const StaticDesignImageDisplay = (props: { url: string }, ...more: any) => {
    const [image] = useImage(props.url);
    return <Image image={image} {...more} />;
};


function EditableG11nText(props: {
    text: string
}) {
    const [focused, setFocused] = useState<boolean>(false)
    const [editing, setEditing] = useState<boolean>(false)
    const [textValue, setTextValue] = useState<string>(props.text)
    const [textX, setTextX] = useState<number>(0)
    const [textY, setTextY] = useState<number>(0)

    /**
             *    <textarea
                    value={textValue}
                    style={{
                        display: editing ? 'block' : 'none',
                        position: 'absolute',
                        top: textY + 'px',
                        left: textX + 'px'
                    }}
                    onChange={handleTextEdit}
                    onKeyDown={handleTextareaKeyDown}
                />
             */

    const handleClick = () => {
        setFocused(true)
    };

    const handleDoubleClick = (e: any) => {
        setEditing(true)

        const absPos = e.target.getAbsolutePosition();
        const ta = document.createElement('textarea')
        console.log(`el created`, ta)
        document.body.appendChild(ta);

        ta.value = textValue;
        ta.style.position = 'absolute';
        ta.style.display = editing ? 'block' : 'none'
        ta.style.top = absPos.y + 'px'
        ta.style.left = absPos.x + 200 + 'px'
        ta.style.width = 200 + 'px'
        ta.onkeydown = handleTextareaKeyDown
        ta.onkeyup = handleTextEdit

        // setTextX(absPos.x)
        // setTextY(absPos.y)
    };

    const handleTextEdit = (e: any) => {
        console.log('changed', e.target.value)
        setTextValue(e.target.value)
    };

    const handleTextareaKeyDown = (e: any) => {
        // return or enter
        if (e.keyCode === 13) {
            console.log('exiting edit')
            setEditing(false)
            document.removeChild(e.target)
        }
    };

    return (
        <Group
            x={20}
            y={20}
            onMouseLeave={() => { setFocused(false) }}
            ondblclick={handleDoubleClick}
            onClick={handleClick}
        >

            <Rect
                width={50}
                height={50}
                fill={focused ? 'green' : 'white'}
            >

            </Rect>
            <Text text={textValue} align='center' />
        </Group>


    );
}
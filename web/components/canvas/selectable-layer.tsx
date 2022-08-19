import React, { useState } from "react";
import { Group, Rect } from "react-konva";

interface ISelectableLayer {
  children: JSX.Element;
  width: number;
  height: number;
  selected?: boolean;
  onFocusChange?: (id: string, focus: boolean) => void;
}

export const SelectableLayer: React.FC<ISelectableLayer> = ({
  children,
  selected,
  onFocusChange,
  ...size
}) => {
  const [hover, setHover] = useState<boolean>();

  const childId = (children.key || "").toString();

  const handleClick = () => {
    if (onFocusChange) {
      onFocusChange(childId, true);
    }
  };

  // const handleDoubleClick = () => {
  //   if (onFocusChange) {
  //     onFocusChange(childId, true);
  //   }
  // };

  const handleOutFocus = () => setHover(false);

  const handleInFocus = () => setHover(true);

  return (
    <Group
      onMouseLeave={handleOutFocus}
      onMouseEnter={handleInFocus}
      // onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      {...size}
    >
      {/* selection indicator */}
      <Rect stroke="#FF2B5E" strokeWidth={selected ? 2 : 0} {...size} />
      {/* hover indicator */}
      <Rect stroke="#5900B2" strokeWidth={hover ? 1 : 0} {...size} />
      {children}
    </Group>
  );
};

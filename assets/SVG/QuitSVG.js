import * as React from "react";
import Svg, { Path, Rect, Circle } from "react-native-svg";

export const QuitSVG = (props) => {
  const { color = "#FFFFFF", size = 24 } = props;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Exit door with arrow */}
      <Rect
        x="14"
        y="3"
        width="8"
        height="18"
        stroke={color}
        strokeWidth="2"
        fill="none"
        rx="1"
      />
      <Path
        d="M9 8L2 12L9 16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M2 12H15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Door handle */}
      <Circle
        cx="17"
        cy="12"
        r="1"
        fill={color}
      />
    </Svg>
  );
};
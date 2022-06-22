import * as React from "react"
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import Svg, { SvgProps, Rect, Path } from "react-native-svg"

const RadioIcon = (props: SvgProps) => {
    const [isSelected, setSelection] = useState(false);
 return (
<TouchableOpacity
onPressIn={() => setSelection(!isSelected)}
>
<Svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {isSelected === false ? (
    <Rect
    x={1}
    y={1}
    width={20}
    height={20}
    rx={10}
    fill="#fff"
    stroke="#A2A3A2"
  />
    ):(
        <>
    <Rect
      x={1}
      y={1}
      width={20}
      height={20}
      rx={10}
      fill="#fff"
      stroke="#A2A3A2"
    />
    <Rect x={4} y={4} width={14} height={14} rx={7} fill="#133FDB" />
        </>
    )}

  </Svg>
</TouchableOpacity>
)
 }

export default RadioIcon

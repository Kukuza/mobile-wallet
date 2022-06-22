import * as React from "react"
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import Svg, { SvgProps, Rect, Path } from "react-native-svg"

const Checkbox = (props: SvgProps) => {
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
            rx={2}
            fill="#fff"
            stroke="#A2A3A2"
          />
    ):(
        <>
        <Rect width={20} height={20} rx={2} fill="#133FDB" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="m14.571 6 1.414 1.414-7.07 7.071-.087-.086-.085.086L4.5 10.243l1.414-1.415 2.914 2.915L14.571 6Z"
          fill="#fff"
        />
        </>
    )}

  </Svg>
</TouchableOpacity>
)
 }

export default Checkbox

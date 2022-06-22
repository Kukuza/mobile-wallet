import * as React from "react"
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import Svg, {SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const SwitchButton = (props: SvgProps) => {
    const [isSelected, setSelection] = useState(false);
 return (
<TouchableOpacity
onPressIn={() => setSelection(!isSelected)}
>
<Svg
    width={40}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {isSelected === false ? 
    <Path
    d="M35.455 4.545A11.25 11.25 0 0 0 27.5 1.25h-15a11.25 11.25 0 1 1 0 22.5h15a11.25 11.25 0 0 0 7.955-19.205Z"
    fill="#A2A3A2"
    stroke="#A2A3A2"
    strokeWidth={2.5}
  />
    :
     <Path
        d="M12.5.5a12.5 12.5 0 1 0 0 25h15a12.5 12.5 0 0 0 0-25h-15Zm15 22.5a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z"
        fill="#4840BB"
      />
    }

  </Svg>
</TouchableOpacity>
)
 }

export default SwitchButton

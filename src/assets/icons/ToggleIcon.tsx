import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const ToggleIcon = (props: SvgProps) => (
  <Svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m7 11.5 3 3 5-6"
      stroke="#4840BB"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11 21c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10Z"
      stroke="#4840BB"
      strokeWidth={2}
    />
  </Svg>
)

export default ToggleIcon
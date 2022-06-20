import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const InfoIcon = (props: SvgProps) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M8 1.332a6.674 6.674 0 0 0-6.666 6.667 6.674 6.674 0 0 0 6.667 6.666A6.674 6.674 0 0 0 14.667 8a6.674 6.674 0 0 0-6.666-6.667Zm0 12a5.34 5.34 0 0 1-5.333-5.333 5.34 5.34 0 0 1 5.334-5.334A5.34 5.34 0 0 1 13.334 8a5.34 5.34 0 0 1-5.333 5.333Z"
      fill="#002B4E"
    />
    <Path
      d="M7.334 7.335h1.333v4H7.334v-4Zm0-2.667h1.333v1.333H7.334V4.668Z"
      fill="#002B4E"
    />
  </Svg>
)

export default InfoIcon

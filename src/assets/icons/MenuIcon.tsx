import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const MenuIcon = (props: SvgProps) => (
  <Svg
    width={38}
    height={38}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M13.571 11.762h14.476M13.571 18.992h9.048M13.571 26.238h14.476"
      stroke="#4840BB"
      strokeWidth={1.81}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.14 13.572c.905 0 1.81-.905 1.81-1.81 0-.904-.905-1.809-1.81-1.809-.904 0-1.807.905-1.807 1.81 0 .904.903 1.81 1.808 1.81Zm0 7.238c.905 0 1.81-.904 1.81-1.81 0-.904-.905-1.809-1.81-1.809-.904 0-1.807.905-1.807 1.81 0 .904.903 1.81 1.808 1.81Zm0 7.238c.905 0 1.81-.904 1.81-1.81 0-.904-.905-1.809-1.81-1.809-.904 0-1.807.905-1.807 1.81s.903 1.81 1.808 1.81Z"
      fill="#4840BB"
    />
  </Svg>
)

export default MenuIcon
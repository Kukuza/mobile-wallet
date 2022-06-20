import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const DeleteIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2v0ZM18 9l-6 6M12 9l6 6"
      stroke="#002B4E"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default DeleteIcon
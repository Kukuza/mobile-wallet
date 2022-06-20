import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CancelIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m12 12 5.244 5.244m-10.486 0L12 12l-5.243 5.243ZM17.244 6.758 12 12l5.244-5.243ZM12 12 6.758 6.758 12 12Z"
      stroke="#000"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default CancelIcon

import * as React from "react"
import { TouchableOpacity } from "react-native"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

const NextIconButton = (props: SvgProps) => (
  <TouchableOpacity>
  <Svg
    width={19}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={9.5} cy={9.5} r={9.5} fill="#4840BB" />
    <Path
      d="m7.124 4.526.88-.963 4.894 5.388L8 14.339l-.876-.963 4.023-4.425-4.023-4.425Z"
      fill="#fff"
    />
  </Svg>
  </TouchableOpacity>
)

export default NextIconButton

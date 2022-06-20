import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const BackIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14.037 19.95 7.341 13.01c-.455-.47-.455-1.245 0-1.736l6.696-6.92a1.177 1.177 0 0 1 1.68 0c.454.469.454 1.245 0 1.735L9.848 12.15l5.867 6.064c.455.47.455 1.246 0 1.736-.454.47-1.205.47-1.679 0Z"
      fill="#4840BB"
    />
  </Svg>
)

export default BackIcon
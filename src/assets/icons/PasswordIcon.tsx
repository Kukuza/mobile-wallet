import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={19}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M17.03 10.09H2.237c-1.021 0-1.85-.941-1.85-2.102 0-1.16.829-2.101 1.85-2.101H17.03c1.021 0 1.85.94 1.85 2.101 0 1.16-.829 2.101-1.85 2.101Z"
      fill={props.color}
    />
    <Path
      d="M5.578 15.97c-1.01 0-1.828-.804-1.828-1.796 0-.315.085-.624.245-.897L11.306.833A1.847 1.847 0 0 1 13.83.28c.801.501 1.079 1.521.639 2.348L7.157 15.072a1.834 1.834 0 0 1-1.579.898Z"
      fill={props.color}
    />
    <Path
      d="M12.853 15.97a1.833 1.833 0 0 1-1.583-.898L3.959 2.628A1.78 1.78 0 0 1 4.73.205a1.847 1.847 0 0 1 2.39.628l7.31 12.444a1.779 1.779 0 0 1-.668 2.453c-.278.157-.593.24-.914.24h.004Z"
      fill={props.color}
    />
  </Svg>
)

export default SvgComponent

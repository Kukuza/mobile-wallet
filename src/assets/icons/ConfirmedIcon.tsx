import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"

const ConfirmedIcon = (props: SvgProps) => (
  <Svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m7 11.5 3 3 5-6"
      stroke="url(#a)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11 21c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10Z"
      stroke="url(#b)"
      strokeWidth={2}
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={11}
        y1={8.5}
        x2={11}
        y2={14.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#133FDB" />
        <Stop offset={1} stopColor="#B7004D" stopOpacity={0.25} />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={11}
        y1={1}
        x2={11}
        y2={21}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#133FDB" />
        <Stop offset={1} stopColor="#B7004D" stopOpacity={0.25} />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default ConfirmedIcon

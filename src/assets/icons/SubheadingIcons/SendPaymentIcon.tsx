import * as React from "react"
import Svg, { SvgProps, Rect, Circle, Path } from "react-native-svg"

const SendPaymentIcon = (props: SvgProps) => (
  <Svg
    width={48}
    height={48}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x={4} y={8} width={40} height={32} rx={4} fill="#4840BB" />
    <Circle cx={23.949} cy={23.949} r={12.736} fill="#fff" />
    <Path
      d="M24.239 10C16.373 10 10 16.373 10 24.239c0 7.865 6.373 14.238 14.239 14.238 7.865 0 14.238-6.373 14.238-14.238C38.477 16.373 32.104 10 24.24 10Zm6.993 9.755-2.337 11.012c-.172.78-.637.97-1.286.602l-3.56-2.623-1.716 1.653c-.19.19-.35.35-.718.35l.252-3.622 6.597-5.96c.287-.253-.063-.396-.442-.144l-8.153 5.133-3.513-1.096c-.764-.241-.781-.764.16-1.131l13.728-5.294c.637-.23 1.194.155.988 1.12Z"
      fill="#4840BB"
    />
  </Svg>
)

export default SendPaymentIcon

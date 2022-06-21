import * as React from "react"
import Svg, {
  SvgProps,
  Circle,
  G,
  Path,
  Defs,
  ClipPath,
} from "react-native-svg"

const Blockie = (props: SvgProps) => (
  <Svg
    width={48}
    height={48}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={24} cy={24} r={24} fill="#fff" />
    <G clipPath="url(#a)">
      <Path fill="#fff" d="M11 6h24v36H11z" />
      <Path fill="#133FDB" d="M13 10h8v8h-8zM26 10h8v8h-8zM19 36h8v8h-8z" />
    </G>
    <Path fill="#133FDB" d="M38 15h8v8h-8zM2 22h36v6H2z" />
    <Path fill="#224EAF" d="M11 29h24v10H11z" />
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(11 6)" d="M0 0h24v36H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default Blockie

import * as React from "react"
import Svg, { SvgProps, Path, Rect } from "react-native-svg"

const EmailIcon = (props: SvgProps) => (
  <Svg
    width={48}
    height={48}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M8.25 8A4.25 4.25 0 0 0 4 12.25v23.5A4.25 4.25 0 0 0 8.25 40h31.5A4.25 4.25 0 0 0 44 35.75v-23.5A4.25 4.25 0 0 0 39.75 8H8.25ZM24 14.75c.331 0 .65.132.884.366l6 6a1.25 1.25 0 1 1-1.768 1.768l-3.866-3.866V31.75a1.25 1.25 0 0 1-2.5 0V19.018l-3.866 3.866a1.25 1.25 0 1 1-1.768-1.768l6-6A1.25 1.25 0 0 1 24 14.75Z"
      fill="#4840BB"
    />
    <Rect x={4} y={8} width={40} height={32} rx={4} fill="#4840BB" />
    <Path
      d="M33.5 20.488v8.387a2.625 2.625 0 0 1-2.625 2.625h-13.75a2.625 2.625 0 0 1-2.625-2.625v-8.387l9.199 5.06a.625.625 0 0 0 .602 0l9.199-5.06ZM30.875 16.5a2.625 2.625 0 0 1 2.624 2.562L24 24.287l-9.499-5.226.001-.044a2.625 2.625 0 0 1 2.623-2.517h13.75Z"
      fill="#fff"
    />
  </Svg>
)

export default EmailIcon
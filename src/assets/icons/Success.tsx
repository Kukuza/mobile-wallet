import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M17.778 0a17.778 17.778 0 1 0 0 35.556 17.778 17.778 0 0 0 0-35.556Zm11.61 11.811L14.789 26.4l-8.621-8.622a1.571 1.571 0 0 1 2.222-2.222l6.422 6.422L27.19 9.61a1.57 1.57 0 1 1 2.222 2.222l-.022-.022Z"
      fill={props?.color}
    />
  </Svg>
)

export default SvgComponent

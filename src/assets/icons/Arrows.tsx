import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export const DefaultArrow = (props: SvgProps) => (
  <Svg
    width={29}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M28.06 13.06a1.5 1.5 0 0 0 0-2.12l-9.545-9.547a1.5 1.5 0 1 0-2.122 2.122L24.88 12l-8.486 8.485a1.5 1.5 0 1 0 2.122 2.122l9.546-9.546ZM0 13.5h27v-3H0v3Z"
      fill={props.color}
    />
  </Svg>
);
export const NextArrow = (props: SvgProps) => (
  <Svg
    width={13}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12.633 6.513a.725.725 0 0 0 0-1.026L8.017.871A.725.725 0 0 0 6.99 1.897L11.094 6l-4.103 4.103a.725.725 0 0 0 1.026 1.026l4.616-4.616ZM.56 6.725h11.56v-1.45H.56v1.45Z"
      fill={props.color}
    />
  </Svg>
)
export const ArrowRight = (props: SvgProps) => (
<Svg
    width={10}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M2.963 15.95 9.659 9.01c.455-.47.455-1.246 0-1.736L2.963.353a1.177 1.177 0 0 0-1.68 0c-.454.469-.454 1.245 0 1.735L7.152 8.15l-5.867 6.064c-.455.47-.455 1.246 0 1.736.454.47 1.205.47 1.679 0Z"
     fill={props.color}
    />
  </Svg>
)
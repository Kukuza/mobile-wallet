import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

const EditIcon = (props: SvgProps) => (
  <Svg
    width={35}
    height={35}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={17.5} cy={17.5} r={17.5} fill="#133FDB" />
    <Path
      d="M9.894 25.22a.89.89 0 0 1-.656-.29.88.88 0 0 1-.234-.681l.218-2.398 10.075-10.072 3.149 3.148-10.073 10.07-2.398.219a.843.843 0 0 1-.081.003Zm13.18-10.923-3.147-3.148 1.888-1.888a.89.89 0 0 1 1.26 0l1.888 1.888a.889.889 0 0 1 0 1.26l-1.888 1.887v.001Z"
      fill="#fff"
    />
  </Svg>
)

export default EditIcon

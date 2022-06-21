import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"

const WhatsappLogo = (props: SvgProps) => (
  <Svg
    width={49}
    height={49}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={48.469} height={48.469} rx={16} fill="#fff" />
    <Path
      d="M32.474 19.022c-2.908-4.483-8.845-5.816-13.45-3.029-4.483 2.787-5.937 8.846-3.029 13.329l.242.364-.97 3.635 3.636-.97.364.243c1.575.848 3.271 1.332 4.968 1.332a9.953 9.953 0 0 0 5.21-1.454c4.483-2.908 5.816-8.845 3.03-13.45Zm-2.544 9.33c-.485.728-1.09 1.212-1.939 1.334-.485 0-1.09.242-3.514-.727-2.06-.97-3.756-2.545-4.968-4.363-.727-.848-1.09-1.939-1.212-3.03 0-.968.364-1.817.97-2.422.242-.243.484-.364.727-.364h.605c.243 0 .485 0 .606.485.243.605.849 2.06.849 2.18a.368.368 0 0 1 0 .485c.12.243 0 .485-.122.606-.12.121-.242.364-.363.485-.242.121-.364.363-.242.606a13.95 13.95 0 0 0 1.696 2.06c.727.606 1.454 1.09 2.302 1.454.243.121.485.121.606-.121.121-.243.727-.848.97-1.09.242-.243.363-.243.605-.122l1.94.97c.241.12.484.242.605.363.121.363.121.848-.121 1.212Z"
      fill="#4840BB"
    />
  </Svg>
)

export default WhatsappLogo
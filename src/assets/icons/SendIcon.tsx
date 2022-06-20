import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"

const SendIcon = (props: SvgProps) => (
  <Svg
    width={20}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect
      width={19.658}
      height={18}
      rx={3.139}
      fill="#133FDB"
      fillOpacity={0.1}
    />
    <Path
      d="M12.987 7.763a1.75 1.75 0 1 0-2.474 2.474 1.75 1.75 0 0 0 2.474-2.474ZM7.083 5.5v7h9.334v-7H7.083Zm8.167 4.667c-.31 0-.607.122-.822.344a1.147 1.147 0 0 0-.345.822H9.417c0-.309-.123-.606-.345-.822a1.147 1.147 0 0 0-.822-.344V7.833c.31 0 .607-.122.822-.344.222-.216.345-.513.345-.822h4.666c0 .309.123.606.345.822.215.222.513.344.822.344v2.334Zm-9.333-3.5H4.75a.585.585 0 0 1-.583-.584c0-.32.262-.583.583-.583h1.167v1.167Zm0 2.916h-1.75A.585.585 0 0 1 3.583 9c0-.32.263-.583.584-.583h1.75v1.166Zm0 2.917H3.583a.584.584 0 0 1 0-1.167h2.334V12.5Z"
      fill="#133FDB"
    />
  </Svg>
)

export default SendIcon

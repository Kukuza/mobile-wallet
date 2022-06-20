import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const ShareIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="m23.687 7.278-6 5.578c-.633.588-1.687.152-1.687-.716V9.188c-6.024.04-8.565 1.44-6.866 7.029.187.614-.535 1.09-1.042.71C6.47 15.713 5 13.391 5 11.047 5 5.143 9.9 3.972 16 3.94V.985c0-.869 1.055-1.303 1.687-.716l6 5.578a.974.974 0 0 1 0 1.431ZM16 15.55v2.825H2.667V5.25h2.121a.506.506 0 0 0 .36-.151 8.116 8.116 0 0 1 2.126-1.546c.464-.238.292-.928-.231-.928H2c-1.105 0-2 .881-2 1.969V19.03C0 20.12.895 21 2 21h14.667c1.104 0 2-.881 2-1.969V15.39a.499.499 0 0 0-.668-.464 3.038 3.038 0 0 1-1.424.139.498.498 0 0 0-.575.486Z"
        fill="#4840BB"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v21H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default ShareIcon

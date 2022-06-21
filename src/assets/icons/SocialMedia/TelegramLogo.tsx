import * as React from "react"
import Svg, { SvgProps, Rect, G, Path, Defs, ClipPath } from "react-native-svg"

const TelegramLogo = (props: SvgProps) => (
  <Svg
    width={49}
    height={49}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={48.469} height={48.469} rx={16} fill="#fff" />
    <G clipPath="url(#a)">
      <Path
        d="M23.856 12.496c-6.485 0-11.739 5.254-11.739 11.739 0 6.484 5.254 11.738 11.739 11.738 6.484 0 11.738-5.254 11.738-11.738 0-6.485-5.254-11.739-11.738-11.739Zm5.765 8.042-1.926 9.078c-.143.644-.526.8-1.06.497L23.7 27.95l-1.416 1.364c-.156.156-.288.288-.591.288l.208-2.986 5.439-4.914c.236-.208-.053-.326-.365-.118l-6.721 4.232-2.897-.904c-.63-.2-.644-.63.133-.933l11.317-4.364c.525-.19.984.128.814.923Z"
        fill="#4840BB"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect
          x={12.117}
          y={12.117}
          width={23.477}
          height={24.235}
          rx={11.739}
          fill="#fff"
        />
      </ClipPath>
    </Defs>
  </Svg>
)

export default TelegramLogo

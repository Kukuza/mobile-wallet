import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const Slider1 = (props: SvgProps) => (
  <Svg
    width={181}
    height={262}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M76.306 89.664c-1.175-3.024-3.4-5.493-5.327-8.103a47.975 47.975 0 0 1-9.127-24.02c-.418-4.611 1.168-27.117 9.556-32.396-4.141-1.275-8.388-2.605-11.785-5.295-3.396-2.69-5.8-7.088-4.886-11.323 1.383-6.41 9.709-9.163 15.92-7.056C76.866 3.578 81.333 8.91 85.466 14c3.952-.333 4.933-6.157 8.543-7.8 2.435-1.109 5.266.028 7.627 1.287 6.869 3.665 13.303 8.69 16.935 15.576 3.633 6.887 3.947 15.876-.681 22.137 1.686-1.93 5.18.47 4.98 3.025-.2 2.555-2.457 4.409-4.611 5.796-2.155 1.388-4.563 2.826-5.414 5.243a47.43 47.43 0 0 1-9.936 16.45c-2.681 2.889-5.76 5.488-7.748 8.891-1.989 3.403-2.653 7.977-.333 11.163 3.084-3.283 8.4-4.206 12.41-2.155 4.011 2.051 6.375 6.901 5.519 11.324 5.588.479 10.608 4.906 11.783 10.39a134.74 134.74 0 0 1 27.179 39.571c4.185 9.315 7.293 19.07 10.392 28.801 1.212 3.807 2.439 7.796 1.764 11.734-1.371 7.997-10.047 12.709-18.106 13.655-10.033 1.179-20.488-1.748-28.451-7.964-4.254 13.227-8.5 27.676-3.665 40.703 1.036 2.789-1.035 5.958-3.74 7.197-2.705 1.24-5.819 1.059-8.787.853l-49.915-3.46c-3.487-.242-8.254-2.293-7.02-5.563a44.733 44.733 0 0 0 2.258-23.035 57.436 57.436 0 0 1-5.039 14.954s-8.305 17.104-16.587 8.326c-4.72-9.538-4.924-20.707-3.531-31.258 1.393-10.551 4.274-20.875 5.4-31.458 1.096-10.31.513-20.742 1.586-31.054 1.072-10.313 4.036-20.873 11.074-28.486l16.707-18.069c1.5-1.621 3.08-3.298 5.154-4.06 2.073-.76 4.784-.276 5.85 1.658 1.315-1.635 2.853-3.398 4.94-3.617 2.086-.218 4.264 2.338 2.924 3.953 2.401-2.181 2.553-6.02 1.378-9.044Z"
      fill="#fff"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M120.706 115.329a134.765 134.765 0 0 1 27.179 39.571c4.185 9.315 7.293 19.07 10.392 28.801 1.212 3.807 2.439 7.795 1.764 11.734-1.372 7.997-10.047 12.708-18.106 13.655-10.034 1.179-19.845-2.359-27.808-8.576-4.254 13.228-9.144 28.288-4.308 41.314.438 1.181 1.581 2.516 1.094 3.658-.664 1.555-3.274 2.825-4.835 3.54-.411.188.686-3.703.639-9.415-.082-9.72-4.157-43.489 5.436-41.258 23.429 5.449 41.094 4.604 41.464-1.209 1.881-29.508-34.086-87.299-32.911-81.815Z"
      fill="#E7EAEE"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M69.57 83.236v-.001h-.001v-.001l-.001-.001c-.43-.557-.859-1.113-1.274-1.675a47.976 47.976 0 0 1-9.128-24.021c-.418-4.611 1.168-27.117 9.556-32.396-4.14-1.275-8.388-2.605-11.784-5.295-3.397-2.69-5.8-7.088-4.887-11.323 1.384-6.41 9.71-9.162 15.92-7.056 6.21 2.107 10.677 7.438 14.81 12.529 2.177-.183 3.453-2.033 4.763-3.931 1.068-1.549 2.16-3.13 3.78-3.869 2.436-1.108 5.267.028 7.627 1.287 6.87 3.665 13.304 8.69 16.936 15.576 3.632 6.887 3.947 15.876-.681 22.137 1.685-1.93 5.179.47 4.979 3.025-.199 2.555-2.456 4.41-4.611 5.796l-.346.222c-2.06 1.322-4.261 2.733-5.068 5.021a47.43 47.43 0 0 1-9.936 16.45 95.981 95.981 0 0 1-2.197 2.266c-2.045 2.064-4.091 4.128-5.55 6.625-1.989 3.403-2.653 7.977-.334 11.163 3.084-3.282 8.4-4.206 12.411-2.155 4.01 2.051 6.374 6.901 5.518 11.324 5.588.479 10.609 4.906 11.784 10.39a134.778 134.778 0 0 1 27.179 39.571c4.185 9.315 7.293 19.07 10.391 28.801 1.213 3.807 2.44 7.796 1.765 11.734-1.372 7.997-10.048 12.709-18.106 13.655-10.034 1.179-20.489-1.748-28.452-7.964-4.254 13.228-8.5 27.676-3.664 40.703.428 1.153.325 2.372-.134 3.492-3.149-6.842-3.725-14.652-2.883-22.14.849-7.549 3.069-14.867 5.278-22.135.366-1.205-1.548-1.523-2.796-1.694-2.216-.304-3.824-2.192-5.21-3.948l-5.636-7.139c-3.637-4.607-7.83-9.552-13.632-10.444-1.609-.248-3.237-.158-4.867-.067h-.005c-.992.054-1.985.109-2.975.088a19.443 19.443 0 0 1-10.801-3.587c-.752-.536-1.515-1.208-1.67-2.118-.15-.89.654-1.932 1.507-1.706l.06.019-.06-.019a27.236 27.236 0 0 1-7.635-3.683c-.43-.298-.868-.628-1.09-1.102-.478-1.023.314-2.277 1.358-2.709 1.044-.432 2.226-.274 3.344-.109-1.334-.271-2.708-.559-3.825-1.336-1.118-.776-1.918-2.178-1.572-3.494.346-1.315 2.159-2.13 3.181-1.232-.446-1.328.521-2.8 1.786-3.403 1.265-.602 2.73-.555 4.13-.478 5.87.324 11.724.951 17.53 1.876l-.85-11.943c-.035-.487-.077-.998-.34-1.409-.34-.526-.965-.777-1.552-.994a244.175 244.175 0 0 0-36.328-10.341l2.767 51.841c.085 1.59.528 3.606 2.099 3.864a129.11 129.11 0 0 1 28.466 8.13c1.283.532 2.222-1.264 2.458-2.633l2.34-13.568a43.822 43.822 0 0 1-2.398 16.953c1.456.343 2.298-1.581 2.531-3.058l2.114-13.408a44.289 44.289 0 0 1-1.225 14.184c-.269 1.061-.677 2.235-1.669 2.697-.84.391-1.823.137-2.712-.122l-30.912-9.015c-.486-.142-.993-.296-1.353-.651-.536-.529-.61-1.356-.651-2.108l-2.573-46.744c-.166-3.031 0-6.068.165-9.098l.848-15.52c-4.976 17.527-5.446 36.106-3.35 54.204 2.097 18.098 6.7 35.808 11.745 53.315a40.434 40.434 0 0 1-4.576-11.702c-2.467 3.532-5.056 7.557-4.352 11.807a41.187 41.187 0 0 1-2.16 21.343c-.59 1.54.471 3.318 1.924 4.099 1.453.782 3.177.821 4.827.841l21.965.273c-.606-.769-.387-2.045.44-2.569-.221 2.388 2.84 3.511 5.216 3.835 11.223 1.526 23.153 2.958 33.468-1.69-.688 1.482-1.994 2.764-3.496 3.452-2.705 1.24-5.818 1.059-8.787.853l-49.915-3.46c-3.486-.241-8.253-2.293-7.02-5.563a44.733 44.733 0 0 0 2.258-23.035 57.432 57.432 0 0 1-5.038 14.954 57.02 57.02 0 0 1 7.702-22.363c2.913-4.845 1.235-11.01-.261-16.462-7.085-25.81-8.183-53.244-3.185-79.539-10.667 7.798-15.12 21.635-16.386 34.788-.529 5.499-.616 11.036-.704 16.57-.122 7.702-.243 15.397-1.555 22.974-.6 3.461-1.445 6.882-2.29 10.3-1.335 5.4-2.668 10.795-3.026 16.333-.56 8.65 1.284 17.254 3.117 25.725-4.72-9.538-4.924-20.707-3.53-31.258.639-4.842 1.592-9.636 2.544-14.43 1.123-5.652 2.246-11.302 2.855-17.028.552-5.192.678-10.416.805-15.639.124-5.148.249-10.297.781-15.415 1.072-10.312 4.036-20.873 11.075-28.485l16.707-18.07c1.5-1.621 3.08-3.298 5.153-4.059 2.074-.76 4.784-.277 5.85 1.657 1.315-1.635 2.853-3.398 4.94-3.617 2.087-.218 4.264 2.338 2.925 3.953 2.4-2.181 2.552-6.02 1.378-9.044-.921-2.37-2.488-4.4-4.05-6.424Zm41.154 162.332a4.4 4.4 0 0 0 .077-.174l.014-.031.02-.048.077.167a10.75 10.75 0 0 1-.188.086Zm49.326-54.511c.566 4.71-1.96 9.445-5.707 12.355s-8.545 4.188-13.278 4.513c-9.965.685-20.151-2.732-27.688-9.287 5.786-5.93 6.109-16.348.702-22.625 4.652-2.164 9.409-4.358 14.509-4.919 5.1-.561 10.697.793 14.012 4.709.567.669 1.057 1.398 1.547 2.128.601.896 1.202 1.791 1.944 2.571-.643-4.246-3.953-7.793-7.915-9.449-3.962-1.657-8.47-1.62-12.662-.688-4.192.932-8.141 2.71-12.056 4.475-.744.336-1.301-.735-1.422-1.543l-.702-4.679c-.289-1.929-.258-4.453 1.559-5.162 1.365-.532 1.007-2.614.104-3.767a28.621 28.621 0 0 0-.477-.584c-.814-.974-1.668-1.997-1.452-3.198 2.29-12.748 4.592-25.547 8.667-37.842.126-.381.28-.794.627-.995.469-.272 1.062-.037 1.534.23 3.818 2.157 6.099 6.011 8.375 9.857.803 1.357 1.606 2.713 2.476 3.993 1.341 1.976 2.878 3.804 4.415 5.634 1.142 1.358 2.284 2.716 3.346 4.136 6.548 8.747 9.76 19.268 12.979 29.812h.001v.002c1.468 4.809 2.938 9.622 4.726 14.274l.219.567c.692 1.785 1.39 3.585 1.617 5.482Zm-51.302-27.537c.934-.009 1.912-.028 2.73-.48.819-.451 1.397-1.485 1.018-2.339-.359-.811-1.394-1.103-2.274-.988-.509.066-.996.233-1.484.4h-.003v.001h-.001a10.66 10.66 0 0 1-1.068.324c-1.811.415-3.659-.131-5.497-.674-1.99-.588-3.968-1.172-5.874-.531 1.233-2.041 1.152-4.565 1.075-6.963l-.012-.375a77.564 77.564 0 0 1 8.142-36.948 10.573 10.573 0 0 0-4.151 6.359c-.063.302-.113.607-.164.913-.129.785-.258 1.569-.605 2.28-1.404 2.881-5.368 3.094-8.56 2.806-2.615-.236-5.356-.579-7.486-2.115-1.07-.77-1.93-1.804-2.785-2.833-1.139-1.369-2.27-2.728-3.871-3.441-2.658-1.182-5.498-.197-8.372.8-2.596.901-5.219 1.811-7.76 1.141-1.431-.377-2.422 1.38-2.851 2.797l-1.873 6.173c-.873-3.374.194-7.181 2.694-9.61-1.07-.702-.783-2.144-.497-3.571.289-1.446.575-2.877-.557-3.51-3.416-1.911-4.092-6.451-4.384-10.355-4.347 1.605-6.827 6.304-7.591 10.874-.45 2.694-.446 5.428-.44 8.165.003 1.907.007 3.814-.144 5.711a274.437 274.437 0 0 1 38.617 10.536c.771.272 1.58.575 2.095 1.21.553.684.657 1.616.738 2.492.411 4.428.8 9.039-.785 13.194l.013-12.949c.001-.717-.121-1.615-.804-1.834-1.061-.342-1.559 1.28-1.471 2.392l.758 9.626c.103 1.317.295 2.802 1.355 3.591l-19.053-1.914c-1.98-.199-4.352-.232-5.51 1.386.191 1.547 2.041 2.197 3.568 2.515l12.128 2.529c-3.795.785-7.784.081-11.375-1.378-.272-.11-.545-.226-.817-.341-1.137-.482-2.278-.966-3.496-1.127-1.511-.2-3.218.212-4.096 1.458a40.51 40.51 0 0 0 18.207 6.487c-.039.703-.976.913-1.678.862-1.825-.133-3.581-.669-5.339-1.205-.816-.248-1.632-.497-2.456-.706-2.598-.659-5.51-.877-7.817.489 5.191 4.234 12.036 5.705 18.6 7.047l-10.868-.232c1.922 3.42 6.234 4.68 10.152 4.888 1.158.061 2.327.06 3.496.058 2.783-.004 5.563-.007 8.193.839 4.775 1.536 8.234 5.588 11.428 9.455l6.159 7.457c.84 1.017 2.44 1.13 3.627.555 1.187-.575 2.024-1.684 2.681-2.827 1.304-2.273 2.08-4.942 1.659-7.528-.421-2.586-2.206-5.03-4.72-5.767-4.319-1.267-7.386-5.106-9.505-9.076-.728-1.364-1.382-2.77-2.035-4.176-1.25-2.688-2.498-5.374-4.26-7.748-.527-.711-1.102-1.396-1.677-2.081v-.002h-.001c-1.422-1.696-2.843-3.39-3.546-5.465a48.807 48.807 0 0 1 9.068 12.006c.257.481.542 1 1.04 1.224.319.143.681.142 1.03.139l9.342-.09Zm-.996-108.562c.875-.113 1.566-.769 2.192-1.39l3.042-3.027c-5.62 13.927-13.647 27.392-25.813 36.196-2.47 1.787-5.407 3.434-8.409 2.897-1.572-.281-2.982-1.143-4.233-2.137-2.604-2.07-4.664-4.748-6.426-7.57-4.975-7.964-7.737-17.325-7.695-26.715.042-9.39 2.914-18.777 8.288-26.478.185-.264.392-.542.697-.648.31-.107.649-.012.962.084a561.958 561.958 0 0 1 33.45 11.328c1.746.653 2.472 2.707 2.79 4.544a26.84 26.84 0 0 1-.507 11.416c-.227.852.788 1.614 1.662 1.5Zm-7.349-28.162c1.329.012 2.255 1.789 1.504 2.885-.751 1.096-2.742.874-3.233-.36-.551-1.385-1.972-2.137-3.312-2.846l-.422-.225c-4.504-2.426-7.966-6.278-11.411-10.11-.904-1.006-1.807-2.01-2.727-2.988a83.258 83.258 0 0 0-5.492-5.32c-2.096-1.85-4.32-3.617-6.885-4.727-2.566-1.111-5.533-1.516-8.174-.597 1.19.06 2.122 1.416 1.752 2.548-.37 1.133-1.922 1.677-2.918 1.024-.996-.653-1.115-2.294-.224-3.084-2.7.8-4.97 2.935-5.931 5.582-.19.522-.33 1.1-.157 1.627.098.297.29.561.48.823.267.368.53.731.518 1.173-.097 3.54 3.368 6.744 6.888 6.37.69-.073.968.615 1.256 1.328.137.34.277.687.465.959.336.486.898.757 1.435 1.003a118.907 118.907 0 0 0 16.898 6.229c.67.19 1.586.27 1.87-.366.382-.853 1.489-1.296 2.353-.941.864.355 1.34 1.448 1.012 2.323-.147.392.336.71.73.852l19.687 7.118c-.363-1.457 1.488-2.905 2.814-2.202 1.327.703 1.169 3.048-.241 3.566l7.196 3.628 1.292-10.56c.06-.493-.137-1.226-.614-1.085-.883.261-1.923-.238-2.272-1.09-.349-.852.044-1.938.857-2.37.626-.333.859-1.153.72-1.848-.138-.695-.566-1.292-.993-1.858-4.621-6.117-10.475-11.325-17.189-15.026-1.799-.991-3.98-1.885-5.84-1.011-1.076.506-1.8 1.501-2.508 2.475v.001h-.001v.001c-.113.154-.224.308-.337.459a20.296 20.296 0 0 1-5.149 4.84l6.273 6.382c-.519-1.12.27-2.63 1.487-2.842 1.216-.212 2.47.94 2.361 2.17-.109 1.23-1.545 2.144-2.705 1.722 2.62 2.116 5.52 4.338 8.887 4.368Zm7.984 86.443c.954.07 1.922-.503 2.32-1.372.398-.869.199-1.976-.476-2.652-.844-.845.133-2.423 1.321-2.546 1.188-.122 2.267.637 3.22 1.357l4.589 3.475c.557.422 1.181 1.051.938 1.705a178.28 178.28 0 0 0-10.228 43.823c-.125 1.212-1.294 2.105-2.494 2.323-1.199.217-2.425-.087-3.606-.39l-4.223-1.08c-.287-.074-.587-.154-.8-.36-.305-.293-.352-.757-.377-1.18-.858-14.407 2.105-29.024 8.507-41.96.273-.553.694-1.188 1.309-1.143Zm-9.301-9.037c-1.143-.862-.88-2.967.439-3.522-3.266.282-6.244 1.737-9.226 3.193-2.876 1.405-5.754 2.812-8.895 3.168 1.888 1.28 2.778 3.734 2.523 6.001-.256 2.266-1.526 4.329-3.175 5.904a13.973 13.973 0 0 0 6.52 6.187c.978.447 2.098.781 3.117.436.222-.075.459-.175.7-.278.88-.373 1.811-.768 2.253-.035.827 1.374 2.94 1.059 4.31.225.937-.569 1.808-1.34 2.194-2.366.385-1.026.157-2.336-.744-2.959-.749-.518-1-1.636-.546-2.425.454-.789 1.548-1.132 2.371-.744.719.338 1.393-.505 1.822-1.174a9.527 9.527 0 0 1 4.219-3.577c-.688-1.011-.592-2.486.222-3.4a14.938 14.938 0 0 1-4.837-6.022c-.173 1.421-2.125 2.25-3.267 1.388Zm-27.85-5.497c-.027.17-.053.34-.073.508-.095.785-.01 1.698.619 2.177a17.479 17.479 0 0 0 3.951-10.392c.028-.753 1.17-.644 1.881-.396 2.101.731 4.46.366 6.498-.526 2.038-.893 3.816-2.275 5.57-3.642a19.022 19.022 0 0 0 1.278 10.16l-6.936 5.209c-.275.206-.532.678-.218.816 2.63-.853 4.86-2.586 7.046-4.283l.205-.16c2.251-1.746 4.608-3.5 7.367-4.214 2.759-.714 6.042-.15 7.8 2.092.866 1.106 1.281 2.49 1.677 3.837l1.229 4.173c.266.904.528 1.901.144 2.763-.383.861-1.732 1.285-2.27.511l-2.515-3.618c-1.198-1.724-2.557-3.566-4.58-4.125-2.208-.61-4.484.492-6.537 1.508a125.086 125.086 0 0 1-11.03 4.813c-1.153.439-2.432.011-3.684-.408-1.424-.477-2.813-.942-3.94-.102-.417.312-1.008.141-1.49-.058a22.049 22.049 0 0 1-8.561-6.332l4.772-3.1c.663-.43 1.585.188 1.81.946.177.596.081 1.222-.014 1.843Zm3.51 18.481c-2.172-1.775-3.221-4.819-2.606-7.555.157-.695-.566-1.234-1.15-1.642-.584-.409-1.163-1.205-.712-1.757.243-.298-.088-.714-.392-.949l-5.838-4.526c-.7-.544-1.423-1.112-1.828-1.901-.73-1.426-2.681-2.069-4.117-1.357-2.038 1.01-2.322 3.75-2.333 6.025-.003.536.148 1.248.683 1.278 1.368.078 2.016 2.202.924 3.03-1.07.811-.307 2.568.758 3.386.232.179.48.35.73.522.895.616 1.806 1.243 2.04 2.266.173.762-.083 1.569-.334 2.357-.314.986-.618 1.943-.06 2.744.683.982 2.141.886 3.317.666a118.425 118.425 0 0 0 10.918-2.587Zm25.946 47.58a48.254 48.254 0 0 1 7.956.015c.222.019.456.044.634.177.274.206.323.59.354.932a42.58 42.58 0 0 0 1.587 8.28c-.124.331-.478.411-.845.494-.24.055-.486.11-.678.238-.62.412-.44 1.399.021 1.983.163.207.352.396.54.584v.001c.345.344.687.687.866 1.134-5.675-1.778-9.813-6.861-12.023-12.382-.134-.335-.263-.708-.141-1.047.121-.339.622-.539.852-.261.09.11.113.258.133.399l.386 2.759c.051.36.641.364.841.06.2-.304.126-.705.045-1.06l-.528-2.306Zm-18.4-54.277c-.762-2.197-2.816-3.89-5.118-4.219-.842-.121-1.792-.035-2.395.565-1.326 1.32-1.85 3.333-1.538 5.177.31 1.845 1.393 3.509 2.821 4.718 1.067.903 2.572 1.587 3.84.996.376-.176.698-.453.986-.755 1.603-1.684 2.167-4.285 1.404-6.482Zm25.298-57.946c.626-4.357 1.208-9.055-.849-12.946-.143-.27-.29-.627-.085-.855l6.457 3.2c.512.253 1.118.744.88 1.264-.278.606-.331 1.277-.384 1.948-.022.283-.044.567-.084.846-.238 1.688-1.115 3.234-2.227 4.525-1.113 1.291-2.458 2.357-3.795 3.415-.046-.466.021-.934.087-1.397Zm6.502 125.125c-.741-1.043-1.731-2.065-3.004-2.192-.492-.049-1.152.449-.796.791 3.083 2.947 5.148 7.166 4.767 11.414-.382 4.248-3.587 8.303-7.803 8.95 1.247 1.48 3.626 1.596 5.316.651 1.69-.944 2.777-2.702 3.463-4.513 1.87-4.942 1.117-10.794-1.943-15.101Zm-66.175-48.942c4.678.733 9.241 2.048 13.79 3.359l12.396 3.575c3.773 1.088 7.588 2.194 10.99 4.154-1.613-.059-3.182-.52-4.727-.992a517.733 517.733 0 0 1-8.174-2.598c-8.83-2.861-17.667-5.723-26.841-6.997.586-.701 1.663-.643 2.566-.501Zm67.774-82.368c-.71.638-1.049 1.589-1.253 2.521-.06.274-.111.55-.161.827-.123.665-.245 1.33-.493 1.956-.041.103-.085.207-.13.311-.223.524-.454 1.066-.287 1.595 2.677-.172 5.099-2.329 5.579-4.968.161-.886.066-1.927-.636-2.492-.743-.598-1.909-.388-2.619.25Zm-13.708-34.65c.309.875-.157 1.948-1.005 2.321-.849.373-1.954-.01-2.39-.827-.48-.901-.041-2.167.893-2.578.934-.41 2.163.122 2.502 1.085Zm-31.871.822a1.97 1.97 0 0 0-1.183-1.9c-.938-.387-2.143.127-2.514 1.07-.371.944.161 2.141 1.11 2.497 1.115.418 2.508-.48 2.587-1.667Zm36.265 8.015c.026 1.005.949 1.902 1.955 1.9 1.067-.004 2.018-1.03 1.94-2.094-.074-1.004-1.038-1.856-2.042-1.806-1.005.05-1.88.994-1.853 2Zm-28.683 1.162c-.73.911-2.322.914-3.054.004-.732-.91-.39-2.465.657-2.983 1.046-.518 2.49.153 2.77 1.287a1.99 1.99 0 0 1-.373 1.692ZM71.78 36.9a3.755 3.755 0 0 0-.344 3.295c.15.398.373.774.69 1.056 1.018.906 2.758.523 3.615-.536.857-1.06.975-2.554.722-3.893-.1-.533-.287-1.103-.742-1.399-.317-.206-.716-.243-1.093-.216A3.755 3.755 0 0 0 71.78 36.9Zm20.499 9.875c-.337-.344-.559-.787-.696-1.248-.511-1.709.208-3.71 1.69-4.703.67-.45 1.535-.699 2.293-.424.93.337 1.441 1.352 1.618 2.325.252 1.393-.052 2.954-1.077 3.93-1.025.975-2.838 1.132-3.828.12ZM66.597 65.988c.034-.86.104-1.72.21-2.575a.693.693 0 0 1 .588-.585 91.16 91.16 0 0 1 .192 6.334c-.932-.684-1.036-2.019-.99-3.174Zm34.634-9.155a4.021 4.021 0 0 0-2.471-2.853c-.206-.077-.196-.406-.023-.541.172-.136.418-.122.631-.07 1.169.285 1.891 1.432 2.425 2.51.142.284.281.616.156.91-.124.292-.65.355-.718.044Zm-21.36 186.781c-.123-.277-.434-.409-.72-.513a42.426 42.426 0 0 0-13.947-2.557c-.677-.009-1.468.056-1.84.621.362.305.882.305 1.356.298a38.183 38.183 0 0 1 14.737 2.728c.281.113.537-.299.414-.577Zm1.611-193.82c-.334.208-.668.416-.962.676-.554.492-.955 1.287-.668 1.97.354.843 1.49 1.003 2.39.84l.114-.02c.285-.054.576-.11.853-.033.313.086.59.416.482.724-.076.215-.302.335-.515.419-1.319.516-2.965.324-3.944-.7-.978-1.024-1.003-2.899.115-3.769l4.367-3.397c-.045 1.039-.569 2.04-1.371 2.7a7.875 7.875 0 0 1-.86.59Zm17.585 8.174c.271 1.534-.122 3.11-.679 4.565-2.397 6.265-8.058 11.175-14.599 12.662-2.632.599-5.536.634-7.878-.708-2.343-1.341-3.848-4.359-2.821-6.855 1.206-2.93 4.938-3.752 8.106-3.818.278-.006.558-.01.84-.014 2.94-.044 6.078-.09 8.205-2.048.757-.696 1.303-1.573 1.85-2.45.461-.74.923-1.482 1.513-2.118 1.289-1.39 3.814-2.054 4.947-.534.284.382.433.849.516 1.318Zm-1.347 2.337c.327-1.248.183-3.044-1.094-3.233-.474-.07-.948.142-1.342.416-.98.68-1.61 1.706-2.242 2.737-.502.818-1.006 1.64-1.69 2.295-1.785 1.713-4.457 2.016-6.922 2.23l-4.737.41c-1.209.104-2.46.222-3.513.827-1.975 1.135-2.66 4.036-1.4 5.935 1.361 2.053 4.2 2.499 6.652 2.262 7.56-.731 14.366-6.532 16.288-13.879Zm2.701 95.973a1.022 1.022 0 0 1-1.053-.606c-.228-.521.08-1.207.621-1.382.542-.176 1.194.199 1.315.755.12.557-.317 1.168-.883 1.233Zm8.762.07a1.007 1.007 0 0 0-.685-.246c-.611.018-1.101.707-.918 1.29.182.583.978.869 1.49.536.512-.333.573-1.177.113-1.58ZM90.76 111.966c-.634-.73-.58-1.957.117-2.628.696-.672 1.924-.681 2.63-.02.756.706.766 2.054.022 2.771-.744.717-2.09.657-2.769-.123Zm-8.303 6.091c-.145.39-.157.829-.033 1.226.352 1.13 1.914 1.668 2.887.994.973-.674 1.018-2.326.084-3.052-.934-.727-2.524-.276-2.938.832Zm-16.801-2.881a1.933 1.933 0 0 1-1.666 1.334c-1.113.081-2.152-1.024-2.004-2.129.148-1.106 1.442-1.898 2.494-1.527.903.319 1.453 1.406 1.176 2.322Z"
      fill="#00160A"
    />
  </Svg>
)

export default Slider1
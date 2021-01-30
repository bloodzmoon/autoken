type Props = {
  x?: number
  y?: number
  inline?: boolean
  flexFill?: boolean
}

/**
 * Spacer component. `x` and `y` props is used for determine the
 * space size of that axis. inline props used for changing
 * the display block into an inline-block. `flexFill` props
 * used for filling space between element.
 * *NOTE* flexFill will only work when parent's display is a flex.
 */
export const Spacer = ({
  x = 1,
  y = 1,
  inline = false,
  flexFill = false,
}: Props) => {
  const styleObject: React.CSSProperties = {
    display: inline ? 'inline-block' : 'block',
    width: '1px',
    height: '1px',
    marginLeft: `${x}rem`,
    marginTop: `${y}rem`,
    flex: flexFill ? '1 1 auto' : undefined,
  }
  return <span style={styleObject} />
}

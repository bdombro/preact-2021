/**
 * Lazily-loaded icons from Material Design Icons, and helpers to 
 * add more features and easily manage them.
 * 
 * For enhanced props, see IconSvgProps
 */

import './icons.css'

import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'


// The Icons

export const Account =   I(() => import('mdi-paths-split/CardAccountDetailsOutline'))
export const Auth =      I(() => import('mdi-paths-split/ShieldAccountOutline'))
export const Building =  I(() => import('mdi-paths-split/OfficeBuildingMarkerOutline'))
export const Counter =   I(() => import('mdi-paths-split/Counter'))
export const Home =      I(() => import('mdi-paths-split/HomeOutline'))
export const Info =      I(() => import('mdi-paths-split/InformationOutline'))
export const Login =     I(() => import('mdi-paths-split/LoginVariant'))
export const Logout =    I(() => import('mdi-paths-split/LogoutVariant'))
export const Palette =   I(() => import('mdi-paths-split/PaletteOutline'))
export const Post =      I(() => import('mdi-paths-split/PostOutline'))
export const ReactLogo = I(() => import('mdi-paths-split/React'))
export const Search =    I(() => import('mdi-paths-split/Magnify'))
export const Tasks =     I(() => import('mdi-paths-split/OrderBoolAscendingVariant'))


// Helpers


// Icon Factory, shortened to be easier to read
function I(lazyPath: LazyIconSvgProps['lazyPath']) {
  return (props: IconProps) => <LazyIconSvg lazyPath={lazyPath} {...props} />
}
type IconProps = Omit<LazyIconSvgProps, 'lazyPath'>

// Lazily loaded IconSvg
interface LazyIconSvgProps extends Omit<IconSvgProps, 'path'> {
  lazyPath: () => Promise<any>  // Like () => import('mdi-paths-split/Home')
}
function LazyIconSvg({ lazyPath, ...props }: LazyIconSvgProps) {
  const [path, setPath] = useState('')
  useEffect(() => { lazyPath().then((module: any) => setPath(module.default)) }, [])
  return <IconSvg path={path} {...props} />
}

// Enhanced svg element
interface IconSvgProps extends Omit<h.JSX.SVGAttributes<SVGSVGElement>, 'size'> {
  size?: number | string   // Set width and height in one prop
  horizontal?: boolean     // flip horizontally
  vertical?: boolean       // flip vertically
  rotate?: number          // rotate degrees
  path?: string            // the path part of the svg
  spin?: boolean | number  // spin the svg # seconds per spin. Default = 2
  spinInverse?: boolean    // inverse the spin
}
function IconSvg({
  path = '',
  size = 24,
  fill = 'currentColor',
  horizontal,
  vertical,
  rotate = 0,
  spin,
  spinInverse,
  style = {},
  ...props
}: IconSvgProps) {

  if (typeof style !== 'string') {
    const transforms: string[] = style.transform ? [style.transform as string] : []
    if (horizontal) transforms.push('scaleX(-1)')
    if (vertical) transforms.push('scaleY(-1)')
    if (rotate !== 0) transforms.push(`rotate(${rotate}deg)`)
    if (transforms.length > 0) {
      style.transform = transforms.join(' ')
      style.transformOrigin = 'center'
    }
    if (spin) {
      const spinSec = spin === true || typeof spin !== 'number' ? 2 : spin
      style.animation = `spin${spinInverse ? '-inverse' : ''} linear ${Math.abs(spinSec)}s infinite`
      style.transformOrigin = 'center'
    }
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
      style={style}
      {...props}
    >
      <path d={path} />
    </svg>
  )
}
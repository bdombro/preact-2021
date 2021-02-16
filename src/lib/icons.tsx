/**
 * Lazily-loaded icons from Material Design Icons, and helpers to 
 * add more features and easily manage them.
 * 
 * For enhanced props, see IconSvgProps
 */

import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

// Add css spin effects
document.head.innerHTML += `<style type="text/css">
@keyframes spin-inverse { to { transform: rotate(-360deg) } }
@keyframes spin { to { transform: rotate(360deg) } }
</style>`


// The Icons
const I = IconFactory
export const Account =		I(() => import('mdi-paths-split/CardAccountDetailsOutline'))
export const Alert = 			I(() => import('mdi-paths-split/AlertOutline'))
export const ArrowL =			I(() => import('mdi-paths-split/ArrowLeft'))
export const ArrowR =			I(() => import('mdi-paths-split/ArrowRight'))
export const Auth =				I(() => import('mdi-paths-split/ShieldAccountOutline'))
export const Building =		I(() => import('mdi-paths-split/OfficeBuildingMarkerOutline'))
export const CarrotUp =		I(() => import('mdi-paths-split/MenuUp'))
export const CarrotDown =	I(() => import('mdi-paths-split/MenuDown'))
export const CarrotLeft = I(() => import('mdi-paths-split/MenuLeft'))
export const CarrotRight= I(() => import('mdi-paths-split/MenuRight'))
export const CheckboxM =	I(() => import('mdi-paths-split/CheckboxMarked'))
export const CheckboxB =	I(() => import('mdi-paths-split/CheckboxBlankOutline'))
export const Counter =		I(() => import('mdi-paths-split/Counter'))
export const Error = 			I(() => import('mdi-paths-split/AlertOctagonOutline'))
export const Home =				I(() => import('mdi-paths-split/HomeOutline'))
export const Info =				I(() => import('mdi-paths-split/InformationOutline'))
export const Login =			I(() => import('mdi-paths-split/LoginVariant'))
export const Logout =			I(() => import('mdi-paths-split/LogoutVariant'))
export const MapPin =			I(() => import('mdi-paths-split/MapMarker'))
export const Palette =		I(() => import('mdi-paths-split/PaletteOutline'))
export const Post =				I(() => import('mdi-paths-split/PostOutline'))
export const ReactLogo =	I(() => import('mdi-paths-split/React'))
export const Search =			I(() => import('mdi-paths-split/Magnify'))
export const Support =		I(() => import('mdi-paths-split/Lifebuoy'))
export const Success =		I(() => import('mdi-paths-split/CheckCircleOutline'))
export const Tasks =			I(() => import('mdi-paths-split/OrderBoolAscendingVariant'))



// Helpers

// Icon Factory, shortened to be easier to read
function IconFactory(lazyPath: LazyIconSvgProps['lazyPath']) {
	const IconComponent: IconComponentType = (props: IconProps) => <LazyIconSvg lazyPath={lazyPath} {...props} />
	return IconComponent
}
export type IconComponentType = (props: IconProps) => h.JSX.Element
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
export function IconSvg({
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
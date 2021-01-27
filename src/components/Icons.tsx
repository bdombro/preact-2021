import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

export const Account =   I(() => import('mdi-paths-split/CardAccountDetailsOutline'))
export const Counter =   I(() => import('mdi-paths-split/Counter'))
export const Home =      I(() => import('mdi-paths-split/HomeOutline'))
export const Info =      I(() => import('mdi-paths-split/InformationOutline'))
export const Login =     I(() => import('mdi-paths-split/LoginVariant'))
export const Logout =    I(() => import('mdi-paths-split/LogoutVariant'))
export const Building =  I(() => import('mdi-paths-split/OfficeBuildingMarkerOutline'))
export const Tasks =     I(() => import('mdi-paths-split/OrderBoolAscendingVariant'))
export const Palette =   I(() => import('mdi-paths-split/PaletteOutline'))
export const Post =      I(() => import('mdi-paths-split/PostOutline'))
export const ReactLogo = I(() => import('mdi-paths-split/React'))
export const Auth =      I(() => import('mdi-paths-split/ShieldAccountOutline'))


function I(lazyPath: LazyPathType) { // aka Icon Factory, shortened to be easier to read
  return (props: IconProps) => <LazySvg lazyPath={lazyPath} {...props} />
}
type IconProps = Omit<LazySvgProps, 'lazyPath'>


function LazySvg({ lazyPath, color = 'currentColor', size = 24, ...props }: LazySvgProps) {
  const className = 'mdi-icon ' + (props.class || props.className || '');
  const [path, setPath] = useState('')
  useEffect(() => { lazyPath().then((module: any) => setPath(module.default)) }, [])

  return (
    <svg {...props} class={className} width={size} height={size} fill={color} viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  );
};
type LazyPathType = () => Promise<any>
interface LazySvgProps {
  color?: string
  size?: number | string
  class?: string
  className?: string
  children?: never
  lazyPath: LazyPathType
}

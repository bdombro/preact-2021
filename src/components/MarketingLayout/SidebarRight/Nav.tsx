import styles from './Nav.module.css'
import { h } from 'preact';
import { useLocation } from '~/lib/routing';
import { Paths } from '~/routes/router';
import lazy from '~/lib/lazy';

const HomeIcon = lazy(() => import('~/components/icons/HomeOutlineIcon'))
const AboutIcon = lazy(() => import('~/components/icons/InformationOutlineIcon'))
const BlogIcon = lazy(() => import('~/components/icons/PostOutlineIcon'))
const LoginIcon = lazy(() => import('~/components/icons/LoginVariantIcon'))
const ThemeIcon = lazy(() => import('~/components/icons/PaletteOutlineIcon'))

export default function Nav() {
    const { pathname } = useLocation()
    return <nav class={styles.nav}>
        <NavLink uri={Paths.Home} text='Home' Icon={HomeIcon} isActive={pathname === Paths.Home} />
        <NavLink uri={Paths.About} text='About' Icon={AboutIcon} isActive={isActive(Paths.About)} />
        <NavLink uri={Paths.Blog} text='Blog' Icon={BlogIcon} isActive={isActive(Paths.Blog)} />
        <NavLink uri={Paths.Login} text='Login'  Icon={LoginIcon} isActive={isActive(Paths.Login)} />
        <NavLink uri="#theme-toggle" text='Theme' Icon={ThemeIcon} isActive={false} />
    </nav>

    function isActive(uri: string) {
        return pathname.startsWith(uri)
    }
}

function NavLink({ uri, text, Icon, isActive }: { uri: string, text: string, Icon: any, isActive: boolean }) {
    return (
        <a
            href={uri + (isActive ? '?stack=reset' : '')}
            class={`${styles.navlink} ${isActive && styles.active}`}
        >
            <div class={styles.navlinkIcon}><Icon /></div>
            <div class={styles.navlinkText}>{text}</div>
        </a>
    )
}
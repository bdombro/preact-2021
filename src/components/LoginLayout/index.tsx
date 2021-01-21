import { h } from 'preact';
import styles from './index.module.css'

export default function LoginLayout({children}: any) {
    return <div className={styles.loginLayout}>
        <div className={styles.inner}>
            {children}
        </div>
    </div>
}
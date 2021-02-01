import { h } from 'preact'

import styles from './LoginLayout.module.css'

export default function LoginLayout({children}: any) {
	return <div class={styles.loginLayout}>
		<div class={styles.inner}>
			{children}
		</div>
	</div>
}
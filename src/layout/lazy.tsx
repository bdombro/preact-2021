/**
 * Functions like react's lazy, only it doesn't need suspense
 */

import { useEffect, useState } from "preact/hooks";

import { h } from 'preact';

export default function lazy<T>(loader: () => Promise<{ default: T }>, loadingJsx = <div />): any {
    return function Lazy(props: any = {}) {
        const [jsx, setJsx] = useState<any>(loadingJsx)
        useEffect(() => {
            loader().then((m: { default: any }) => {
                if (!m || !m.default) {
                    const e = new Error('Lazy import must export default') as any
                    e.import = m
                    throw e
                }
                setJsx(<m.default {...props} />)
            })
        }, [props])
        return jsx
    }
}
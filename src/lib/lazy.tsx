/**
 * Functions like react's lazy, only it doesn't need suspense
 */

import { Component, FunctionalComponent, h } from 'preact';

type ImportComponent = () => Promise<any>

export default function lazy (imp: ImportComponent, loadingJsx = <div/>) {
    return class Lazy extends Component {
        state: {
            component: FunctionalComponent | null
        }
        constructor(props: any) {
            super(props)
            this.state = { component: null }
        }
        async componentDidMount() {
            const { default: component } = await imp()
            this.setState({ component })
        }
        render() {
            const C = this.state.component
            return C ? <C {...this.props} /> : loadingJsx;
        }
    }
}

export function lazyLib(imp: Promise<any>) {
    return (props: any) => imp.then((lib: any) => lib.default(props))
}
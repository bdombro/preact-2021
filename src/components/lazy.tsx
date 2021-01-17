/**
 * Functions like react's lazy, only it doesn't need suspense
 */

import { Component, FunctionalComponent, h } from 'preact';

type ImportComponent = () => Promise<any>

export default function lazy (importComponent: ImportComponent, loadingJsx = <div/>) {
    return class AsyncComponent extends Component {
        state: {
            component: FunctionalComponent | null
        }
        constructor(props: any) {
            super(props)
            this.state = { component: null }
        }

        async componentDidMount() {
            const { default: component } = await importComponent()
            this.setState({ component })
        }

        render() {
            const Component = this.state.component
            return Component ? <Component {...this.props} /> : loadingJsx;
        }
    }
}
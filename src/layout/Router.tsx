import { FunctionalComponent, FunctionComponent, h } from 'preact'
import { useLayoutEffect, useState } from 'preact/hooks'

import BlankLayout from './BlankLayout/BlankLayout'
import nav from './navigate'
import navListener from './navListener'
import RouteWrapper from './RouteWrapper'
import useLocation from './useLocation'

function RouterSwitch({ routesByPath, NotFound, redirects = {} }: RouterProps) {
  const { pathname } = useLocation()

  // Redirects
  for (const [pathFrom, pathTo] of Object.entries(redirects)) {
    if (pathname === pathFrom) nav(pathTo)
  }
  
  if (pathname === '/tenant') nav('/tenant/stats')

  const { Stack = RouteWrapper, Component = NotFound } = routesByPath[pathname] || {}
  return <Stack><Component /></Stack>
}


/**
 * Wraps the Router Switch in a Layout, and strategically only re-renders
 * the layout if the layout has changed, preserving state in the layouts
 * and improving performance
 */
export default function Router(props: RouterProps) {
  const [Layout, setLayout] = useState<any>(() => BlankLayout)
  useLayoutEffect(watchLocation, [])
  return <Layout><RouterSwitch {...props} /></Layout>

  function watchLocation() {
    onLocationChange()
    return navListener(onLocationChange)
  }
  function onLocationChange() {
    const match = props.routesByPath[location.pathname]
    if (!match || !match.Layout) setLayout(() => BlankLayout)
    else if (Layout !== match.Layout) setLayout(() => match.Layout)
  }
}

interface RouterProps { 
  routesByPath: Record<string, Route>, 
  NotFound: FunctionComponent, 
  redirects?: Record<string, string> 
}

interface Route {
  path: string
  Component: FunctionalComponent
  Layout?: FunctionalComponent
  Stack?: FunctionalComponent
}
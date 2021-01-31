export {default as nav} from './nav'
export {default as navListener} from './navListener'
export {default as Route} from './RouteWrapper'
export {default as StackFactory} from './StackFactory'
export {default as useLocation} from './useLocation'

import type { SetPageMetaProps } from './setPageMeta'
export const setPageMeta = (p: SetPageMetaProps) => import('./setPageMeta').then(m => m.default(p))

export {default as nav} from './nav'
export {default as navListener} from './navListener'
export {default as useLocation} from './useLocation'
export {default as Route} from './Route'
export {default as StackFactory} from './StackFactory'

import type { SetPageMetaProps } from './setPageMeta'
export const setPageMeta = (p: SetPageMetaProps) => import('./setPageMeta').then(m => m.default(p))

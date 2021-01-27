import { lazyLib } from '../lazy'
import type { SetPageMetaProps } from './setPageMeta'

export type { UseLocationLocation } from './useLocation'
export * from  './events'
export {default as useLocation} from './useLocation'
export {default as StackFactory} from './Stack'
export {default as Route} from './Route'

export const setPageMeta: (p: SetPageMetaProps) => void = lazyLib(import('~/lib/routing/setPageMeta'))
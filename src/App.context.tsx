import { FunctionComponent, h } from 'preact'

import { createContext } from './layout/createContext'
import navListener from './layout/navListener'

const bc = document.body.classList

// ThemeCtx: can be dark | light, persists to disk, and can be toggled with #theme-toggle event
export const ThemeCtx = createContext(localStorage.getItem('ThemeCtx') === 'dark' ? 'dark' : 'light')
window.addEventListener('#theme-toggle', () => ThemeCtx.set(current => current === 'dark' ? 'light' : 'dark'))
ThemeCtx.subscribe(next => localStorage.setItem('ThemeCtx', next))
ThemeCtx.subscribe(next => next === 'dark' ? bc.add('dark') : bc.remove('dark'))
if (localStorage.getItem('ThemeCtx') === 'dark') bc.add('dark')

// SidebarLeftCtx: can be full | mini, persists to disk, and can be toggled with #sidebar-toggle event
export const SidebarLeftCtx = createContext(localStorage.getItem('SidebarLeftCtx') || 'full')
window.addEventListener('#sidebar-toggle', () => SidebarLeftCtx.set(current => current === 'mini' ? 'full' : 'mini'))
SidebarLeftCtx.subscribe(next => localStorage.setItem('SidebarLeftCtx', next))
SidebarLeftCtx.subscribe(next => next === 'mini' ? bc.add('miniSidebar') : bc.remove('miniSidebar'))
if (localStorage.getItem('SidebarLeftCtx') === 'mini') bc.add('miniSidebar')

// SidebarRightCtx: can be active or inactive, resets on navigation
export const SidebarRightCtx = createContext(false)
navListener(() => SidebarRightCtx.set(false))

export const CtxProviders: FunctionComponent = ({children}) => 
  <ThemeCtx.Provider>
    <SidebarLeftCtx.Provider>
      <SidebarRightCtx.Provider>
        {children}
      </SidebarRightCtx.Provider>
    </SidebarLeftCtx.Provider>
  </ThemeCtx.Provider>
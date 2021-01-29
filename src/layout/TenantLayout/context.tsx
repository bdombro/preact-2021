import { createContext, FunctionComponent, h } from 'preact'
import { useContext, useState } from 'preact/hooks'

type ContextType = {
    sidebarRight: [active: boolean, setIsActive: (next: boolean) => any]
}

const defaultValue: ContextType = {
  sidebarRight: [false, () => undefined]
}

const Context = createContext<ContextType>(defaultValue)

export const ContextProvider: FunctionComponent = ({ children }) => {
  const sidebarRight = useState<ContextType['sidebarRight'][0]>(defaultValue.sidebarRight[0])
  const state: ContextType = {
    sidebarRight,
  }
  return <Context.Provider value={state}>{children}</Context.Provider>
}

export function useLayoutState() {
  return useContext(Context)
}

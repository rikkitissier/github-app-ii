import { createContext, useContext } from 'react'
import { Context } from "@helpscout/javascript-sdk";

export const HelpScoutContext = createContext<Context | null>(null)

export function useHelpScoutContext() {
  return useContext(HelpScoutContext)
}

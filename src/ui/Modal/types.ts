import React from 'react'

export interface IModal {
  children: React.ReactNode
  isVisible: boolean
  setIsVisible: (key: boolean) => void
  top?: string
  delay?: number
  className?: string
  minHeight?: string
  refElement?: React.RefObject<HTMLDivElement>
  darken?: boolean
  outSideClickClose?: boolean
}

export type StyledTypes = {
  isVisible: boolean
  duration: number
  top?: string
  minHeight?: string
  darken?: boolean
}

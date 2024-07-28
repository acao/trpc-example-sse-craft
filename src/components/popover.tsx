import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

export function PopOver({ title, children }) {
  return (
    <Popover className="relative">
      <PopoverButton>{title}</PopoverButton>
      <PopoverPanel anchor="bottom" className="flex flex-col">
        {children}
      </PopoverPanel>
    </Popover>
  )
}

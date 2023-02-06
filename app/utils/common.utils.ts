/**
 * Functions will end the assessment and redirectbto respective route
 * @param element
 * @returns boolean
 */

import { RefObject } from 'react'

export function isElementInViewport(
  element: RefObject<HTMLDivElement>,
  dropdownRef: RefObject<HTMLDivElement>
): boolean | undefined {
  const positionOfElement = element && element?.current?.getBoundingClientRect()
  const heightOfDropdown = dropdownRef.current?.offsetHeight
  if (positionOfElement && heightOfDropdown) {
    return (
      positionOfElement?.top >= 0 &&
      positionOfElement?.left >= 0 &&
      positionOfElement?.bottom <=
        (window.innerHeight - heightOfDropdown ||
          document?.documentElement.clientHeight) &&
      positionOfElement?.right <=
        (window.innerWidth || document?.documentElement.clientWidth)
    )
  }
}

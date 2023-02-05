/**
 * Functions will end the assessment and redirectbto respective route
 * @param element
 * @returns boolean
 */

import { RefObject } from 'react'

export function isElementInViewport(
  element: RefObject<HTMLDivElement>
): boolean | undefined {
  const positionOfElement = element && element?.current?.getBoundingClientRect()
  if (positionOfElement) {
    return (
      positionOfElement?.top >= 0 &&
      positionOfElement?.left >= 0 &&
      positionOfElement?.bottom <=
        (window.innerHeight - 100 || document?.documentElement.clientHeight) &&
      positionOfElement?.right <=
        (window.innerWidth || document?.documentElement.clientWidth)
    )
  }
}

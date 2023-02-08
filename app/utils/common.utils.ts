/**
 * Functions will end the assessment and redirectbto respective route
 * @param element
 * @returns boolean
 */

import type { RefObject } from "react"

export function isElementInViewport(
  element: RefObject<HTMLDivElement>,
  componentRef: RefObject<HTMLDivElement>
): boolean | undefined {
  const positionOfElement = element && element?.current?.getBoundingClientRect()
  const heightOfComponent = componentRef.current?.offsetHeight
  if (positionOfElement && heightOfComponent) {
    return (
      positionOfElement?.top >= 0 &&
      positionOfElement?.left >= 0 &&
      positionOfElement?.bottom <=
      (window.innerHeight - heightOfComponent ||
        document?.documentElement.clientHeight) &&
      positionOfElement?.right <=
      (window.innerWidth || document?.documentElement.clientWidth)
    )
  }
}

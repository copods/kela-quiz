import type { MutableRefObject } from "react"

export const useScrollIntoView = (
  elementRef: MutableRefObject<HTMLDivElement>
) => {
  elementRef.current.scroll({
    top: elementRef.current.scrollHeight,
    behavior: "smooth",
  })
}

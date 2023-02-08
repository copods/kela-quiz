import { useEffect, useRef, useState } from 'react'
import { isElementInViewport } from '~/utils/common.utils'

/**
 *
 * This Hook is able to decide what should be the position of modal|dropdown|popover|
 * @returns elementRef(Element Ref through which Dropdown or modal get Open) , componentRef (Dropdown Ref | Modal Ref and more),
 * elementViewPortVisiblility(Checks Whether Dropdown is in viewport or not), setIsElementOpen(State to set when we are closing / opening the dropdown)
 */

export const useElementPositionHandler = () => {
  let [elementViewPortVisiblility, setElementViewPortVisiblility] = useState<
    boolean | undefined
  >(false)
  let [isElementOpen, setIsElementOpen] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const componentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      setElementViewPortVisiblility(
        isElementInViewport(elementRef, componentRef)
      )
    }, 0)
  }, [isElementOpen])
  return {
    elementRef,
    componentRef,
    elementViewPortVisiblility,
    setIsElementOpen,
  }
}

import { useEffect, useRef, useState } from 'react'
import { isElementInViewport } from '~/utils/common.utils'

export const useElementPositionHandler = () => {
  let [elementViewPortVisiblility, setElementViewPortVisiblility] = useState<
    boolean | undefined
  >(false)
  let [isComponentVisible, setIsComponentVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const componentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      setElementViewPortVisiblility(
        isElementInViewport(elementRef, componentRef)
      )
    }, 0)
  }, [isComponentVisible])
  return {
    elementRef,
    componentRef,
    elementViewPortVisiblility,
    setIsComponentVisible,
  }
}

import { useMatches } from '@remix-run/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import type { User } from '~/models/user.server'
const DEFAULT_REDIRECT = '/'

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== 'string') {
    return defaultRedirect
  }

  if (!to.startsWith('/') || to.startsWith('//')) {
    return defaultRedirect
  }

  return to
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches()
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  )
  return route?.data
}

function isUser(user: any): user is User {
  return user && typeof user === 'object' && typeof user.email === 'string'
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData('root')
  if (!data || !isUser(data.user)) {
    return undefined
  }
  return data.user
}

export function useUser(): User {
  const maybeUser = useOptionalUser()
  if (!maybeUser) {
    throw new Error(
      'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.'
    )
  }
  return maybeUser
}

export function validateEmail(email: unknown): email is string {
  return typeof email === 'string' && email.length > 3 && email.includes('@')
}

export function trimValue(value: string) {
  let i = 0
  let j = 0
  let str = ''
  while (i < value.length) {
    if (value.charAt(i) !== ' ' || j === 1) {
      str += value.charAt(i)
      j = 1
      if (value.charAt(i) === ' ') j--
    }
    i++
  }
  return str
}
export function checkPasswordStrength(newPassword: string) {
  let passwordStrengthCount = 0
  if (/.{8}/.test(newPassword)) {
    passwordStrengthCount = passwordStrengthCount + 1
  }
  if (/[A-Z]/.test(newPassword)) {
    passwordStrengthCount = passwordStrengthCount + 1
  }
  if (/[!@#$&*]/.test(newPassword)) {
    passwordStrengthCount = passwordStrengthCount + 1
  }
  if (/[0-9]/.test(newPassword)) {
    passwordStrengthCount = passwordStrengthCount + 1
  }
  if (/[a-z]/.test(newPassword)) {
    passwordStrengthCount = passwordStrengthCount + 1
  }
  for (let character of newPassword) {
    if (/[!@#$&*]/.test(character)) {
      passwordStrengthCount = passwordStrengthCount + 4
    }
    if (/[a-z]/.test(character)) {
      passwordStrengthCount = passwordStrengthCount + 2
    }
    if (/[A-Z]/.test(character)) {
      passwordStrengthCount = passwordStrengthCount + 2
    }
    if (/[0-9]/.test(character)) {
      passwordStrengthCount = passwordStrengthCount + 1
    }
  }
  if (passwordStrengthCount <= 15) {
    return t('commonConstants.weak')
  } else if (passwordStrengthCount > 15 && passwordStrengthCount <= 25) {
    return t('commonConstants.medium')
  } else if (passwordStrengthCount > 25) {
    return t('commonConstants.strong')
  }
}
export const usePagination = ({
  totalItems,
  pageSize,
  siblingCount,
  currentPage,
}: {
  totalItems: number
  pageSize: number
  siblingCount: number
  currentPage: number
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalItems / pageSize)
    const totalPageNumbers = siblingCount + 5
    const range = (start: number, end: number) => {
      let length = end - start + 1
      return Array.from({ length }, (_, idx) => idx + start)
    }
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    )
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2
    const firstPageIndex = 1
    const lastPageIndex = totalPageCount
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount
      let leftRange = range(1, leftItemCount)
      return [...leftRange, -1, totalPageCount]
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      )
      return [firstPageIndex, -1, ...rightRange]
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, -1, ...middleRange, -1, lastPageIndex]
    }
  }, [totalItems, pageSize, siblingCount, currentPage])
  return paginationRange
}

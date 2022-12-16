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
export function checkPasswordStrength(password: string) {
  let strength = 0
  // for length
  for (let char of password) {
    if (char) {
      strength = strength + 4
    }
  }
  // for special character
  for (let char of password) {
    if (/[^0-9a-zA-Z\s]/.test(char)) {
      strength = strength + 6
    }
  }
  // not only numbers but mixture
  for (let char of password) {
    if (!/^\d+$/.test(password) && isNaN(Number(char))) {
      strength = strength + 4
    }
  }
  // not only uppercase but mixture
  for (let char of password) {
    if (password.toUpperCase() !== password && /[A-Z]/.test(char)) {
      strength = strength + (password.length - 1) * 2
    }
  }

  //not only lowercase but mixture
  for (let char of password) {
    if (password.toLowerCase() !== password && /[a-z]/.test(char)) {
      strength = strength + (password.length - 1) * 2
    }
  }
  //requirement
  let requirementCount = 0
  if (/[a-z]/.test(password)) {
    requirementCount++
  }
  if (/[A-Z]/.test(password)) {
    requirementCount++
  }
  if (password.length >= 8) {
    requirementCount++
  }
  if (/[^0-9a-zA-Z\s]/.test(password)) {
    requirementCount++
  }
  if (/[0-9]/.test(password)) {
    requirementCount++
  }
  if (requirementCount >= 4) {
    strength = strength + requirementCount * 2
  }

  //DEDUCTIONS
  if (/^[A-Za-z]\S*$/.test(password)) {
    strength = strength - password.length
  }
  if (/^\d+$/.test(password)) {
    strength = strength - password.length
  }
  const repeated = password.match(/(.)\1/g)
  if (repeated !== null) {
    for (let charList of repeated) {
      if (charList.toLowerCase() === charList && isNaN(Number(charList))) {
        strength = strength - 2
      }
      if (charList.toUpperCase() === charList && isNaN(Number(charList))) {
        strength = strength - 2
      }
      if (!isNaN(Number(charList))) {
        strength = strength - 2
      }
    }
  }

  const TotalRepeatCount = Array.from(new Set([...password])).reduce(
    (prev, curr) => {
      let repeatCount = 0
      ;[...password].forEach((ta, i) => {
        if (ta === curr && password[i + 1] === curr) repeatCount++
      })
      repeatCount && (prev += repeatCount + 1)
      return prev
    },
    0
  )
  strength = strength - TotalRepeatCount * (TotalRepeatCount - 1)

  // sequential
  const sequentialRegex =
    /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/gi
  const sequentialValues = password.match(sequentialRegex)
  if (sequentialValues !== null) {
    for (let charList of sequentialValues) {
      if (charList.toLowerCase() === charList && !isNaN(Number(charList))) {
        strength = strength - 3
      }
      if (isNaN(Number(charList))) {
        strength = strength - 3
      }
    }
  }
  if (strength <= 30) {
    return t('commonConstants.weak')
  } else if (strength >= 31 && strength <= 80) {
    return t('commonConstants.medium')
  } else if (strength > 80) {
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

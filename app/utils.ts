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
  let weaknesses = []
  let strength = 100
  weaknesses.push(lengthWeakness(password))
  weaknesses.push(lowercaseWeakness(password))
  weaknesses.push(uppercaseWeakness(password))
  weaknesses.push(numberWeakness(password))
  weaknesses.push(specialCharactersWeakness(password))
  weaknesses.push(repeatCharactersWeakness(password))
  weaknesses.forEach((weakness) => {
    if (weakness == null) return
    strength -= weakness.deduction
  })
  if (strength <= 50) {
    return t('commonConstants.weak')
  } else if (strength > 50 && strength <= 80) {
    return t('commonConstants.medium')
  } else if (strength > 80) {
    return t('commonConstants.strong')
  }
  // all functions to check different aspects
  function lengthWeakness(password: String) {
    const length = password.length
    if (length <= 5) {
      return {
        reasong: 'length is short',
        deduction: 40,
      }
    }
    if (length <= 10) {
      return {
        reasong: 'length can be better',
        deduction: 15,
      }
    }
  }

  function uppercaseWeakness(password: string) {
    return characterTypeWeakness(password, /[A-Z]/g, 'uppercase')
  }

  function lowercaseWeakness(password: string) {
    return characterTypeWeakness(password, /[a-z]/g, 'lowercase')
  }

  function numberWeakness(password: string) {
    return characterTypeWeakness(password, /[0-9]/g, 'numbers')
  }

  function specialCharactersWeakness(password: string) {
    return characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g, 'special chars')
  }
  function repeatCharactersWeakness(password: string) {
    const matches = password.match(/(.)\1/g) || []
    if (matches.length > 0) {
      return {
        reasong: 'repeat characters',
        deduction: matches.length * 10,
      }
    }
  }
  function characterTypeWeakness(
    password: string,
    regex: RegExp,
    type: string
  ) {
    const matches = password.match(regex) || []

    if (matches.length === 0) {
      return {
        message: `Your password has no ${type}`,
        deduction: 20,
      }
    }

    if (matches.length <= 2) {
      return {
        message: `Your password could use more ${type}`,
        deduction: 5,
      }
    }
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

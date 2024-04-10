import type { FC, ReactNode } from "react"
import { createContext, useContext, useState } from "react"

interface IStorage {
  key: string
  value: any
}

type CommonContextType = {
  setCustomStorage: <T>(key: string, value?: T) => void
  getStoredValue: (key: string) => any
  clearStoredValue: (key: string) => void
  clearStorage: () => void
}

const CommonContext = createContext<CommonContextType | null>(null)

const CommonContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [storage, setStorage] = useState<IStorage[]>([])

  const setCustomStorage = <T,>(key: string, value?: T) => {
    if (storage.find((store) => store.key === key)) {
      setStorage(
        storage.map((store) =>
          store.key === key ? { ...store, value } : store
        )
      )
    } else {
      setStorage([...storage, { key, value }])
    }
  }

  const getStoredValue = (key: string) => {
    return storage.find((store) => store.key === key)
  }

  const clearStoredValue = (key: string) => {
    setStorage(storage.filter((store) => store.key !== key))
  }

  const clearStorage = () => {
    setStorage([])
  }

  return (
    <CommonContext.Provider
      value={{
        setCustomStorage,
        getStoredValue,
        clearStoredValue,
        clearStorage,
      }}
    >
      {children}
    </CommonContext.Provider>
  )
}

const useCommonContext = () => useContext(CommonContext) as CommonContextType

export { useCommonContext, CommonContextProvider }

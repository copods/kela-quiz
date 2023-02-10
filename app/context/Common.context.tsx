import type { FC, ReactNode } from "react"
import { createContext, useContext, useState } from "react"

interface IStorage {
  key: string
  value: any
}

type CommonContextType = {
  storage: IStorage[]
  toSetCustomStorage: (key: string, value?: Pick<IStorage, "value">) => void
  toGetStoredValue: (key: string) => any
  toClearStoredValue: (key: string) => void
}

const CommonContext = createContext<CommonContextType | null>(null)

const CommonContextProvider: FC<ReactNode> = ({ children }) => {
  const [storage, setStorage] = useState<IStorage[]>([])

  const toSetCustomStorage = (key: string, value?: Pick<IStorage, "value">) => {
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

  const toGetStoredValue = (key: string) => {
    return storage.find((store) => store.key === key)
  }

  const toClearStoredValue = (key: string) => {
    setStorage(storage.filter((store) => store.key !== key))
  }

  return (
    <CommonContext.Provider
      value={{
        storage,
        toSetCustomStorage,
        toGetStoredValue,
        toClearStoredValue,
      }}
    >
      {children}
    </CommonContext.Provider>
  )
}

const useCommonContext = () => useContext(CommonContext) as CommonContextType

export { useCommonContext, CommonContextProvider }

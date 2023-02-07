import type { FC, ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'

interface IStorage {
  key: string
  value: any
}

type CommonContextType = {
  storage: IStorage[]
  toSetCustomStorage: (key: string, value?: Pick<IStorage, 'value'>) => any
}

const CommonContext = createContext<CommonContextType | null>(null)

const CommonContextProvider: FC<ReactNode> = ({ children }) => {
  const [storage, setStorage] = useState<IStorage[]>([])

  const toSetCustomStorage = (key: string, value?: Pick<IStorage, 'value'>) => {
    if (key && !value) {
      return storage.find((store) => store.key === key)
    } else if (storage.find((store) => store.key === key)) {
      setStorage(
        storage.map((store) =>
          store.key === key ? { ...store, value } : store
        )
      )
    } else {
      setStorage([...storage, { key, value }])
    }
  }

  return (
    <CommonContext.Provider value={{ storage, toSetCustomStorage }}>
      {children}
    </CommonContext.Provider>
  )
}

const useCommonContext = () => useContext(CommonContext) as CommonContextType

export { useCommonContext, CommonContextProvider }

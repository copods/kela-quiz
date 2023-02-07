type IStorage = {
  key: string
  value?: any
}

let storage: IStorage[] = []

export const useCustomStorage = () => {
  const toSetCustomStorage = (key: string, value?: Pick<IStorage, 'value'>) => {
    if (key && !value) {
      return storage.find((store) => store.key === key)
    } else if (storage.find((store) => store.key === key)) {
      storage = storage.map((store) =>
        store.key === key ? { ...store, value } : store
      )
    } else {
      storage = [...storage, { key, value }]
    }
  }

  return { toSetCustomStorage }
}

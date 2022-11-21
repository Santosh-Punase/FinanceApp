import { useEffect, useState } from 'react';

import { getValue, setValue } from '../store/store';
import { StoreKey } from '../store/type';

export default function useStore(key: StoreKey): [string, (value: string) => void, boolean, boolean, () => void] {
  const [val, setVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function getStoreValue() {
    try {
      const value = await getValue(key)
      value && setVal(value);
    } catch (e) {
      // We might want to provide this error information to an error reporting service
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getStoreValue();
  }, []);

  const setStoreValue = (value: string) => {
    setVal(value)
    setValue(key, value);
  }

  return [val, setStoreValue, isLoading, isError, getStoreValue];
}

import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

interface Props {
  apiCall: () => void;
  onSuccess: (data: any) => void;
  onFailure?: () => void;
}

interface OnFocusProps {
  apiCall: () => void;
  onSuccess?: (data: any) => void;
  dataExtractor?: (data: any) => void;
  onFailure?: () => void;
}

export default function useApiCall({ apiCall, onSuccess, onFailure }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const doApiCall = async () => {
    try {
      setIsLoading(true);
      const data = await apiCall();
      setIsLoading(false);
      onSuccess(data);
    } catch (e) {
      setIsLoading(false);
      onFailure?.();
      // silent catch
    }
  }

  return { isLoading, doApiCall };
}

type UseOnFocusApiCallReturnType<T, S> =  {
  isLoading: boolean;
  data: T | S;
  setData: (d: T | S) => void;
  refetch: () => Promise<void>;
};

export function useOnFocusApiCall<T,S = T>({ apiCall, onSuccess, onFailure, initialState, dataExtractor }: OnFocusProps & { initialState: S }): UseOnFocusApiCallReturnType<T,S> {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | S>(initialState);
  
  const doApiCall = async () => {
    try {
      setIsLoading(true);
      const resp = await apiCall();
      const data = dataExtractor?.(resp) || resp;
      // @ts-ignore
      setData(data);
      onSuccess?.(data);
      setIsLoading(false);
    } catch (e) {
      onFailure?.();
      // silent catch
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      doApiCall();
    }, [])
  );

  return { isLoading, data, setData, refetch: doApiCall };
}

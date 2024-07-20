import { useState } from 'react';

interface Props {
  apiCall: () => void;
  onSuccess: () => void;
  onFailure?: () => void;
}

export default function useApiCall({ apiCall, onSuccess, onFailure }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const doApiCall = async () => {
    try {
      setIsLoading(true);
      await apiCall();
      setIsLoading(false);
      onSuccess();
    } catch (e) {
      setIsLoading(false);
      onFailure?.();
      // silent catch
    }
  }

  return { isLoading, doApiCall };
}

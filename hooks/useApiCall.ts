import { useState } from 'react';

interface Props {
  apiCall: () => void;
  onSuccess: (data: any) => void;
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

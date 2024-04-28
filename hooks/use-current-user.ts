import fetcher from '@/lib/fetcher';
import useSWR from 'swr';

const useCurrentUser = () => {
    const {
        data,
        error,
        isLoading,
        mutate
    } = useSWR('/api/current', fetcher) // current.ts

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useCurrentUser;
import * as Types from '../types/types'
import { 
    useState, 
    useEffect, 
    useContext 
} from 'react'
import { GlobalUserContext } from '../types/types';

const useFetch = <T extends unknown[]>(url: string, useEffectDependencies: T, didSubmit: boolean = false, method: 'GET' | 'POST' = 'GET', body?: Types.LoginBodyParameters) => {
    const { userDataState, dispatch } = useContext(GlobalUserContext);
    const token = userDataState?.userToken || localStorage.getItem('token');
    let timeoutId: NodeJS.Timeout | null = null;
    const [fetchResult, setFetchResult] = useState<Types.FetchResponse>({
        response: 0,
        data: null,
        error: null,
        loading: false,
    });

    const localFetchResult: Types.FetchResponse = {
        response: 0,
        data: null,
        error: null,
        loading: false,
    };

    useEffect(() => {
        if (didSubmit && (url.includes("login") || token)) {
            setFetchResult(prevState => ({
             ...prevState,
             loading: true   
            }))
            let isResponseOk: boolean = false;
            const headers: {[key: string]: string} = {
                'Content-Type': 'application/json'
            }
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            
            fetch(url, {
                method: method,
                headers: headers,
                body: body ? JSON.stringify(body) : undefined,
            })
            .then((response) => {
                if (response.status === 401 && !url.includes('login')) {
                    dispatch({ type: Types.reducerActionTypes.userToken, value: "" })
                    localStorage.clear()
                    return
                }
                isResponseOk = response.ok;
                localFetchResult.response = response.status;
                return response.json();
            })
            .then((result) => {
                if (!isResponseOk) {
                    localFetchResult.error = result;
                } else {
                    localFetchResult.data = result;
                }
            })
            .catch((error) => {
                console.log(error)
                localFetchResult.error = error;
            })
            .finally(() => {
                // the timeout is for a better demonstration of loading states
                timeoutId = setTimeout(() => {
                    localFetchResult.loading = false;
                    setFetchResult(localFetchResult)
                }, 500)
                })
        };
        }, useEffectDependencies)
    return fetchResult
}   

export default useFetch
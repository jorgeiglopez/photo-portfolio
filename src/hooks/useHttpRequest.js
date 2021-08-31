import React, { useEffect } from 'react'


const useHttpRequest = (request) => {
    const [response, setResponse] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        fetch(request.url, {
            method: request.method || 'GET',
            headers: request.headers || null,
            body: request.body? JSON.stringify(request.body) : null,
        }).then(response => {
            if(response.ok){
                setResponse(response);
            } else{
                response.json().then(data => console.log("ERROR: ", data))
            }
        }).catch(error => {
            // todo: do something!
            console.log("CATCH: ", error)
        })
    }, [JSON.stringify(request)])

    return {response, error}
    
}

export default useHttpRequest

import { useEffect, useState } from 'react';

const useHttpRequest = (request = null) => {
	const [response, setResponse] = useState();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (request && request.url) {
            console.log("Sending request to: ", request.url);
			setLoading(true);
			fetch(request.url, {
				method: request.method || 'GET',
				headers: request.headers || null,
				body: request.body ? JSON.stringify(request.body) : null,
			})
				.then((response) => {
                    
                    if (response.ok) {
						response.json().then((parsed) => {
                            setResponse(parsed);
                            setLoading(false);
                        });
					} else {
						response.json().then((parsed) => {
							console.log('Error in the response: ', parsed);
							setError(parsed.error.message);
                            setLoading(false);
						});
					}
				})
				.catch((error) => {
					setLoading(false);
					console.log('Error: ', error);
					setError('User creation failed: ' + error);
				});
		}
	}, [JSON.stringify(request)]);

	return { response, error, loading, setError };
};

export default useHttpRequest;

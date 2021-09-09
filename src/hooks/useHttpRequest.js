import { useEffect, useState } from 'react';

const useHttpRequest = (request = null) => {
	const [response, setResponse] = useState();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (request && request.url) {
			console.log('Sending request to: ', request.url);
			setLoading(true);
			fetch(request.url, {
				method: request.method || 'GET',
				headers: request.headers || null,
				body: request.body ? JSON.stringify(request.body) : null,
			})
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						return response.json().then((parsed) => {
							throw new Error(parsed.error.message);
						});
					}
				})
				.then((response) => {
					setLoading(false);
					setResponse(response);
				})
				.catch((error) => {
					setLoading(false);
					setError(error.message);
					console.error(error.message);
				});
		}
	}, [JSON.stringify(request)]);

	return { response, error, loading, setError };
};

export default useHttpRequest;

import { useState, useEffect } from 'react';

function useLocalStorage(key) {
	const [value, setValue] = useState(() => {
		const data = JSON.parse(localStorage.getItem(key));
		return data;
	});
	useEffect(() => {
		if (value !== null) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	}, [value]);

	return [value, setValue];
}

export { useLocalStorage };

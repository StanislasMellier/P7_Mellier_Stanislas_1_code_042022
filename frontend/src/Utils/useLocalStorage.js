import { useState, useEffect } from 'react';

function useLocalStorage(key, defaultValue) {
	const [value, setValue] = useState(() => {
		const StoredValue = localStorage.getItem(key);
		return StoredValue !== null ? JSON.parse(StoredValue) : defaultValue;
	});
	useEffect(() => {
		if (value === null) {
			localStorage.removeItem(key);
		} else {
			localStorage.setItem(key, JSON.stringify(value));
		}
	}, [key, value]);

	return [value, setValue];
}

export { useLocalStorage };

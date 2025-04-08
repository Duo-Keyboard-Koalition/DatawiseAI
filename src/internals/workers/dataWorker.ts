export async function fetchGraphData(month: number, year: number): Promise<string[]> {
	// Simulate an API call with hardcoded data
	return new Promise((resolve) => {
		setTimeout(() => {
			const date = new Date(year, month, 0);
			const monthName = date.toLocaleDateString('en-US', { month: 'short' });
			const daysInMonth = date.getDate();
			const days = Array.from({ length: daysInMonth }, (_, i) => `${monthName} ${i + 1}`);
			resolve(days);
		}, 1000); // Simulate network delay
	});
}

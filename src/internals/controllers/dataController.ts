import { fetchGraphData } from '../workers/dataWorker';
import { GraphData } from '../models/dataModel';

export async function getGraphData(month: number, year: number): Promise<GraphData> {
	const days = await fetchGraphData(month, year);
	return { month, year, days };
}

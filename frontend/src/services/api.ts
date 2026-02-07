import axios from 'axios';
import type { ClassInput, AnalysisResult } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function analyzeSchedule(classes: ClassInput[]): Promise<AnalysisResult> {
  const response = await axios.post(`${API_URL}/api/analyze-schedule`, { classes });
  return response.data;
}

export async function parseScheduleText(scheduleText: string): Promise<ClassInput[]> {
  const response = await axios.post(`${API_URL}/api/parse-schedule`, { scheduleText });
  return response.data.classes;
}

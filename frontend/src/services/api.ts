import axios from 'axios';
import type { ClassInput, AnalysisResult } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function analyzeSchedule(classes: ClassInput[]): Promise<AnalysisResult> {
  try {
    const response = await axios.post(`${API_URL}/api/analyze-schedule`, { classes });

    if (!response.data) {
      throw new Error('No data received from server');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.message;
      throw new Error(`Failed to analyze schedule: ${message}`);
    }
    throw error;
  }
}

export async function parseScheduleText(scheduleText: string): Promise<ClassInput[]> {
  try {
    const response = await axios.post(`${API_URL}/api/parse-schedule`, { scheduleText });

    if (!response.data || !response.data.classes) {
      throw new Error('Invalid response from server');
    }

    return response.data.classes;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.message;
      throw new Error(`Failed to parse schedule: ${message}`);
    }
    throw error;
  }
}

import axios from 'axios';
import type { ClassInput, AnalysisResult, AnalysisResultV2 } from '../types';

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

export async function analyzeScheduleV2(classes: ClassInput[]): Promise<AnalysisResultV2> {
  try {
    console.log('[V2] Calling enhanced analysis endpoint...');
    const response = await axios.post(`${API_URL}/api/analyze-schedule-v2`, { classes }, {
      timeout: 60000 // 60 second timeout for LLM processing
    });

    if (!response.data) {
      throw new Error('No data received from server');
    }

    console.log('[V2] Analysis complete:', response.data);
    return response.data;
  } catch (error) {
    console.error('[V2] Analysis error:', error);
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.response?.data?.details || error.message;
      throw new Error(`Failed to analyze schedule: ${message}`);
    }
    throw error;
  }
}

export async function parseScheduleText(scheduleText: string): Promise<ClassInput[]> {
  try {
    console.log(`Calling API: ${API_URL}/api/parse-schedule`);
    console.log(`Schedule text length: ${scheduleText.length} characters`);

    const response = await axios.post(`${API_URL}/api/parse-schedule`, { scheduleText }, {
      timeout: 30000 // 30 second timeout
    });

    console.log('API response received:', response.data);

    if (!response.data || !response.data.classes) {
      throw new Error('Invalid response from server');
    }

    if (!Array.isArray(response.data.classes)) {
      throw new Error('Response classes is not an array');
    }

    return response.data.classes;
  } catch (error) {
    console.error('Parse schedule error:', error);
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.response?.data?.details || error.message;
      throw new Error(`Failed to parse schedule: ${message}`);
    }
    throw error;
  }
}

import * as pdfjsLib from 'pdfjs-dist';
import ICAL from 'ical.js';
import type { ClassInput } from '../types';
import { parseScheduleText } from './api';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Universal file parser that accepts ANY file type (including images) and uses LLM to parse it
 */
export async function parseAnyFile(file: File): Promise<ClassInput[]> {
  try {
    // Check if it's an image file
    if (file.type.startsWith('image/')) {
      return await parseImageFile(file);
    }

    let textContent = '';

    // Extract text based on file type
    if (file.type === 'application/pdf') {
      console.log('Extracting text from PDF...');
      textContent = await extractPDFText(file);
      console.log(`Extracted ${textContent.length} characters from PDF`);
    } else if (file.type === 'text/calendar' || file.name.endsWith('.ics')) {
      textContent = await extractICSText(file);
    } else {
      // For any other text file (txt, csv, etc.), just read as text
      textContent = await file.text();
    }

    if (!textContent || textContent.trim().length === 0) {
      throw new Error('No text content found in file');
    }

    console.log('Sending to Claude AI for parsing...');
    // Use Claude AI to intelligently parse the content
    const classes = await parseScheduleText(textContent);
    console.log(`Parsed ${classes.length} classes`);

    return classes;
  } catch (error) {
    console.error('Error parsing file:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to parse file: ${errorMessage}. Please try text entry instead.`);
  }
}

async function parseImageFile(file: File): Promise<ClassInput[]> {
  // Convert image to base64
  const base64 = await fileToBase64(file);

  // Send image directly to backend for Claude vision parsing
  const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/parse-image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image: base64,
      mediaType: file.type
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(`Failed to parse image: ${errorData.error || response.statusText}`);
  }

  const data = await response.json();

  if (!data || !data.classes) {
    throw new Error('Invalid response from image parser');
  }

  return data.classes;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function extractPDFText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';

  // Extract text from all pages
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
}

async function extractICSText(file: File): Promise<string> {
  const text = await file.text();
  const jcalData = ICAL.parse(text);
  const comp = new ICAL.Component(jcalData);
  const vevents = comp.getAllSubcomponents('vevent');

  // Convert ICS events to readable text for LLM
  let scheduleText = 'Schedule from calendar:\n\n';

  vevents.forEach((vevent) => {
    const event = new ICAL.Event(vevent);
    const summary = event.summary || '';
    const description = event.description || '';
    scheduleText += `${summary}\n${description}\n\n`;
  });

  return scheduleText;
}

// Legacy functions (keep for backward compatibility)
export async function parsePDF(file: File): Promise<ClassInput[]> {
  return parseAnyFile(file);
}

export async function parseICS(file: File): Promise<ClassInput[]> {
  return parseAnyFile(file);
}

import * as pdfjsLib from 'pdfjs-dist';
import ICAL from 'ical.js';
import type { ClassInput } from '../types';
import { parseScheduleText } from './api';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function parsePDF(file: File): Promise<ClassInput[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';

    // Extract text from all pages
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    // Send to backend for parsing with Claude
    return await parseScheduleText(fullText);
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF. Please try manual entry.');
  }
}

export async function parseICS(file: File): Promise<ClassInput[]> {
  try {
    const text = await file.text();
    const jcalData = ICAL.parse(text);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents('vevent');

    const classes = new Map<string, ClassInput>();

    vevents.forEach((vevent) => {
      const event = new ICAL.Event(vevent);
      const summary = event.summary || '';

      // Try to extract course name and professor from summary
      // Typical format: "CSCI 104 - John Smith" or "CSCI 104"
      const match = summary.match(/([A-Z]+\s+\d+)\s*-?\s*(.*)?/i);

      if (match) {
        const courseName = match[1].trim();
        const professor = match[2]?.trim() || 'Unknown';

        // Use courseName as key to avoid duplicates
        if (!classes.has(courseName)) {
          classes.set(courseName, {
            courseName,
            professor,
            units: 4 // Default to 4 units
          });
        }
      }
    });

    return Array.from(classes.values());
  } catch (error) {
    console.error('Error parsing ICS:', error);
    throw new Error('Failed to parse ICS file. Please try manual entry.');
  }
}

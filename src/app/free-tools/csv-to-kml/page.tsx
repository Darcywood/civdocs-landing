import type { Metadata } from 'next';
import CsvToKmlPageContent from './_components/CsvToKmlPageContent';

export const metadata: Metadata = {
  title: 'Free CSV to KML Converter for Surveyors — CivDocs',
  description: 'Convert survey control points from CSV to Google Earth KML in seconds. See every peg on satellite imagery before you get on site. Free, no account required. Supports GDA2020 and GDA94.',
};

export default function CsvToKmlPage() {
  return <CsvToKmlPageContent />;
}

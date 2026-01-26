/**
 * Test script for job parser
 * Run with: npx tsx src/utlis/__tests__/jobParser.test.ts
 */

import { parseJobsFromText } from '../jobParser';
import * as fs from 'fs';
import * as path from 'path';

const sampleText = `
===== Anaesthetics =====
Anaesthetics – Armidale Hospital, 2350 – Consultant/Spec/Vmo | 28–30 Jan 2026 08:00–08:00 | $3500 | Job reference number: 52998
Anaesthetics – Grafton Base Hospital, 2460 – Consultant/Staff Spec/VMO | 24–28 Nov 2025 08:00–17:00 | $3250 | Job reference number: 52288

===== Women's Health - Paediatrics =====
Women's Health - Paediatrics – Hawkesbury Hospital, 2756 – Resident/Registrar/Cmo | 14 Dec 2025 08:00–20:30 | $180 | Job reference number: 47985
Women's Health - Paediatrics – Hawkesbury Hospital, 2756 – Resident/Registrar/Cmo | 15 Dec 2025 08:00–16:30 | $180 | Job reference number: 47986

===== Surgery - Urology =====
Surgery - Urology – Tamworth Hospital, 2340 – Consultant/Spec/Vmo | 19–25 Jan 2026 08:00–08:00 | $3000 | Job reference number: 49170
`;

console.log('Testing job parser...\n');

const jobs = parseJobsFromText(sampleText);

console.log(`✅ Parsed ${jobs.length} jobs\n`);

jobs.forEach((job, index) => {
  console.log(`Job ${index + 1}:`);
  console.log(`  ${job.category} – ${job.location} – ${job.jobTitle} | ${job.schedule} | $${job.pay} | Job reference number: ${job.referenceNumber}`);
  console.log('');
});

// Test with the full evo file if it exists
const evoPath = path.join(process.cwd(), 'evo');
if (fs.existsSync(evoPath)) {
  console.log('\n📄 Testing with full evo file...\n');
  const evoContent = fs.readFileSync(evoPath, 'utf-8');
  const evoJobs = parseJobsFromText(evoContent);
  
  console.log(`✅ Parsed ${evoJobs.length} jobs from evo file\n`);
  
  // Show first 5 and last 5
  console.log('First 5 jobs:');
  evoJobs.slice(0, 5).forEach((job, index) => {
    console.log(`  ${index + 1}. ${job.category} | ${job.location} | ${job.jobTitle} | ${job.schedule} | $${job.pay}`);
  });
  
  console.log('\nLast 5 jobs:');
  evoJobs.slice(-5).forEach((job, index) => {
    console.log(`  ${evoJobs.length - 4 + index}. ${job.category} | ${job.location} | ${job.jobTitle} | ${job.schedule} | $${job.pay}`);
  });
  
  // Check for categories with dashes
  const categoriesWithDashes = evoJobs.filter(job => 
    job.category.includes(' - ') && 
    (job.category.includes('Women\'s Health') || job.category.includes('Surgery'))
  );
  
  if (categoriesWithDashes.length > 0) {
    console.log(`\n✅ Successfully parsed ${categoriesWithDashes.length} jobs with multi-part categories`);
    console.log('Sample:');
    categoriesWithDashes.slice(0, 3).forEach(job => {
      console.log(`  - ${job.category}`);
    });
  }
}

console.log('\n✨ Test complete!');

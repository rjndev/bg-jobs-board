export interface ParsedJob {
  category: string;
  location: string;
  jobTitle: string;
  schedule: string;
  pay: string;
  referenceNumber?: string;
  hospital?: string;
  postcode?: string;
}

/**
 * Parses job text content and extracts structured job data
 * Format: Category – Location – Job Title | Schedule | Pay | Reference
 * Note: Categories can contain dashes (e.g., "Women's Health - Paediatrics")
 */
export function parseJobsFromText(text: string): ParsedJob[] {
  const jobs: ParsedJob[] = [];
  const lines = text.split('\n');

  let currentCategory = '';

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Skip empty lines
    if (!trimmedLine) continue;

    // Check if this is a category header (wrapped in =====)
    const categoryMatch = trimmedLine.match(/^=+\s*(.+?)\s*=+$/);
    if (categoryMatch) {
      currentCategory = categoryMatch[1].trim();
      continue;
    }

    // Skip lines that are just category headers or don't have the pipe separator
    if (!trimmedLine.includes('|')) continue;

    try {
      // Split by pipe to get main sections
      const parts = trimmedLine.split('|').map(p => p.trim());
      
      if (parts.length < 3) continue; // Need at least location info, schedule, and pay

      // First part contains: Category – Location – Job Title
      const locationInfo = parts[0];
      const schedule = parts[1];
      const pay = parts[2];

      // Extract reference number if present
      let referenceNumber = '';
      if (parts.length > 3) {
        const refMatch = parts[3].match(/Job reference number:\s*(\d+)/);
        if (refMatch) {
          referenceNumber = refMatch[1];
        }
      }

      // Parse location info: Category – Hospital, Postcode – Job Title
      // Need to handle categories with dashes like "Women's Health - Paediatrics"
      const locationParts = locationInfo.split('–').map(p => p.trim());
      
      if (locationParts.length < 3) continue;

      // If we have a category from header, use it; otherwise parse from first part
      let category = currentCategory;
      let hospital = '';
      let postcode = '';
      let jobTitle = '';

      if (locationParts.length === 3) {
        // Standard format: Category – Location – Job Title
        if (!category) category = locationParts[0];
        const locationDetail = locationParts[1];
        jobTitle = locationParts[2];

        // Extract hospital and postcode from location
        const locationMatch = locationDetail.match(/^(.+?),\s*(\d{4})$/);
        if (locationMatch) {
          hospital = locationMatch[1].trim();
          postcode = locationMatch[2];
        } else {
          hospital = locationDetail;
        }
      } else if (locationParts.length > 3) {
        // Category might contain dashes, so last part is job title, second-to-last is location
        jobTitle = locationParts[locationParts.length - 1];
        const locationDetail = locationParts[locationParts.length - 2];
        
        // Everything before location is category
        if (!category) {
          category = locationParts.slice(0, -2).join(' - ').trim();
        }

        // Extract hospital and postcode
        const locationMatch = locationDetail.match(/^(.+?),\s*(\d{4})$/);
        if (locationMatch) {
          hospital = locationMatch[1].trim();
          postcode = locationMatch[2];
        } else {
          hospital = locationDetail;
        }
      }

      // Build location string
      const location = postcode ? `${hospital}, ${postcode}` : hospital;

      // Clean up pay (remove dollar signs, extra spaces)
      const cleanPay = pay.replace(/^\$/, '').trim();

      jobs.push({
        category,
        location,
        jobTitle,
        schedule,
        pay: cleanPay,
        referenceNumber,
        hospital,
        postcode,
      });
    } catch (error) {
      console.error('Error parsing line:', trimmedLine, error);
      // Continue to next line if parsing fails
    }
  }

  return jobs;
}

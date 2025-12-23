# Job Parser API

## Overview
API endpoint that parses job listings from uploaded files (TXT, PDF, DOCX) and extracts structured job data.

## Endpoint
```
POST /api/jobs/parse
```

## Supported File Types
- Plain text (`.txt`)
- PDF (`.pdf`)
- Microsoft Word (`.docx`)

## Extracted Data Fields
- **Category**: Job category (e.g., "Anaesthetics", "Women's Health - Paediatrics")
- **Location**: Full location string (Hospital, Postcode)
- **Hospital**: Hospital name
- **Postcode**: 4-digit postcode
- **Job Title**: Position title (e.g., "Consultant/Spec/Vmo")
- **Schedule**: Date and time range
- **Pay**: Payment amount (numeric value without $ sign)
- **Reference Number**: Job reference ID

## Installation

First, install required dependencies:

```powershell
npm install mammoth pdf-parse
npm install --save-dev @types/pdf-parse
```

## Usage

### Using cURL
```powershell
curl -X POST http://localhost:3000/api/jobs/parse `
  -F "file=@path/to/jobs.txt"
```

### Using PowerShell
```powershell
$file = Get-Item "path/to/jobs.txt"
$form = @{
    file = $file
}
Invoke-RestMethod -Uri "http://localhost:3000/api/jobs/parse" `
  -Method Post -Form $form
```

### Using JavaScript/Fetch
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('/api/jobs/parse', {
  method: 'POST',
  body: formData,
});

const data = await response.json();
console.log('Parsed jobs:', data.jobs);
```

## Response Format

### Success Response
```json
{
  "success": true,
  "count": 150,
  "jobs": [
    {
      "category": "Anaesthetics",
      "location": "Armidale Hospital, 2350",
      "hospital": "Armidale Hospital",
      "postcode": "2350",
      "jobTitle": "Consultant/Spec/Vmo",
      "schedule": "28–30 Jan 2026 08:00–08:00",
      "pay": "3500",
      "referenceNumber": "52998"
    },
    {
      "category": "Women's Health - Paediatrics",
      "location": "Hawkesbury Hospital, 2756",
      "hospital": "Hawkesbury Hospital",
      "postcode": "2756",
      "jobTitle": "Resident/Registrar/Cmo",
      "schedule": "14 Dec 2025 08:00–20:30",
      "pay": "180",
      "referenceNumber": "47985"
    }
  ]
}
```

### Error Response
```json
{
  "error": "No file provided"
}
```

## Expected Input Format

The parser expects job listings in the following format:

```
===== Category Name =====
Category – Hospital, Postcode – Job Title | Schedule | $Pay | Job reference number: 12345

===== Another Category =====
Another Category – Hospital, Postcode – Job Title | Schedule | $Pay | Job reference number: 67890
```

### Key Format Rules:
1. Categories are wrapped in `=====`
2. Jobs use `–` (en-dash) to separate: Category, Location, Job Title
3. Jobs use `|` (pipe) to separate: Location Info, Schedule, Pay, Reference
4. Categories can contain dashes (e.g., "Women's Health - Paediatrics")
5. Location format: `Hospital Name, Postcode`
6. Pay can include or exclude `$` symbol

## Testing

### Test the Parser Locally
```powershell
# Run the test script
npx tsx src/utlis/__tests__/jobParser.test.ts
```

### Test with Sample File
```powershell
# Using the evo sample file
curl -X POST http://localhost:3000/api/jobs/parse `
  -F "file=@evo"
```

## Error Handling

The API handles various error cases:
- Missing file: `400 Bad Request`
- Unsupported file type: `400 Bad Request`
- PDF parsing failure: `500 Internal Server Error`
- Word document parsing failure: `500 Internal Server Error`
- General parsing errors: `500 Internal Server Error`

## Notes

- The parser is designed to handle categories with internal dashes (e.g., "Women's Health - Paediatrics")
- Empty lines and malformed entries are skipped
- Pay values are returned without the `$` symbol for easier numeric processing
- Reference numbers are optional and will be empty string if not present

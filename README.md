# Email Extractor App

A modern React application that extracts email addresses from any webpage with a clean, responsive interface.

## Features

- **URL-based Email Extraction**: Extract emails from any webpage by entering its URL
- **Copy Functionality**: Copy individual emails or all emails at once
- **Real-time Validation**: URL format validation with instant feedback
- **Loading States**: Visual loading indicators during API calls
- **Error Handling**: Comprehensive error handling for network issues and invalid URLs
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library

## API Integration

```
GET https://email-extractor-0oyz.onrender.com/extract-emails?url=https://example.com
```

Response format:

```json
{
  "emails": ["hello@example.com", "contact@example.com", "support@example.com"]
}
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/email-extractor-app.git
cd email-extractor-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

## Usage

1. Enter a valid URL in the input field (e.g., `https://example.com`)
2. Click the "Extract Emails" button
3. View the extracted emails in the results section
4. Copy individual emails or all emails at once

## Author

Built by [Haris Ejaz](https://haris-ejaz-portfolio.vercel.app/)

Licensed under the MIT License.

> Let me know if you'd like me to tailor it for deployment (e.g. Netlify, Vercel), or generate a `LICENSE` file and badges too.

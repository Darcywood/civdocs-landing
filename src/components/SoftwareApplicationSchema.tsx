/**
 * SoftwareApplication JSON-LD Schema Component
 * 
 * Server-side rendered JSON-LD schema for Google Search and AI Overviews.
 * Establishes CivDocs as a SoftwareApplication entity to prevent misclassification.
 * 
 * Based on schema.org SoftwareApplication specification:
 * https://schema.org/SoftwareApplication
 */

interface SoftwareApplicationSchemaProps {
  /**
   * Page-specific URL (defaults to homepage)
   * Must be absolute URL for canonical consistency
   */
  url?: string;
  
  /**
   * Page-specific name/title override
   * Defaults to "CivDocs - Civil Construction Management Software"
   */
  name?: string;
  
  /**
   * Alternate name for disambiguation
   * e.g., "CivDocs Construction Software"
   */
  alternateName?: string;
  
  /**
   * Page-specific description override
   * Defaults to standard description
   */
  description?: string;
}

export default function SoftwareApplicationSchema({
  url = "https://www.civdocs.com.au",
  name = "CivDocs - Civil Construction Management Software",
  alternateName,
  description = "All-in-one civil construction software: digital pre-starts, timesheets, plant hire logbooks, cost tracking, and AI-powered insights. Start free trial.",
}: SoftwareApplicationSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": ["Web", "iOS", "Android"],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "AUD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.civdocs.com.au/pricing",
      "priceValidUntil": "2026-12-31",
    },
    "featureList": [
      "Digital pre-start safety checklists",
      "Mobile timesheet tracking",
      "Plant hire logbook management",
      "Real-time cost tracking",
      "AI-powered insights (Crank.ai)",
      "Automated reporting",
      "Supervisor approval workflows",
      "Multi-project management",
    ],
    "screenshot": "https://www.civdocs.com.au/CivDocs-logo-1000x400.svg",
    "softwareVersion": "2.0",
    "releaseNotes": "https://www.civdocs.com.au/support",
    "downloadUrl": "https://app.civdocs.com.au/auth/signup",
    "installUrl": "https://app.civdocs.com.au/auth/signup",
    "softwareHelp": "https://www.civdocs.com.au/support",
    "supportingData": {
      "@type": "DataCatalog",
      "name": "CivDocs Knowledge Base",
      "url": "https://www.civdocs.com.au/guides",
    },
    "publisher": {
      "@id": "https://www.civdocs.com.au/#organization",
    },
    "brand": {
      "@id": "https://www.civdocs.com.au/#brand",
    },
    "author": {
      "@id": "https://www.civdocs.com.au/#organization",
    },
    "url": url,
    "inLanguage": "en-AU",
    "audience": {
      "@type": "Audience",
      "audienceType": "Business",
      "geographicArea": {
        "@type": "Country",
        "name": "Australia",
      },
    },
    "keywords": "civil construction, construction management, plant hire, timesheets, logbooks, prestarts, cost tracking, construction software, civil contractor, Australia",
    "industry": "Construction",
    "applicationSubCategory": "Construction Management Software",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "permissions": "Internet connection required",
    "softwareRequirements": "Web browser (Chrome, Firefox, Safari, Edge)",
    "processorRequirements": "Any modern device",
    "storageRequirements": "Cloud-based, no local storage required",
    "memoryRequirements": "Minimum 2GB RAM",
    "datePublished": "2023-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
  };

  // Add alternateName if provided
  if (alternateName) {
    schema.alternateName = alternateName;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}


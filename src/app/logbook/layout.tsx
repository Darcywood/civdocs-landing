import SoftwareApplicationSchema from "@/components/SoftwareApplicationSchema";

export default function LogbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SoftwareApplicationSchema 
        url="https://civdocs.com.au/logbook"
        name="CivDocs Logbook - Digital Plant Hire Management"
        description="Digital logbook for machine hours, attachments, and plant hire. Timestamped entries with supervisor approval, flowing directly to invoices."
      />
      {children}
    </>
  );
}


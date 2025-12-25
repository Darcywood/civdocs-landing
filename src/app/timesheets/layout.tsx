import SoftwareApplicationSchema from "@/components/SoftwareApplicationSchema";

export default function TimesheetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SoftwareApplicationSchema 
        url="https://civdocs.com.au/timesheets"
        name="CivDocs Timesheets - Digital Crew Hours Tracking"
        description="Log crew hours quickly and accurately with automated calculations. Mobile-friendly timesheets with supervisor approval workflows for honest payroll."
      />
      {children}
    </>
  );
}


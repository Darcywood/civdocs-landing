import SoftwareApplicationSchema from "@/components/SoftwareApplicationSchema";

export default function PrestartsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SoftwareApplicationSchema 
        url="https://civdocs.com.au/prestarts"
        name="CivDocs Pre-Starts - Digital Safety Checklists"
        description="Complete safety checks in 3 simple steps with digital pre-starts. Ensure your crew is ready with automated PDFs, supervisor alerts, and compliance tracking."
      />
      {children}
    </>
  );
}


import SoftwareApplicationSchema from "@/components/SoftwareApplicationSchema";

export default function CostTrackingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SoftwareApplicationSchema 
        url="https://civdocs.com.au/cost-tracking"
        name="CivDocs Cost Tracking - Real-Time Project Expenses"
        description="Track project expenses and costs in real-time with detailed breakdowns. Monitor budget vs actual, labour costs, plant hours, and scope progress."
      />
      {children}
    </>
  );
}


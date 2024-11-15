import DashboardHeader from "@/components/layout/dashboard-header";

export default async function DashboardLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const { children } = props;

  return (
    <>
      <DashboardHeader logoLink="/grower-dashboard" />
      {children}
    </>
  );
}

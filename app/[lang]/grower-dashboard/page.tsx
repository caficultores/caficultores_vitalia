import { getCertificatesRequestedByUserId } from "@/app/actions";
import GrowerDashboardScreen from "@/components/screen/dashboard/grower-dashboard-screen";

export default async function GrowerDashboard() {
  const pendingCertificates = await getCertificatesRequestedByUserId();

  return <GrowerDashboardScreen pendingCertificates={pendingCertificates} certificates={[]} />;
}

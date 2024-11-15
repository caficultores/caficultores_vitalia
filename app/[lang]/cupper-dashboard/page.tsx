import {
  getCertificatesByUserEmail,
  getInProgressCertificateRequests,
  getPendingCertificateRequests,
} from "@/app/actions";
import { auth } from "@/auth";
import { CupperDashboardScreen } from "@/components/screen/dashboard/cupper-dashboard-screen";

export default async function CupperDashboard() {
  const pendingCertificateRequests = await getPendingCertificateRequests();
  const inProgressCertificateRequests = await getInProgressCertificateRequests();

  const session = await auth();

  if (!session || !session.user) {
    throw new Error('Authentication required');
  }

  const completedCertificates = await getCertificatesByUserEmail(session.user.email as string);

  return (
    <CupperDashboardScreen
      pedingCertificateRequests={pendingCertificateRequests}
      inProgressCertificateRequests={inProgressCertificateRequests}
      completedCertificates={completedCertificates}
    />
  );
}

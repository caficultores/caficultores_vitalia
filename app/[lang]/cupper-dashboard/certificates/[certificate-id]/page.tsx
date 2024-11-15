import { getCertificateById } from "@/app/actions";
import { CertificateScreen } from "@/components/screen/dashboard/certificate";
import { Certificate, Municipality, Province, CertificationRequest, CoffeeVariety, City } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function CertificatePage({
  params,
}: {
  params: Promise<{   "certificate-id": string }>;
}) {
  const certificateId = (await params)["certificate-id"];
  const certificate = await getCertificateById(certificateId) as unknown as Certificate & {
    certification_request: CertificationRequest & { coffee_varieties: CoffeeVariety[] } & {
      municipality: Municipality;
    } & { city: City } & { province: Province };
  };

  if (!certificate) {
    notFound();
  }

  return <CertificateScreen certificate={certificate} />;
}

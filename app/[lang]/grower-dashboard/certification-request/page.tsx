import { getProcessingMethods, getProvinces, getVarieties } from "@/app/actions";
import { CertificationRequestScreen } from "@/components/screen/dashboard/certification-request";

const CertificationRequest = async () => {
  const coffeeVarieties = await getVarieties();
  const processingMethods = await getProcessingMethods();
  const provinces = await getProvinces();
  return (
    <CertificationRequestScreen
      coffeeVarieties={coffeeVarieties}
      processingMethods={processingMethods}
      provinces={provinces}
    />
  );
};

export default CertificationRequest;

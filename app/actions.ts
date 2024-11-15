"use server";

import { z } from "zod";
import { cookies } from "next/headers";

import { CertificationRequestSchema } from "@/schemas";
import { db } from "@/lib/db";
import { auth, signIn, signOut } from "@/auth";
import { web3auth } from "@/lib/web3auth";

export async function setLangCookie(lang: string) {
  const cookieStore = await cookies();
  cookieStore.set("lang", lang);
}

export async function setRoleCookie(role: string) {
  const cookieStore = await cookies();
  cookieStore.set("role", role);
}

export async function getLangCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("lang")?.value;
}

export async function getUserByEmail(email: string) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export async function handleSignIn() {
  await signIn("google");
}

export async function handleSignOut() {
  await signOut();
  await web3auth.logout();
}

export async function getVarieties() {
  const varieties = await db.coffeeVariety.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return varieties;
}

export async function getProcessingMethods() {
  const processingMethods = await db.processingMethod.findMany();
  return processingMethods;
}

export async function getProvinces() {
  const provinces = await db.province.findMany({ orderBy: { name: "asc" } });
  return provinces;
}

export async function getCities(provinceId: string) {
  const cities = await db.city.findMany({
    where: {
      provinceId
    },
    orderBy: {
      name: "asc"
    }
  });
  return cities;
}

export async function createCertificationRequest(
  data: z.infer<typeof CertificationRequestSchema>
) {
  const validatedFields = CertificationRequestSchema.safeParse(data);
  if (!validatedFields.success) throw new Error("Invalid data");

  const session = await auth();

  if (!session?.user) throw new Error("Unauthorized");

  const user = await getUserByEmail(session.user.email as string);
  if (!user) throw new Error("User not found");

  const {
    processingMethod: processingMethodId,
    variety: varietyId,
    harvestDate,
    altitude,
    sampleQuantity,
    analysisExpectations,
    province: provinceId,
    city: cityId,
    village,
    district,
    farmName,
    coffeeName,
  } = validatedFields.data;

  const date = new Date(harvestDate);

  const certificationStatus = await db.certificationStatus.findFirst({
    where: {
      name: "PENDING",
    },
  });

  const certificationStatusId = certificationStatus?.id;

  const certificationRequest = await db.certificationRequest.create({
    data: {
      user: {
        connect: { id: user.id },
      },
      certification_status: {
        connect: { id: certificationStatusId },
      },
      processing_method: {
        connect: { id: processingMethodId },
      },
      province: {
        connect: { id: provinceId },
      },
      city: {
        connect: { id: cityId },
      },
      village,
      district,
      farm_name: farmName,
      coffee_name: coffeeName,
      coffee_varieties: {
        create: {
          coffee_variety: {
            connect: { id: varietyId },
          },
        },
      },
      harvest_date: date,
      altitude: Number(altitude),
      quantity: Number(sampleQuantity),
      expected_results: analysisExpectations,
    },
  });
  return certificationRequest;
}

export async function getCertificationRequestById(id: string) {
  const certificationRequest = await db.certificationRequest.findUnique({
    where: { id },
    include: {
      user: true,
      province: true,
      processing_method: true,
      certification_status: true,
      coffee_varieties: true,
      city: true,
      municipality: true,
    },
  });

  if (!certificationRequest) {
    return null;
  }

  const coffeeVarietiesPromises = certificationRequest.coffee_varieties.map((variety) =>
    db.coffeeVariety.findUnique({
      where: { id: variety.coffee_varieties_id }
    })
  );

  const coffeeVarieties = await Promise.all(coffeeVarietiesPromises);

  return {
    ...certificationRequest,
    coffee_varieties: coffeeVarieties
  };
}

export async function getPendingCertificateRequests() {
  const pendingCertificateRequests = await db.certificationRequest.findMany({
    where: { certification_status: { name: "PENDING" } },
    include: {
      coffee_varieties: {
        include: {
          coffee_variety: true
        }
      }
    }
  });

  return pendingCertificateRequests;
}

export async function getInProgressCertificateRequests() {
  const inProgressCertificateRequests = await db.certificationRequest.findMany({
    where: { certification_status: { name: "IN_PROGRESS" } },
  });
  return inProgressCertificateRequests;
}

export async function getCertificatesByUserEmail(email: string) {
  const user = await db.user.findUnique({ where: { email } })

  const completedCertificates = await db.certificate.findMany({
    where: {
      OR: [
        { cupper_id: user?.id },
        { growers_id: user?.id }
      ]
    },
    include: {
      certification_request: {
        include: {
          coffee_varieties: {
            include: {
              coffee_variety: true
            }
          }
        }
      }
    }
  });

  return completedCertificates;
}

export async function getCertificatesRequestedByUserId() {
  const session = await auth();

  if (!session?.user) throw new Error("Unauthorized");

  const user = await getUserByEmail(session.user.email as string);
  if (!user) throw new Error("User not found");

  const certificates = await db.certificationRequest.findMany({
    where: { user: { email: user.email }, },
    include: {
      certification_status: true
    }
  });

  return certificates;
}

export async function getCertificateById(id: string) {
  const certificate = await db.certificate.findUnique({
    where: { id },
    include: {
      certification_request: {
        include: {
          province: true,
          city: true,
          municipality: true,
          coffee_varieties: {
            include: {
              coffee_variety: true
            }
          }
        }
      }
    }
  });
  return certificate;
}

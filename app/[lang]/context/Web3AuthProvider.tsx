"use client";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { IProvider } from "@web3auth/base";


import { web3auth, decodeToken } from "@/lib/web3auth";

type Web3AuthContextType = {
  provider: IProvider | null;
  publicAddress: string | null;
  isLoading: boolean;
};

const Web3AuthContext = createContext<Web3AuthContextType>({
  provider: null,
  publicAddress: null,
  isLoading: true,
});


function Web3AuthProvider({ children }: { children: ReactNode }) {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [publicAddress, setPublicAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    const init = async () => {

      try {
        if (web3auth.status === "not_ready") {
          await web3auth.init();
        }
        if (web3auth.status === "connected") {
          const provider = web3auth.provider;
          setProvider(provider);
          const accounts = await provider?.request({ method: "eth_accounts" });
          if (accounts && (accounts as unknown as []).length > 0) {
            setPublicAddress((accounts as unknown as string[])[0]);
          }
        } else if (session?.idToken) {
          const { payload } = decodeToken<{ email: string }>(session.idToken);
          const provider = await web3auth.connect({
            verifier: "google-cafi",
            verifierId: payload.email,
            idToken: session.idToken,
          });
          const accounts = await provider?.request({ method: "eth_accounts" });
          if (accounts && (accounts as unknown as []).length > 0) {
            setPublicAddress((accounts as unknown as string[])[0]);
          }
          setProvider(provider);
        }
      } catch (error) {
        console.error("Error initializing & connecting to web3auth:", error);
        setProvider(null);
        setPublicAddress(null);
      } finally {
        setIsLoading(false);
      }
    };
    if (session) {
      init();
    }
  }, [session]);

  const value = useMemo(() => ({
    provider,
    publicAddress,
    isLoading,
  }), [isLoading, provider, publicAddress]);

  return <Web3AuthContext.Provider value={value}>{children}</Web3AuthContext.Provider>;
}

export default Web3AuthProvider;

import { AuthenticationStatus } from "@rainbow-me/rainbowkit";
import { useReferralGetUser } from "hooks/useReferralGetUser";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { Chain, useAccount, useNetwork } from 'wagmi';

// define the props
type AuthState = {
  isSignedIn: boolean;
  isSupportedChain: boolean;
  address: `0x${string}` | undefined;
  chain: Chain | undefined;
  refProgram: {
    myReferral: `0x${string}` | undefined;
    refreshReferral: (() => any) | undefined;
  };
};

// 1. create a context with AuthState and initialize it to null
export const AuthContext = createContext<AuthState>({
  isSignedIn: false,
  isSupportedChain: true,
  address: undefined,
  chain: undefined,
  refProgram: {
    myReferral: undefined,
    refreshReferral: () => {}
  }
});

const useAuth = (): AuthState => {
  // 2. use the useContext hook
  const context = useContext(AuthContext);

  // 3. Make sure it's not null!
  if (!context) {
    throw new Error("Please use AuthProvider in parent component");
  }

  return context;
};

type AuthProviderProps = {
  status: AuthenticationStatus;
  chains: Chain[];
} & PropsWithChildren;

export const AuthProvider = ({ status, chains, children }: AuthProviderProps) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const { address } = useAccount();
  const refProgram = useReferralGetUser(address);
  const { chain } = useNetwork()
  const isSupportedChain = chain ? chains.map(chain => chain.id).includes(chain?.id) : false;

  useEffect(() => {
    setIsSignedIn(status === 'authenticated')
  }, [status])

  return (
    <AuthContext.Provider value={{ isSignedIn, isSupportedChain, refProgram, address, chain }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;

// define the props
import * as AuthSession from "expo-auth-session";
import { createContext, ReactNode, useEffect, useState } from "react";
// import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  children: ReactNode;
}

interface AuthContextData {
  signInWithGoggle(): Promise<void>;
  // signInWithApple(): Promise<void>
  signOut(): Promise<void>;
  user: UserProps;
  isLoading: boolean;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState({} as UserProps);
  const [isLoading, setIsLoading] = useState(true);
  const userStorageKey = "@goFinances:user";

  useEffect(() => {
    async function LoudUserStoregeData() {
      const data = await AsyncStorage.getItem(userStorageKey);

      if (data) {
        const userLogged = JSON.parse(data);
        setUser(userLogged);
      }
      setIsLoading(false);
    }

    LoudUserStoregeData();
  }, []);

  async function signOut() {
    setUser({} as UserProps);
    await AsyncStorage.removeItem(userStorageKey);
  }

  async function signInWithGoggle() {
    try {
      const RESPONSE_TYPE = "token";
      const ESCOPO = encodeURI("profile email");
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${ESCOPO}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();
        const userLogged = {
          id: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }

  // async function signInWithApple(){
  //     try {
  //         const credential = await AppleAuthentication.signInAsync({
  //             requestedScopes: [
  //                 AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //                 AppleAuthentication.AppleAuthenticationScope.EMAIL
  //             ]
  //         })

  //         if(credential){
  //             const userLogged = {
  //                 id: credential.user,
  //                 name: credential.fullName!.givenName!,
  //                 email: credential.email!,
  //                 photo: `https://ui.avatars.com/api/?name=${credential.fullName!.givenName!}&length=1`
  //             }
  //             setUser(userLogged)
  //             await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
  //         }
  //     } catch (error:any) {
  //         throw new Error(error)
  //     }
  // }

  return (
    <AuthContext.Provider
      value={{ signInWithGoggle, signOut, user, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

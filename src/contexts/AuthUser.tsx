import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { api } from "src/services/axios";

export interface IUser {
  id: string;
  name: string;
  avatar: string;
}

interface AuthUserProviderProps {
  children: ReactNode
}

interface IAuthUserContext {
  user: IUser
  setUser: Dispatch<SetStateAction<IUser>>
}

const AuthUserContext = createContext({} as IAuthUserContext)

export function AuthUserProvider({ children }: AuthUserProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser)

  async function handleGetInfoUsers() {
    const id = localStorage.getItem('fakeToken')

    const { data } = await api.get(`/users/${id}`)
  
    setUser(data.user)
  }

  useEffect(() => {
    if (!localStorage.getItem('fakeToken')) {
      return
    }

    if (!user.id) {
      handleGetInfoUsers()
    }
  }, [])

  return (
    <AuthUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthUserContext.Provider>
  );
}

export function useAuthUser() {
  const context = useContext(AuthUserContext)

  return context
}
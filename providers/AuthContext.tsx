'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/lib/supabase';
import { AuthChangeEvent, User } from '@supabase/supabase-js';
import { showToast } from '@/utils/toast';
import Loading from '@/components/ui/loading/Loading';

type AuthContextType = {
  user: User | null
  event: AuthChangeEvent | undefined
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [event, setEvent] = useState<AuthChangeEvent | undefined>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 로그인 정보를 불러올 때
    const getSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if(error) throw new Error(error.message);

        setUser(data.session?.user ?? null);
        setLoading(false);
      } catch (err) {
        showToast("error", "세션을 불러오는 도중 문제가 발생했습니다.");
        console.log(err);
      }
    }

    getSession();

    // 로그인 변화가 감지되었을 때
    const { data } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setEvent(event);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      data.subscription.unsubscribe();
    }
  }, []);

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if(error) throw new Error(error.message);
      
      window.google?.accounts.id.disableAutoSelect();

      showToast("success", "로그아웃 되었습니다");
      setUser(null);
    } catch (err) {
      showToast("error", "로그아웃에 실패했습니다");
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, event, logout }}>
      {loading && <Loading />}
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
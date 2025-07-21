"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
   const [loading, setLoading] = useState(true);
  const router = useRouter()
  useEffect(()=>{
    router.refresh()
     setLoading(false);
  }, [router]) 
  return <>{loading ? <div>Loading...</div> : children}</>;
}

export default AuthLayout
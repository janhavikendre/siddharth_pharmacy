'use client'

import { usePathname } from 'next/navigation'
import Header from './header'

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.includes('admin')

  return (
    <>
      {!isAdminRoute && <Header />}
      {children}
    </>
  )
}

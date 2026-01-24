import type { Metadata } from 'next'
import AdminShell from '@/components/admin/AdminShell'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Local Services',
  description: 'Comprehensive admin dashboard for local services platform management',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminShell>{children}</AdminShell>
}
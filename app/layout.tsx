import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {TasksProvider} from './context/Tasks'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Task Manager By Omar Bassatni',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <TasksProvider>
      <body className={inter.className}>{children}</body>
      </TasksProvider>
    </html>
  )
}

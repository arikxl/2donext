import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: '2doNEXT',
  description: 'Arik Alexandrov',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-[#F5F6F8]'>{children}</body>
    </html>
  )
}

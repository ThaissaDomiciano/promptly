import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Header } from '@/components/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="pt-br" className="dark"> 
        <body className="min-h-screen bg-background antialiased">
          <Header />
            {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
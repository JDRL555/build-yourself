import GlobalProvider from '@/utils/redux/GlobalProvider'
import '@/static/globals.css'

export const metadata = {
  title: 'Build Yourself',
  description: 'App that will help you to distribute your workout routine',
  icons: {
    icon: '/ejercicio.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  )
}

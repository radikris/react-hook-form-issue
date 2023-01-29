import ProfileProvider from '../context/ProfileContext'
import '../styles/globals.css'
import React, { Suspense } from 'react';

function MyApp({ Component, pageProps }) {
  return <React.Suspense fallback={<div>Loading...</div>}>

  <ProfileProvider>
  <Component {...pageProps} />
  </ProfileProvider>
  </React.Suspense>
}

export default MyApp

'use client';

import React from 'react'

import { SessionProvider } from 'next-auth/react';

const Provider = ({ children, session }) => {
  return (
    
    // wrap the application with the SessionProvider to manage user session
    <SessionProvider session = {session}>
        {children}
    </SessionProvider>
  )
}

export default Provider
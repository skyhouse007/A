import React from 'react';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { AppProvider } from './context/AppContext.js';
import MainApp from './MainApp.jsx';
import LoginScreen from './components/LoginScreen.jsx';

// Replace with your actual Clerk publishable key
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_your_key_here';

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <AppProvider>
        <SignedIn>
          <MainApp />
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </AppProvider>
    </ClerkProvider>
  );
}

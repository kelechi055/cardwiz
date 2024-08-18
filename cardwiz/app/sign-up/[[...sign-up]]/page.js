'use client';
import Image from "next/image";
import { SignedIn, SignedOut, UserButton, SignIn, SignUp } from "@clerk/nextjs";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import Head from 'next/head';

export default function SignInPage() {
  return (
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundImage: 'url(/signin.png)', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    padding: 0,
    margin: 0,
  }}
>
      <Head>
        <title>Sign Up - CardWiz</title>
        <meta name="description" content="Sign up for a CardWiz account" />
        <link rel="icon" href="/cardwizard.png" />
      </Head>

      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: 'transparent', width: '100%' }}>
        <Toolbar>
          <Image src="/cardwizard.png" alt="CardWiz Logo" width={40} height={40} style={{ marginRight: '16px' }} />
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
            CardWiz
          </Typography>
          <SignedOut>
            <Button 
              color="inherit" 
              href="/" 
              sx={{ 
                fontWeight: 'normal', 
                textTransform: 'none',
                color: '#999999',
                '&:hover': {
                  color: '#f1f1f1'
                }
              }}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              href="/#features" 
              sx={{ 
                fontWeight: 'normal', 
                textTransform: 'none',
                color: '#999999',
                '&:hover': {
                  color: '#f1f1f1'
                }
              }}
            >
              Features
            </Button>
            <Button 
              color="inherit" 
              href="/#pricing" 
              sx={{ 
                fontWeight: 'normal', 
                textTransform: 'none',
                color: '#999999',
                '&:hover': {
                  color: '#f1f1f1',
                }
              }}
            >
              Pricing
            </Button>
            <Button 
              color="inherit" 
              href="/sign-in" 
              sx={{ 
                fontWeight: 'normal', 
                textTransform: 'none',
                color: '#999999',
                '&:hover': {
                  color: '#f1f1f1'
                }
              }}
            >
              Sign In
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      {/* Navbar End */}

      {/* Sign Up Section */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
        <Box sx={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              color: 'white',
              mb: 3,
              animation: 'slideDown 1s',
            }}
          >
            Welcome to CardWiz! Sign Up to access your account.
          </Typography>
          <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
        </Box>
      </Box>
    </Box>
  );
}

'use client';
import Image from "next/image";
import { SignedIn, SignedOut, UserButton, SignUp } from "@clerk/nextjs";
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Head from 'next/head';
import { useState } from "react";

export default function SignUpPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

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
      </Head>

      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: 'transparent', width: '100%' }}>
        <Toolbar sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'space-between' }}>
          <Button
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              p: 0 
            }}
            href="/" 
          >
            <Image src="/cardwizard.png" alt="CardWiz Logo" width={40} height={40} style={{ marginRight: '16px' }} />
            <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff', fontWeight: 'normal', 
                textTransform: 'none', }}>
              CardWiz
            </Typography>
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', textTransform: 'none', }}>
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
          </Box>
        </Toolbar>
        <Toolbar sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'space-between' }}>
          <Button
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              p: 0 
            }}
            href="/" 
          >
            <Image src="/cardwizard.png" alt="CardWiz Logo" width={40} height={40} style={{ marginRight: '16px' }} />
            <Typography variant="h6" sx={{ color: '#fff', textTransform: 'none', }}>
              CardWiz
            </Typography>
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <UserButton />
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleDrawerToggle}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Navbar End */}

      {/* Drawer Menu */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <List>
            <ListItem button component="a" href="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component="a" href="/#features">
              <ListItemText primary="Features" />
            </ListItem>
            <ListItem button component="a" href="/#pricing">
              <ListItemText primary="Pricing" />
            </ListItem>
            <SignedOut>
              <ListItem button component="a" href="/sign-in">
                <ListItemText primary="Sign In" />
              </ListItem>
            </SignedOut>
          </List>
        </Box>
      </Drawer>

      {/* Sign Up Section */}
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          color: 'white',
          px: { xs: 2, sm: 4 },  // Add horizontal padding on smaller screens
          py: { xs: 4, sm: 6 }   // Add vertical padding on smaller screens
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              color: 'white',
              mb: 3,
              fontSize: { xs: 'h5.fontSize', sm: 'h4.fontSize' }, // Responsive font size
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

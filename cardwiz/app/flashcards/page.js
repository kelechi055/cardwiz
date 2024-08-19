// components/Navbar.js

'use client';

import React, { useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  Box,
  List,
  ListItem,
} from '@mui/material';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleNavClick = (href) => {
    setOpen(false);
    window.location.href = href;
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Button
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 0,
            }}
            onClick={() => handleNavClick('/')}
          >
            <Image src="/cardwizard.png" alt="CardWiz Logo" width={40} height={40} style={{ marginRight: '16px' }} />
            <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff', fontWeight: 'normal', textTransform: 'none' }}>
              CardWiz
            </Typography>
          </Button>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}></Typography>
          <SignedOut>
            <Button
              color="inherit"
              href="#home"
              sx={{
                fontWeight: 'normal',
                textTransform: 'none',
                color: '#999999',
                '&:hover': {
                  color: '#f1f1f1',
                },
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              href="#features"
              sx={{
                fontWeight: 'normal',
                textTransform: 'none',
                color: '#999999',
                '&:hover': {
                  color: '#f1f1f1',
                },
              }}
            >
              Features
            </Button>
            <Button
              color="inherit"
              href="#pricing"
              sx={{
                fontWeight: 'normal',
                textTransform: 'none',
                color: '#999999',
                '&:hover': {
                  color: '#f1f1f1',
                },
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
                  color: '#f1f1f1',
                },
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              href="/sign-up"
              sx={{
                fontWeight: 'normal',
                textTransform: 'none',
                color: '#999999',
                '&:hover': {
                  color: '#f1f1f1',
                },
              }}
            >
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <Button
              color="inherit"
              href="/"
              sx={{
                fontWeight: 'normal',
                textTransform: 'none',
                color: '#999999',
                '&:hover': {
                  color: '#f1f1f1',
                },
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              href="/generate"
              sx={{
                fontWeight: 'normal',
                textTransform: 'none',
                color: '#999999',
                '&:hover': {
                  color: '#f1f1f1',
                },
              }}
            >
              Generate
            </Button>
            <Button
              color="inherit"
              href="/flashcards"
              sx={{
                fontWeight: 'normal',
                textTransform: 'none',
                color: '#999999',
                '&:hover': {
                  color: '#f1f1f1',
                },
              }}
            >
              Saved
            </Button>
            <Button
              color="inherit"
              href="/#pricing"
              sx={{
                fontWeight: 'normal',
                textTransform: 'none',
                marginRight: '16px',
                color: '#999999',
                '&:hover': {
                  color: '#f1f1f1',
                },
              }}
            >
              Pricing
            </Button>
            <UserButton />
          </SignedIn>
        </Toolbar>
        <Toolbar sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'space-between' }}>
          <Button
            sx={{
              display: 'flex',
              alignItems: 'center',
              textTransform: 'none',
              p: 0,
            }}
            onClick={() => handleNavClick('/')}
          >
            <Image src="/cardwizard.png" alt="CardWiz Logo" width={40} height={40} style={{ marginRight: '16px' }} />
            <Typography variant="h6" sx={{ color: '#fff' }}>
              CardWiz
            </Typography>
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <UserButton />
            <IconButton edge="end" color="inherit" onClick={handleDrawerToggle} aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={handleDrawerToggle}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <List>
            <SignedOut>
              <ListItem button component="a" href="/#home">Home</ListItem>
              <ListItem button component="a" href="/#features">Features</ListItem>
              <ListItem button component="a" href="/#pricing">Pricing</ListItem>
              <ListItem button component="a" href="/sign-in">Login</ListItem>
              <ListItem button component="a" href="/sign-up">Sign Up</ListItem>
            </SignedOut>
            <SignedIn>
              <ListItem button component="a" href="/">Home</ListItem>
              <ListItem button component="a" href="/generate">Generate</ListItem>
              <ListItem button component="a" href="/flashcards">Saved</ListItem>
              <ListItem button component="a" href="#pricing">Pricing</ListItem>
            </SignedIn>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

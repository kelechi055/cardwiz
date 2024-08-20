'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { Box, Typography, Container, Grid, Card, CardContent, CardActionArea, AppBar, Toolbar, Button, Link, IconButton, Drawer, List, ListItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'; 
import { db } from "@/firebase";
import { grey } from '@mui/material/colors';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flippedCardId, setFlippedCardId] = useState(null);
  const [flipped, setFlipped] = useState([]);
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const setId = searchParams.get('id');

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    async function fetchFlashcards() {
      if (!user || !setId) return;

      try {
        setLoading(true);

        // Reference to the user's document
        const userDocRef = doc(db, 'users', user.id);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          // Fetch the flashcards for the specific flashcard set
          const flashcardSetDocRef = doc(userDocRef, 'flashcardSets', setId);
          const flashcardsCollectionRef = collection(flashcardSetDocRef, 'flashcards');
          const flashcardsSnap = await getDocs(flashcardsCollectionRef);

          // Extract flashcard data
          const flashcards = flashcardsSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setFlashcards(flashcards);
        } else {
          console.log('User document does not exist');
          setFlashcards([]);
        }
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFlashcards();
  }, [user, setId]);


  if (!isLoaded || !isSignedIn) {
    return <Typography variant="h6" color="textSecondary" align="center">Loading or not signed in</Typography>;
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h6" color="textSecondary" align="center">
          Loading flashcards...
        </Typography>
      </Container>
    );
  }

  if (flashcards.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h6" color="textSecondary" align="center">
          No flashcards found for this set.
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth={false}
        sx={{
          background: 'linear-gradient(to bottom, black 0%, #17061E 20%, #7b1fa2 80%, #7b1fa2 80%, black 100%)'
        }}
      >
        {/* Navbar */}
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
          <Toolbar sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Button
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                p: 0 
              }}
              href="/" 
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
                    color: '#f1f1f1'
                  }
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
                    color: '#f1f1f1'
                  }
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
                    color: '#f1f1f1'
                  }
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
                    color: '#f1f1f1'
                  }
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
                  }
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
                  }
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
                  marginRight: '16px' ,
                  color: '#999999',
                  '&:hover': {
                    color: '#f1f1f1',
                  }
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
                p: 0 
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

        <Drawer
          anchor="right"
          open={open} 
          onClose={handleDrawerToggle} // Close the hamburger menu drawer when clicked outside
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={handleDrawerToggle} // Closes the hamburger menu drawer when an item is clicked
            onKeyDown={handleDrawerToggle} // Closes the hamburger menu drawer when pressing key
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
        {/* Navbar End */}
        <Container maxWidth="false" sx={{ mt: 4 }}>
          <Box sx={{ textAlign: 'center', color: 'white', mb: 4 }}>
            <br></br>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                color: 'white',
                fontFamily: 'Inter',
                fontWeight: 'bold',
                fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3.5rem' },
              }}
            >
              Study Your Flashcards
            </Typography>
          </Box>
          <br></br>
          <br></br>
          <br></br>
          <Grid container gap={8} justifyContent="center">
                {flashcards.map((flashcard, index) => (
                  <Grid item xs={9} sm={5} md={4} lg={3} key={index}>
                    <Card
                      sx={{
                        height: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: 3,
                        transform: 'scale(1.1)',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.15)',
                        },
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <CardActionArea onClick={() => handleCardClick(index)} sx={{ height: '100%' }}>
                        <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Box
                            sx={{
                              perspective: '1000px',
                              width: '100%',
                              height: '100%',
                              
                              '& > div': {
                                transition: 'transform 0.6s',
                                transformStyle: 'preserve-3d',
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                              },
                              '& > div > div': {
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backfaceVisibility: "hidden",
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 1,
                                boxSizing: 'border-box',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                              },
                              '& > div > div:nth-of-type(2)': {
                                transform: 'rotateY(180deg)',
                                backgroundImage: 'linear-gradient(to bottom, purple, black)',
                                color: 'white',
                              },
                            }}
                          >
                            <div>
                              <div>
                                <Typography variant="h5" component="div" sx={{ color: '#610162', textAlign: 'center' }}>
                                  {flashcard.front}
                                </Typography>
                              </div>
                              <div>
                                <Typography variant="h5" component="div" sx={{ color: 'white', textAlign: 'center' }}>
                                  {flashcard.back}
                                </Typography>
                              </div>
                            </div>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
          {/* Footer */}
          <Box sx={{ py: 1, textAlign: 'center' }}>
            <Typography 
              variant="h1" 
              color={grey[500]}
              sx={{ 
                color: '#E0E0E0', 
                fontFamily: 'Inter',
                fontWeight: 'light',
                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }
              }}
            >
              <br></br>
              <br></br>
              © 2024 CardWiz. Built by{' '}
              <Link 
                href="https://linkedin.com/in/kelechi-opurum" 
                color="inherit" 
                underline="hover" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'white'
                }}
              >
                Kelechi
              </Link> 
              . All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Container>  
    </>
  );
}

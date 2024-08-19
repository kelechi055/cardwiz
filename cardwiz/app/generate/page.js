'use client';
import { useEffect, useState } from 'react';
import { db } from "@/firebase";
import { useRouter } from 'next/navigation'; 
import Head from 'next/head';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import getStripe from '@/utils/get-stripe';
import { grey } from '@mui/material/colors';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  CircularProgress,
  CardActionArea,
} from '@mui/material';
import { useUser } from '@clerk/nextjs';
import { writeBatch, collection, doc, getDoc } from 'firebase/firestore';

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-up');
    }
  }, [isLoaded, isSignedIn, router]);

  const handleNavClick = (path) => {
    router.push(path);
  };

  // Handle flashcard submissions
  const handleSubmit = async () => {
    setLoading(true);
    fetch('/api/generate', {
      method: 'POST',
      body: text,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('API Response:', data);
        setFlashcards(data.flashcards || []);
      })
      .catch((error) => {
        console.error('Error fetching flashcards:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert('Please enter a name for your flashcard set');
      return;
    }

    const batch = writeBatch(db);
    const userDocRef = doc(db, 'users', user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert('A flashcard collection with that name already exists');
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards, collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    handleClose();
    router.push('/flashcards');
  };

  if (!isLoaded || !isSignedIn) {
    return null; 
  }

  return (
    <Container maxWidth={false} disableGutters>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, black 0%, #17061E 20%, #7b1fa2 80%, #7b1fa2 80%, black 100%)',
          fontFamily: 'Inter',
          width: '100vw',
          margin: 0,
          padding: 0,
        }}
      >
        <Head>
          <title>CardWiz</title>
          <meta name="description" content="Your Best Studying Companion" />
          <link rel="icon" href="/cardwizard.png" />
        </Head>

        {/* Navbar */}
        <AppBar position="static" sx={{ backgroundColor: 'black', width: '100%' }}>
          <Toolbar>
            <Button
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                p: 0 
              }}
              onClick={() => handleNavClick('/')} 
            >
              <Image src="/cardwizard.png" alt="CardWiz Logo" width={40} height={40} style={{ marginRight: '16px' }} />
            </Button>
            <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
              CardWiz
            </Typography>
            <SignedOut>
              <Button
                color="inherit"
                href="/#home"
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
                href="/#features"
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
                href="/#pricing"
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
        </AppBar>
        {/* Navbar End */}

        <Container>
          <Box sx={{ my: 4, color: 'white', fontFamily: 'Inter' }}>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                color: 'white',
                fontFamily: 'Inter',
                fontWeight: 'bold',
                fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3.5rem' },
                textAlign: 'center',
              }}
            >
              Generate Some Flashcards!🧙‍♂️
            </Typography>
            <br />
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              label="Enter your text here... ✨"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{
                mb: 2,
                '& .MuiInputLabel-root': {
                  color: 'white',
                  fontFamily: 'Inter',
                },
                '& .MuiOutlinedInput-root': {
                  '& input': {
                    color: 'white',
                    fontFamily: 'Inter',
                  },
                  '& fieldset': {
                    borderColor: 'white',
                    borderRadius: '12px',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              }}
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white', fontSize: '2.0rem', fontFamily: 'Inter' } }}
            />
            <Button
              sx={{
                mt: 2,
                fontSize: { xs: '1rem', sm: '1.2rem' },
                fontWeight: '500',
                fontFamily: 'Inter',
                alignItems: 'center',
                backgroundImage: 'linear-gradient(to bottom, purple, black)',
                color: 'white',
                position: 'relative',
                animation: 'slideUp 1s ease-in-out',
                textTransform: 'none',
                borderRadius: 2,
                px: 4,
                '&:hover': {
                  transform: 'scale(1.0)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                  opacity: 0.9,
                },
              }}
              onClick={handleSubmit}
              fullWidth
            >
              Generate 🪄
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4, color: 'white' }}>
              <CircularProgress />
            </Box>
          ) : flashcards.length > 0 && (
            <Box sx={{ mt: 4, }}>
              <Typography variant="h5" component="h2" color={'white'} gutterBottom>Flashcards Successfully Generated!</Typography> <br></br>
              <Grid container spacing={5}>
                {flashcards.map((flashcard, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
                                padding: 2,
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
              <Button
                variant="contained"
                color="secondary"
                onClick={handleOpen}
                sx={{
                  mt: 4,
                  fontSize: { xs: '1rem', sm: '1.5rem' },
                  fontWeight: '500',
                  fontFamily: 'Inter',
                  color: 'white',
                  position: 'relative',
                  animation: 'slideUp 1s ease-in-out',
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 4,
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                    opacity: 0.9,
                    backgroundImage: 'linear-gradient(purple)',
                  },
                }}
              >
                Save Flashcards
              </Button>
            </Box>
          )}
        </Container>

        <br />
        <br />
        <br />

        {/* Footer */}
        <Box sx={{ py: 1, textAlign: 'center' }}>
          <Typography
            variant="h1"
            color={grey[500]}
            sx={{
              color: '#E0E0E0',
              fontFamily: 'Inter',
              fontWeight: 'light',
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
            }}
          >
            © 2024 CardWiz. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

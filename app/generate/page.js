'use client'
import { useEffect, useState } from 'react';
import { db } from "@/firebase";
import { useRouter } from 'next/navigation'; 
import Head from 'next/head';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
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
  Link,
  Drawer,
  List,
  ListItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useUser } from '@clerk/nextjs';
import { writeBatch, collection, doc, getDoc } from 'firebase/firestore';

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-up');
    }
  }, [isLoaded, isSignedIn, router]);

  const handleNavClick = (path) => {
    router.push(path);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(''); // Clear any previous errors that were generated from any previous flashcards
    setFlashcards([]); // Clears any previous flashcards that the user generated
  
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }), // Ensure the body is in JSON format
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate flashcards. Please enter a new input.');
      }
  
      const data = await response.json();
      
      // This just checks if the flashcards are in the response and then it handle it accordingly
      if (data.flashcards && Array.isArray(data.flashcards)) {
        setFlashcards(data.flashcards);
      } else {
        throw new Error('Invalid flashcards data received.');
      }
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const HandleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  //SAVING THE FLASHCARDS
  const [setName, setSetName] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleOpenDialog = () => setDialogOpen(true)
  const handleCloseDialog = () => setDialogOpen(false)

  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert('Please enter a name for your flashcard set.')
      return
    }
  
    try {
      const userDocRef = doc(collection(db, 'users'), user.id)
      const userDocSnap = await getDoc(userDocRef)
  
      const batch = writeBatch(db)
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data()
        const updatedSets = [...(userData.flashcardSets || []), { name: setName }]
        batch.update(userDocRef, { flashcardSets: updatedSets })
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] })
      }
  
      const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
      batch.set(setDocRef, { flashcards })
  
      await batch.commit()
  
      alert('Flashcards saved successfully!')
      handleCloseDialog()
      setSetName('')
    } catch (error) {
      console.error('Error saving flashcards:', error)
      alert('An error occurred while saving flashcards. Please try again.')
    }
  }

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
        </Head>

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
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
            
          </Typography>
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

        <Container>
          <Box sx={{ my: 4, color: 'white', fontFamily: 'Inter', textAlign: 'center' }}>
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
              Generate Some Flashcards!🧙‍♂️
            </Typography>
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              label="Make flashcards from anything...🔮"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{
                mb: 2,
                '& .MuiInputLabel-root': {
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '1.0rem',
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
              InputProps={{ style: { color: 'white', fontSize: '1.5rem', fontFamily: 'Inter' } }}
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
              Generate ✨
            </Button>
            {error && (
              <Typography variant="body1" color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4, color: 'white' }}>
              <CircularProgress />
            </Box>
          ) : flashcards.length > 0 && (
            <Box sx={{ mt: 4,}}>
              <Typography variant="h5" component="h2" color={'white'} gutterBottom
              sx={{
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                font: 'Inter',
                textAlign: 'center',
              }}>Flashcards Successfully Generated!</Typography> <br></br><br></br>
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
              <br></br>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleOpenDialog}
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.5rem' },
                    fontWeight: '500',
                    fontFamily: 'Inter',
                    color: 'white',
                    position: 'relative',
                    animation: 'slideUp 1s ease-in-out',
                    textTransform: 'none',
                    borderRadius: 15,
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
            </Box>
          )}

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle
          sx={{
            backgroundImage: 'linear-gradient(to bottom, purple, black)',
            color: 'white',
            fontFamily: 'Inter',
          }}
          >Save Flashcard Set</DialogTitle>
          <DialogContent
          sx={{
            fontFamily: 'Inter',
          }}
          >
            <DialogContentText
          sx={{
            fontFamily: 'Inter',
          }}
            >
              Please enter a name for your flashcard set.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Set Name"
              type="text"
              fullWidth
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}
          sx={{
            fontFamily: 'Inter',
            textTransform: 'none',
            color: 'Red',
          }}
            >Cancel</Button>
            <Button onClick={saveFlashcards} color="primary"
          sx={{
            fontFamily: 'Inter',
            textTransform: 'none',
            color: 'Green',
          }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
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
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }
            }}
          >
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
      </Box>
    </Container>
  );
}

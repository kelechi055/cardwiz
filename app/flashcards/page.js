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
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useUser } from '@clerk/nextjs';
import { collection, doc, getDoc, setDoc, deleteDoc, updateDoc, getDocs } from 'firebase/firestore';

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);
  const [newName, setNewName] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-up');
    }
  }, [isLoaded, isSignedIn, router]);

  // Fetching Flashcards Function
  const fetchFlashcards = async () => {
    if (!user) return;
  
    try {
      setLoading(true);
  
      // Reference to the user's document
      const userDocRef = doc(db, 'users', user.id);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        // Fetch the flashcard sets collection
        const flashcardSetsCollectionRef = collection(userDocRef, 'flashcardSets');
        const flashcardSetsSnap = await getDocs(flashcardSetsCollectionRef);
  
        // Extract flashcard sets data
        const flashcardSets = flashcardSetsSnap.docs.map(setDoc => ({
          id: setDoc.id,
          ...setDoc.data() // Assuming doc.data() contains { name }
        }));
  
        setFlashcards(flashcardSets);
      } else {
        console.log('User document does not exist');
        setFlashcards([]);
      }
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, [user]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleCardClick = (setId) => {
    router.push(`/flashcard?id=${setId}`);
  };

  const handleEditClick = (flashcard) => {
    setSelectedFlashcard(flashcard);
    setNewName(flashcard.name);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = async (setId) => {
    if (confirm(`Are you sure you want to delete this flashcard set?`)) {
      try {
        const docRef = doc(db, 'users', user.id, 'flashcardSets', setId);
        await deleteDoc(docRef);
  
        // Refresh the flashcard sets after deletion
        fetchFlashcards();
  
        setSnackbarMessage(`Flashcard set deleted.`);
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Error deleting flashcard set:', error);
      }
    }
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditSave = async () => {
    if (!selectedFlashcard || !newName) return;
  
    try {
      // Get the document reference for the selected flashcard set
      const docRef = doc(db, 'users', user.id, 'flashcardSets', selectedFlashcard.id);
      
      // Update the name of the flashcard set document
      await updateDoc(docRef, { name: newName });
  
      // Refresh the flashcard sets after update
      fetchFlashcards();
  
      setSnackbarMessage(`Flashcard set renamed to "${newName}".`);
      setSnackbarOpen(true);
      handleEditDialogClose();
    } catch (error) {
      console.error('Error updating flashcard set name:', error);
    }
  };
  

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
              Your Saved Flashcard Sets 📚
            </Typography>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4, color: 'white' }}>
                <CircularProgress />
              </Box>
            ) : flashcards.length > 0 ? (
              <Grid container spacing={3} sx={{ mt: 4 }}>
                {flashcards.map((flashcard, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      sx={{
                        height: '150px',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: 3,
                        backgroundImage: 'url(/flashcard.jpg)', // Use the image file
                        backgroundSize: 'cover', // Ensure the image covers the entire container
                        backgroundPosition: 'center', // Center the image
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                        borderRadius: 10,
                        overflow: 'hidden',
                      }}
                    >
                      <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                        <CardContent
                          sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative', // Make it relative to position delete image
                          }}
                        >
                          <br></br>
                          <Typography
                            variant="h5"
                            component="div"
                            sx={{
                              color: 'purple',
                              fontFamily: 'Inter',
                              fontWeight: 'bold',
                              position: 'absolute', // Position the text
                            }}
                          >
                            {flashcard.name}
                          </Typography>
                          <Box
                            sx={{
                              position: 'absolute',
                              left: '30px', // Adjust as needed
                              top: '10px', // Adjust as needed
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Button
                              onClick={(event) => {
                                event.stopPropagation(); // Prevents the click from propagating to CardActionArea
                                handleDeleteClick(flashcard.name);
                              }}
                              sx={{
                                p: 0, // Remove default padding
                                minWidth: 'auto', // Remove min-width for better image display
                              }}
                            >
                              <img src="/delete.png" alt="Delete" style={{ width: '24px', height: '24px' }} />
                            </Button>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="h6" component="p" 
                sx={{
                  mt: 4, color: 'white' 
                  }}>
                You have no flashcard sets yet. Create some to get started!
              </Typography>
            )}
          </Box>
        </Container>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
          <DialogTitle
                            sx={{
                              fontSize: { xs: '1rem', sm: '1.5rem' },
                              fontWeight: '500',
                              fontFamily: 'Inter',
                              color: 'black',
                              backgroundImage: 'linear-gradient(purple)',
                              position: 'relative',
                              animation: 'slideDown 1s ease-in-out',
                              textTransform: 'none',
                              borderRadius: 15,
                              px: 4,
                            }}
          >Edit Flashcard Set</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="New Name"
              type="text"
              fullWidth
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              fontFamily: 'Inter',
            }}
            >Cancel</Button>
            <Button onClick={handleEditSave}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              fontFamily: 'Inter',
            }}
            >Save</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

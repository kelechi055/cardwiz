'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { Box, Typography, Container, Grid, Card, CardContent, CardActionArea, AppBar, Toolbar, Button, Link } from "@mui/material";
import { db } from "@/firebase";
import { grey } from '@mui/material/colors';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Flashcard() {
  // 1. Component Setup
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const search = searchParams.get('id');

  // 2. Fetching Flashcards
  useEffect(() => {
    async function fetchFlashcards() {
      if (!user) return;
  
      try {
        setLoading(true);
  
        // Fetch the user document
        const userDocRef = doc(db, 'users', user.id);
        const userDocSnap = await getDoc(userDocRef);
  
        if (userDocSnap.exists()) {
          // Fetch the list of flashcard set names
          const collectionsSnapshot = await getDocs(collection(db, 'users', user.id));
          const flashcardSets = collectionsSnapshot.docs.map(doc => doc.id);
  
          // Fetch flashcards from each set
          const allFlashcards = await Promise.all(flashcardSets.map(async (setName) => {
            const collectionRef = collection(db, 'users', user.id, setName);
            const snapshot = await getDocs(collectionRef);
            
            // Extract flashcards from the set
            const setFlashcards = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data() // Assuming doc.data() contains { front, back }
            }));
  
            return { name: setName, flashcards: setFlashcards };
          }));
  
          setFlashcards(allFlashcards);
        } else {
          // Create a new user document if it doesn't exist
          await setDoc(userDocRef, {});
          setFlashcards([]);
        }
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchFlashcards();
  }, [user]);
  // 3. Flashcard Interaction
  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isLoaded || !isSignedIn) {
    return <Typography variant="h6" color="textSecondary" align="center">Loading or not signed in</Typography>;
  }

  if (flashcards.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h6" color="textSecondary" align="center">
          No flashcards found.
        </Typography>
      </Container>
    );
  }
  //background: 'linear-gradient(to bottom, black 0%, #17061E 20%, #7b1fa2 80%, #7b1fa2 80%, black 100%)',
  // 4. Rendering Flashcards
  return (
    <>
    <Container maxWidth={false}
    sx={{
      background: 'linear-gradient(to bottom, black 0%, #17061E 20%, #7b1fa2 80%, #7b1fa2 80%, black 100%)'
    }}
    >
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
        </Toolbar>
      </AppBar>
      <Container maxWidth="false" sx={{ mt: 4,  }}>
        <Box sx={{ textAlign: 'center', color: 'white', mb: 4 }}>
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
        <Grid container spacing={3}>
          {flashcards.map((flashcard) => (
            <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
              <Card
                sx={{
                  height: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 3,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  borderRadius: 2,
                  overflow: 'hidden',
                  backgroundImage: flipped[flashcard.id] ? 'linear-gradient(to bottom, black 0%, purple 100%)' : 'none', // Front side none, back side gradient
                  color: flipped[flashcard.id] ? 'white' : 'black', // Front side black text, back side white text
                }}
                onClick={() => handleCardClick(flashcard.id)}
              >
                <CardActionArea
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', fontFamily: 'Inter' }}>
                      {flipped[flashcard.id] ? flashcard.back : flashcard.front}
                    </Typography>
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

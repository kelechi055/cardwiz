'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { Box, Typography, Container, Grid, Card, CardContent, CardActionArea, AppBar, Toolbar, Button } from "@mui/material";
import { db } from "@/firebase";

export default function Flashcard() {
  // 1. Component Setup
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});

  const searchParams = useSearchParams();
  const search = searchParams.get('id');

  // 2. Fetching Flashcards
  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

      try {
        const colRef = collection(doc(collection(db, 'users'), user.id), search);
        const docs = await getDocs(colRef);
        const fetchedFlashcards = [];

        docs.forEach((doc) => {
          fetchedFlashcards.push({ id: doc.id, ...doc.data() });
        });

        setFlashcards(fetchedFlashcards);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    }

    getFlashcard();
  }, [search, user]);

  // 3. Flashcard Interaction
  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isLoaded || !isSignedIn) {
    return <Typography>Loading or not signed in...</Typography>;
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

  // 4. Rendering Flashcards
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            Flashcard Set
          </Typography>
          <Button color="inherit" href="/">Home</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
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
                  backgroundColor: flipped[flashcard.id] ? 'purple' : 'white', // Front side white, back side purple
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
      </Container>
    </>
  );
}

'use client'
import Head from 'next/head';
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import getStripe from '@/utils/get-stripe';
import { grey } from "@mui/material/colors";
import { useState } from 'react';
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
  CircularProgress // Import CircularProgress for loading indicator
} from '@mui/material';
import { useUser } from '@clerk/nextjs';


export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    fetch('/api/generate', {
      method: 'POST',
      body: text,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data); 
        setFlashcards(data.flashcards || []);
      })
      .catch((error) => {
        console.error('Error fetching flashcards:', error);
      })
      .finally(() => {
        setLoading(false); // End loading
      });
  };

  return (
    <Box 
    sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, black 0%, #17061E 20%, #7b1fa2 80%, #7b1fa2 80%, black 100%)',
      fontFamily: 'Hanken_Grotesk, Inter',
      padding: 0,
      margin: 0
    }}
  >
    <Head>
      <Button>
        <title>CardWiz</title>
        <meta name="description" content="Your Best Studying Companion" />
        <link rel="icon" href="/cardwizard.png" />
      </Button>
    </Head>

    {/* Navbar */}
    <AppBar position="static" sx={{ backgroundColor: 'black', width: '100%', }}>
      <Toolbar>
        <Image src="/cardwizard.png" alt="CardWiz Logo" width={40} height={40} style={{ marginRight: '16px' }} />
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
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
    {/* Navbar End*/}

    <Container maxWidth="md">
      <Box sx={{ my: 4, color: 'white', fontFamily: 'Inter', borderRadius: '40' }}>
        <Typography variant="h1" component="h1" gutterBottom
        sx={{
          color: 'white',
          fontFamily: 'Inter',
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3.5rem' },
          justifyContent: 'center',
        }}>
          Generate Some Flashcards!🧙‍♂️
        </Typography>
        <br></br>
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
              fontFamily: 'Inter', // Correctly set fontFamily
            },
            '& .MuiOutlinedInput-root': {
              '& input': { 
                color: 'white',
                fontFamily: 'Inter', // Correctly set fontFamily for input text
              },
              '& fieldset': { 
                borderColor: 'white',
                borderRadius: '12px', // Make border more rounded
              },
              '&:hover fieldset': {
                borderColor: 'white', // Remove hover effect by keeping the same border color
              },
            },
            '& .MuiOutlinedInput-root.Mui-focused fieldset': {
              borderColor: 'white', // Maintain border color when focused
            },
          }}
          InputLabelProps={{ style: { color: 'white' } }} // Label color
          InputProps={{ style: { color: 'white', fontSize: '2.0rem', font: 'Inter', fontSize: 'light' } }} // Input text color
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
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Adds shadow effect
            opacity: 0.9, // Adjusts opacity on hover
            }
          }}
          onClick={handleSubmit}
          fullWidth
        >
          Generate 🪄
        </Button>
      </Box>

      {loading ? ( // Show loading indicator while fetching
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" color={'white'} gutterBottom>
            Generated Flashcards
          </Typography>
          <Grid container spacing={2}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Front:</Typography>
                    <Typography>{flashcard.front}</Typography>
                    <Typography variant="h6" sx={{ mt: 2,  }}>Back:</Typography>
                    <Typography>{flashcard.back}</Typography>
                  </CardContent>  
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => setModalOpen(true)}
            sx={{
              mt: 4,
              fontSize: { xs: '1rem', sm: '1.2rem' },
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
              }
            }}
          >
            Save Flashcards
        </Button>

        </Box>
      )}
    </Container>
    
    <br></br>
    <br></br>
    <br></br>
    
    {/* Footer */}
    <Box sx={{ py: 1, textAlign: 'center'}}>
      <Typography 
        variant="h1" 
        color={grey[500]}
        sx={{ 
          color: '#E0E0E0', 
          fontFamily: 'Inter',
          fontWeight: 'light ',
          fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }
        }}
      >
        © 2024 CardWiz. All rights reserved.
      </Typography>
    </Box>
  </Box>
  );
}

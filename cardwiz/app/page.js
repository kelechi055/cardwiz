'use client';
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid, Card, CardContent, MenuItem } from "@mui/material";
import Head from 'next/head';
import getStripe from '@/utils/get-stripe';
import { grey } from "@mui/material/colors";
import { Inter } from "next/font/google";

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    });
    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }
  
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });
  
    if (error) {
      console.warn(error.message);
    }
  }

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
        <title>CardWiz</title>
        <meta name="description" content="Your Best Studying Companion" />
        <link rel="icon" href="/cardwizard.png" />
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
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      {/* Navbar End*/}

      {/* Hero Section */}
      <Box id="home" sx={{ flex: 1, textAlign: 'center', my: 4, color: 'white' }}>
        <Typography class = "title"
          variant="h1" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            fontFamily: 'Hanken_Grotesk, Inter',
            fontSize: { xs: '2.5rem', sm: '3rem', md: '4.5rem' }, 
            lineHeight: { xs: '3rem', sm: '3.5rem', md: '4.5rem' },
            animation: 'slideDown 2s ease-in-out',
            mx: { xs: 2, sm: 4 }, 
            px: 2 
          }}
        >
          <br></br>
          <br></br>
          Dominate Exams
        </Typography>
        <Typography class = "title"
          variant="h1" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            fontFamily: 'Hanken_Grotesk, Inter',
            fontSize: { xs: '2.5rem', sm: '3rem', md: '4.5rem' }, 
            lineHeight: { xs: '3rem', sm: '3.5rem', md: '4.5rem' },
            animation: 'slideDown 2s ease-in-out',
            mx: { xs: 2, sm: 4 }, 
            px: 2 
          }}
        >
          With AI.
        </Typography>
        <br></br>
        <br></br>
        <br></br>
        <Typography 
          variant="h6" 
          component="h2" 
          gutterBottom 
          sx={{ 
            fontWeight: 'light', 
            fontFamily: 'Inter',
            maxWidth: { xs: '90%', sm: '70%', md: '50%' }, 
            textAlign: 'center', 
            margin: '0 auto',
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
            animation: 'fadeIn 4s ease-in-out',
            px: 2 
          }}
        >
          Elevate your exam preparation with our dynamic flashcards, expertly designed to optimize learning and improve retention. 
        </Typography>

        <br></br>
        <br></br>
        <br></br>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ 
            mt: 2, 
            fontSize: { xs: '1rem', sm: '1.2rem' }, 
            fontWeight: '500', 
            fontFamily: 'Inter',
            backgroundColor: 'white', 
            color: 'black', 
            animation: 'slideUp 4s ease-in-out',
            textTransform: 'none', 
            borderRadius: 2,
            px: 4,
            '&:hover': { 
            transform: 'scale(1.05)', 
            backgroundImage: 'linear-gradient(to bottom, purple, black)', 
            color: 'white' 
          }
          }} 
          href="/generate"
        >
          Get Started ✨
        </Button>
      </Box>
      
      {/* Features Section */}
      <Box id="features" sx={{ my: 4, color: 'white',  }}>
        <Typography 
          variant="h2" 
          component="h2" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            color: 'white', 
            textAlign: 'center',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            px: 2 
          }}
        >
          <br></br>
          <br></br>
          Features
        </Typography>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, textAlign: 'center', height: 'auto', maxWidth: 500, m: 'auto', transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardContent>
                <Image src="/flash.png" width={50} height={50} alt="Dynamic Flashcards" />
                <Typography variant='h5' sx={{ mt: 2, fontWeight: 'bold', fontFamily: 'Inter', }}>Dynamic Flashcards</Typography>
                <Typography sx={{ mt: 1 }}>
                  CardWiz AI transforms your text into concise, effective study tools.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, textAlign: 'center', height: 'auto', maxWidth: 500, m: 'auto', transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardContent>
                <Image src="/personal.png" width={50} height={50} alt="Personalized Study Plans" />
                <Typography variant='h5' sx={{ mt: 2, fontWeight: 'bold', fontFamily: 'Inter', }}>Personalized Study Plans</Typography>
                <Typography sx={{ mt: 1 }}>
                  Customize your learning experience with plans tailored to your goals and skill level.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, textAlign: 'center', height: 'auto', maxWidth: 500, m: 'auto', transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardContent>
                <Image src="/review.png" width={50} height={50} alt="Effective Review System" />
                <Typography variant='h5' sx={{ mt: 2, fontWeight: 'bold', fontFamily: 'Inter', }}>Effective Review System</Typography>
                <Typography sx={{ mt: 1 }}>
                  Revisit important topics at optimal times to enhance your retention and mastery.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Pricing Section */}
      <Box id="pricing" sx={{ my: 6, textAlign: 'center' }}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Typography 
          variant="h2" 
          component="h2" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            color: '#fff', 
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Plans & Pricing
        </Typography>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 3, color: '#808080', border: '3px solid', borderColor: '#808080', borderRadius: 2, backgroundColor: '#fff', boxShadow: 3, height: 'auto', maxWidth: 345, m: 'auto', transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <Typography 
                variant='h4' 
                gutterBottom 
                sx={{ 
                  fontWeight: 'light',
                  color: '#808080',
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                }}
              >
                Free
              </Typography>
              <Typography 
                variant='h5' 
                gutterBottom
                fontWeight={'bold'}
                sx={{ 
                  fontSize: { xs: '3rem', sm: '4rem', md: '5rem' }
                }}
              >
                $0
              </Typography>
              <br></br>
              {/* Plan Option 1 */}
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Image src="/greycheck.png" alt="Check" width={30} height={20} />
                  <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', fontFamily: 'Inter', }, ml: 1 }}>
                  Basic flashcard features
                  </Typography>
                </Box>

                <br />

                {/* Plan Option 2 */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Image src="/greycheck.png" alt="Check" width={30} height={20} />
                  <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', fontFamily: 'Inter', }, ml: 1 }}>
                  Limited storage
                  </Typography>
                </Box>

                <br />
              <Button 
                variant="contained" 
                color="primary" 
                
                sx={{ mt: 2, fontSize: { xs: '0.875rem', sm: '1rem', fontWeight: 'normal', textTransform: 'none', backgroundColor: 'grey', '&:hover': {backgroundColor: '#606060'}} }}
              >
                Get Started for Free
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 3, border: '3px solid', borderColor: 'black', borderRadius: 2, backgroundColor: '#fff', boxShadow: 3, height: 'auto', maxWidth: 345, m: 'auto', transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <Typography 
                variant='h4' 
                gutterBottom 
                sx={{ 
                  fontWeight: 'Light',
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                }}
              >
                Pro
              </Typography>
              <Typography 
                variant='h5' 
                gutterBottom 
                fontWeight={'bold'}
                sx={{ 
                  fontSize: { xs: '3rem', sm: '4rem', md: '5rem' }
                }}
              >
                $1.99
              </Typography>
              <Typography 
                variant='h4' 
                gutterBottom 
                sx={{ 
                  fontWeight: 'Light', fontFamily: 'Inter',
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                }}
              >
                One time payment
              </Typography>
              <br></br>
              <br></br>
              {/* Plan Option 1 */}
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Image src="/blackcheck.png" alt="Check" width={30} height={20} />
                  <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' }, ml: 1 }}>
                    Unlimited storage
                  </Typography>
                </Box>

                <br />

                {/* Plan Option 2 */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Image src="/blackcheck.png" alt="Check" width={30} height={20} />
                  <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' }, ml: 1 }}>
                    Unlimited flashcard generation
                  </Typography>
                </Box>

                <br />

                {/* Plan Option 3 */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Image src="/blackcheck.png" alt="Check" width={30} height={20} />
                  <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' }, ml: 1 }}>
                    Custom study plans
                  </Typography>
                </Box>
              <Button
                variant="contained" 
                color="primary" 
                sx={{ mt: 2, fontSize: { xs: '0.875rem', sm: '1rem', fontWeight: 'normal', fontFamily: 'Inter', textTransform: 'none', backgroundColor: 'Black', '&:hover': {backgroundImage: 'linear-gradient(to bottom, purple, black)', }} }} 
                onClick={handleSubmit}
              >
                Get Pro
              </Button>
            </Card>
          </Grid>
        </Grid>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            fontFamily: 'Inter',
            color: 'white',
            fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' }, 
            lineHeight: { xs: '3rem', sm: '3.5rem', md: '4.5rem' },
            mx: { xs: 2, sm: 4 }, 
            px: 2 
          }}
        >
          What are you waiting for?
        </Typography>
        <br></br>
        <br></br>
        <br></br>
        <Typography 
          variant="h6" 
          component="h2" 
          color={'white'}
          gutterBottom 
          sx={{ 
            fontWeight: 'light', 
            maxWidth: { xs: '90%', sm: '70%', md: '50%' }, 
            textAlign: 'center', 
            margin: '0 auto',
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
            fontFamily: 'Inter',
            px: 2 
          }}
        >
          Take the next step towards success and join countless students who are excelling with our powerful study tools. 
          Empower yourself with customized flashcards and innovative strategies designed to make learning more effective and engaging.
        </Typography>
        <br></br>
        <br></br>
        <br></br>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ 
            mt: 2, 
            fontSize: { xs: '1rem', sm: '1.2rem' }, 
            fontWeight: 'normal', 
            backgroundColor: 'white', 
            color: 'black', 
            textTransform: 'none', 
            borderRadius: 2,
            px: 2, 
            textAlign: 'center',
            color: 'white',
            backgroundImage: 'linear-gradient(to bottom, purple, black)',
              '&:hover': {
                transform: 'scale(1.05)',
              }
          }} 
          href="/generate"
        >
          Join Beta! ✨
        </Button>
        <br></br>
        <br></br>
        <Typography color={'#E0E0E0'} fontSize={'1rem'} fontFamily={'Inter'}  >
          Join and enjoy exclusive early access to premium features for a month.
        </Typography>
      </Box>
      
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

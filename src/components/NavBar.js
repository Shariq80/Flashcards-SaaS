import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box
} from "@mui/material"
import Link from "next/link"
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs"

export const NavBar = () => {
  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "#212121", boxShadow: "none", paddingY: 1 }}
    >
      <Toolbar>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          {/* Brand Name */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              fontSize: "1.75rem",
              cursor: "pointer"
            }}
          >
            <Link href="/" passHref>
              CalcQuest
            </Link>
          </Typography>

          {/* Authentication Buttons */}
          <SignedOut>
            {/* Navigation Links */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link href={`/`} passHref key={"/"}>
                <Button
                  color="inherit"
                  sx={{
                    ml: 2,
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: 1
                    }
                  }}
                >
                  Home
                </Button>
              </Link>
              {["About", "Pricing", "Contact", "Public Cards"].map(page => (
                <Link
                  href={`/${page.toLowerCase().replaceAll(" ", "-")}`}
                  passHref
                  key={page}
                >
                  <Button
                    color="inherit"
                    sx={{
                      ml: 2,
                      textTransform: "none",
                      fontSize: "1rem",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: 1
                      }
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
              <SignInButton>
                <Button
                  variant="contained"
                  sx={{
                    ml: 2,
                    textTransform: "none",
                    fontSize: "1rem",
                    backgroundColor: "#1976D2", // Bold Blue
                    color: "#fff", // White text
                    "&:hover": {
                      backgroundColor: "#2196F3", // Lighter Blue on hover
                      opacity: 0.9
                    },
                    transition: "all 0.3s"
                  }}
                >
                  Login
                </Button>
              </SignInButton>

              <Button
                variant="contained"
                sx={{
                  ml: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  backgroundImage: "linear-gradient(45deg, #43A047, #66BB6A)", // Deep Green to Light Green
                  color: "#fff", // White text
                  "&:hover": {
                    backgroundImage: "linear-gradient(45deg, #66BB6A, #43A047)",
                    opacity: 0.9
                  },
                  transition: "all 0.3s"
                }}
                component="a"
                href="/sign-up"
              >
                Sign Up
              </Button>
            </Box>
          </SignedOut>
          <SignedIn>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {["Generate", "My Cards", "Public Cards"].map(page => (
                <Link
                  href={`/${page.toLowerCase().replaceAll(" ", "-")}`}
                  passHref
                  key={page}
                >
                  <Button
                    color="inherit"
                    sx={{
                      ml: 2,
                      textTransform: "none",
                      fontSize: "1rem",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: 1
                      }
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
              <Box
                sx={{
                  ml: 2,
                  p: 1,
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 2,
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: 4
                  }
                }}
              >
                <UserButton />
              </Box>
            </Box>
          </SignedIn>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

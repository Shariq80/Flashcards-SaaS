"use client";

import { useUser } from "@clerk/nextjs";
import { collection, getDoc, writeBatch, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	Container,
	Box,
	TextField,
	Button,
	Typography,
	Grid,
	Card,
	CardActionArea,
	CardContent,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	CircularProgress,
} from "@mui/material";
import { NavBar } from "@/components/NavBar";

export default function Generate() {
	const { user } = useUser();
	const [flashcards, setFlashcards] = useState([]);
	const [flipped, setFlipped] = useState({});
	const [text, setText] = useState("");
	const [name, setName] = useState("");
	const [open, setOpen] = useState(false);
	const [isPublic, setIsPublic] = useState(false);
	const [loading, setLoading] = useState(false); // New loading state
	const router = useRouter();

	const handleSubmit = async () => {
		setLoading(true); // Start loading
		try {
			const response = await fetch("/api/generate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text }),
			});

			if (!response.ok) {
				throw new Error("Failed to fetch flashcards");
			}

			const data = await response.json();
			if (data && data.flashcards) {
				setFlashcards(data.flashcards);
			} else {
				console.error("No flashcards data received");
			}
		} catch (error) {
			console.error("Error generating flashcards:", error);
		} finally {
			setLoading(false); // Stop loading
		}
	};

	const handleCardClick = (index) => {
		setFlipped((prev) => ({
			...prev,
			[index]: !prev[index],
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
			alert("Please enter a name");
			return;
		}

		const batch = writeBatch(db);
		const userDocRef = doc(db, "users", user.id);

		// Retrieve user document
		const docSnap = await getDoc(userDocRef);

		// Prepare flashcards data to be saved
		const flashcardsData = {};
		flashcards.forEach((flashcard, index) => {
			flashcardsData[`flashcard${index}`] = flashcard;
		});

		if (docSnap.exists()) {
			// Document exists, update flashcards collection
			const userData = docSnap.data();
			const existingFlashcards = userData.flashcards || {};

			if (existingFlashcards[name]) {
				alert("A flashcard collection with this name already exists.");
				return;
			}

			// Add new flashcard collection
			existingFlashcards[name] = flashcardsData;
			batch.set(
				userDocRef,
				{ flashcards: existingFlashcards },
				{ merge: true }
			);
		} else {
			// Document does not exist, create it with the new flashcards collection
			const newFlashcards = { [name]: flashcardsData };
			batch.set(userDocRef, { flashcards: newFlashcards });
		}

		// Commit the batch write
		await batch.commit();

		handleClose();
		router.push("/my-cards");
	};

	const publishFlashcards = async () => {
		if (!name) {
			alert("Please enter a name");
			return;
		}

		const batch = writeBatch(db);
		const publicDocRef = doc(db, "public", "public");

		// Retrieve user document
		const docSnap = await getDoc(publicDocRef);

		// Prepare flashcards data to be saved
		const flashcardsData = {};
		flashcards.forEach((flashcard, index) => {
			flashcardsData[`${flashcard.front}-${index}`] = flashcard;
		});

		if (docSnap.exists()) {
			// Document exists, update flashcards collection
			const publicData = docSnap.data();
			const existingFlashcards = publicData.flashcards || {};

			if (existingFlashcards[name]) {
				alert("A flashcard collection with this name already exists.");
				return;
			}

			// Add new flashcard collection
			existingFlashcards[name] = flashcardsData;
			batch.set(
				publicDocRef,
				{ flashcards: existingFlashcards },
				{ merge: true }
			);
		} else {
			// Document does not exist, create it with the new flashcards collection
			const newFlashcards = { [name]: flashcardsData };
			batch.set(publicDocRef, { flashcards: newFlashcards });
		}

		// Commit the batch write
		await batch.commit();

		handleClose();
		router.push("/public-cards");
	};

	return (
		<>
			<NavBar />
			<Container maxWidth="md">
				<Box
					sx={{
						mt: 4,
						mb: 6,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						px: 2,
					}}
				>
					<TextField
						label="Enter Text"
						variant="outlined"
						fullWidth
						margin="normal"
						value={text}
						onChange={(e) => setText(e.target.value)}
						sx={{
							"& .MuiOutlinedInput-root": {
								"& fieldset": {
									borderColor: "grey.400", // Soft grey border for subtle contrast
								},
								"&:hover fieldset": {
									borderColor: "primary.main", // Highlight border on hover
								},
								"&.Mui-focused fieldset": {
									borderColor: "primary.main", // Highlight border when focused
								},
							},
							"& .MuiInputLabel-root": {
								color: "text.primary", // Primary text color for better readability
							},
							"& .MuiInputBase-input": {
								color: "text.primary", // Primary text color for consistency
							},
						}}
					/>
					<Button
						variant="contained"
						sx={{
							mt: 2,
							color: "#fff",
							backgroundColor: "primary.main",
							borderRadius: 2, // Rounded corners for modern look
							px: 4, // Horizontal padding for better button size
							py: 1.5, // Vertical padding for better button size
							textTransform: "none", // Preserve text case
							fontWeight: "bold", // Bold text for emphasis
							"&:hover": {
								backgroundColor: "primary.dark", // Darker shade on hover for contrast
								boxShadow: 3, // Add shadow on hover for a lifting effect
							},
							transition: "all 0.3s ease-in-out", // Smooth transition effect
						}}
						onClick={handleSubmit}
					>
						Generate Flashcards
					</Button>

					{loading && (
						<Box sx={{ mt: 4 }}>
							<CircularProgress />
						</Box>
					)}
				</Box>

				{flashcards.length > 0 && (
					<Box sx={{ my: 4 }}>
						<Typography variant="h5" align="center" gutterBottom>
							Flashcard Preview
						</Typography>
						<Grid container spacing={3}>
							{flashcards.map((flashcard, index) => (
								<Grid item xs={12} sm={6} md={4} key={index}>
									<Card
										sx={{
											transform: flipped[index]
												? "rotateY(360deg)"
												: "rotateY(0deg)",
											transition: "transform 0.6s",
											transformStyle: "preserve-3d",
											position: "relative",
											height: "100%",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											"&:hover": {
												boxShadow: 6, // Deepen shadow on hover
											},
										}}
										onClick={() => handleCardClick(index)}
									>
										<CardActionArea>
											<CardContent
												sx={{
													backfaceVisibility:
														"hidden",
													width: "100%",
													height: "100%",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													textAlign: "center",
												}}
											>
												<Typography variant="h6">
													{flipped[index]
														? flashcard.back
														: flashcard.front}
												</Typography>
											</CardContent>
										</CardActionArea>
									</Card>
								</Grid>
							))}
						</Grid>
						<Grid container spacing={2} justifyContent="center">
							<Box
								sx={{
									mt: 4,
									display: "flex",
									justifyContent: "center",
									gap: 2, // Add space between the buttons
								}}
							>
								<Button
									variant="contained"
									onClick={handleOpen}
									sx={{
										fontSize: "1rem",
										color: "#FFFFFF",
										backgroundColor: "#4CAF50", // Earthy olive green color
										borderRadius: 8,
										px: 4,
										py: 1.5,
										fontWeight: "bold",
										textTransform: "none",
										transition: "all 0.3s ease-in-out",
										"&:hover": {
											backgroundColor: "#388E3C", // Darker green on hover
											boxShadow: 3,
										},
									}}
								>
									Save
								</Button>

								<Button
									variant="contained"
									onClick={() => {
										setIsPublic(true);
										handleOpen();
									}}
									sx={{
										fontSize: "1rem",
										color: "#FFFFFF",
										backgroundColor: "#3F51B5", // Custom background color										borderRadius: 8,
										borderRadius: 8,
										px: 4,
										py: 1.5,
										fontWeight: "bold",
										textTransform: "none",
										transition: "all 0.3s ease-in-out",
										"&:hover": {
											backgroundColor: "#303F9F", // Custom hover background color
											boxShadow: 3, // Add shadow on hover for a lifting effect
										},
									}}
								>
									Publish
								</Button>
							</Box>
						</Grid>
					</Box>
				)}
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle> Save the Flashcards</DialogTitle>
					<DialogContent>
						<DialogContentText>
							{
								"Please enter a name for your Flashcard's Collection"
							}
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							label="Collection Name"
							type="text"
							fullWidth
							value={name}
							onChange={(e) => setName(e.target.value)}
							variant="outlined"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button
							onClick={
								isPublic ? publishFlashcards : saveFlashcards
							}
						>
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</>
	);
}

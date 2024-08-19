"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase"; // Adjust the import path to your firebase config
import { doc, getDoc } from "firebase/firestore";
import {
	Container,
	Typography,
	Box,
	Grid,
	Card,
	CardContent,
	Typography as MuiTypography,
	CardActionArea,
} from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { NavBar } from "@/components/NavBar";

export default function PublicFlashCards() {
	const [flashcardsData, setFlashcardsData] = useState(null);
	const [flipped, setFlipped] = useState({});

	const handleCardClick = (index) => {
		setFlipped((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	useEffect(() => {
		const fetchFlashcards = async () => {
			try {
				const publicDocRef = doc(db, "public", "public");
				const docSnap = await getDoc(publicDocRef);

				if (docSnap.exists()) {
					const data = docSnap.data();
					setFlashcardsData(data.flashcards || {});
				} else {
					setFlashcardsData({});
				}
			} catch (error) {
				console.error("Error fetching flashcards:", error);
				setFlashcardsData({});
			}
		};

		fetchFlashcards();
	}, []);

	return (
		<>
			<NavBar />
			<Container maxWidth="md">
				<Typography variant="h3" align="center" gutterBottom>
					Public Flash Cards
				</Typography>
				<Box sx={{ my: 4 }}>
					{Object.keys(flashcardsData || {}).length === 0 ? (
						<Typography variant="h6" align="center">
							No flashcard collections found.
						</Typography>
					) : (
						Object.entries(flashcardsData || {}).map(
							([collectionName, flashcards], index) => (
								<Box key={index} sx={{ mb: 6 }}>
									<Typography
										variant="h4"
										gutterBottom
										sx={{ fontWeight: "bold" }}
									>
										{collectionName}
									</Typography>
									<Grid container spacing={3}>
										{Object.entries(flashcards).map(
											(
												[flashcardKey, flashcard],
												index
											) => (
												<Grid
													item
													xs={12}
													sm={6}
													md={4}
													key={`${collectionName}-${index}`}
												>
													<Card
														sx={{
															transform: flipped[
																`${collectionName}-${index}`
															]
																? "rotateY(360deg)"
																: "rotateY(0deg)",
															transition:
																"transform 0.6s ease",
															transformStyle:
																"preserve-3d",
															position:
																"relative",
															height: "250px",
															display: "flex",
															alignItems:
																"center",
															justifyContent:
																"center",
															cursor: "pointer",
															perspective:
																"1000px",
															backgroundColor:
																"#fafafa", // Light background
															boxShadow: 3, // Subtle shadow
															borderRadius: 4,
														}}
														onClick={() =>
															handleCardClick(
																`${collectionName}-${index}`
															)
														}
													>
														<CardActionArea
															sx={{
																width: "100%",
																height: "100%",
																backfaceVisibility:
																	"hidden",
																display: "flex",
																alignItems:
																	"center",
																justifyContent:
																	"center",
																textAlign:
																	"center",
																position:
																	"absolute",
															}}
														>
															<CardContent
																sx={{
																	backfaceVisibility:
																		"hidden",
																	padding: 2,
																	display:
																		"flex",
																	alignItems:
																		"center",
																	justifyContent:
																		"center",
																	height: "100%",
																	fontSize:
																		"1.25rem",
																}}
															>
																<Typography
																	variant="h6"
																	sx={{
																		color: "#333",
																		fontWeight:
																			"bold",
																	}}
																>
																	{flipped[
																		`${collectionName}-${index}`
																	]
																		? flashcard.back
																		: flashcard.front}
																</Typography>
															</CardContent>
														</CardActionArea>
													</Card>
												</Grid>
											)
										)}
									</Grid>
								</Box>
							)
						)
					)}
				</Box>
			</Container>
		</>
	);
}

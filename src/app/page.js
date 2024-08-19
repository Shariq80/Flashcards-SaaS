import {
	Typography,
	Container,
	Button,
	Box,
	Grid,
	Card,
	CardContent,
	CardActions,
	CardHeader,
} from "@mui/material";
import { NavBar } from "@/components/NavBar";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<NavBar />

			<Box
				className="container-content"
				sx={{ textAlign: "center", my: 4 }}
			>
				<Typography
					variant="h2"
					component="h1"
					sx={{ fontWeight: 600, mb: 2 }}
				>
					Welcome to Learn in a Flash
				</Typography>
				<Typography variant="h5" color="textSecondary" sx={{ mb: 4 }}>
					Easiest way to make flashcards from text
				</Typography>
				<Link href="/sign-in">
					<Button variant="contained" size="large" sx={{ px: 4 }}>
						Get Started
					</Button>
				</Link>
			</Box>

			<Box sx={{ my: 6, px: 6 }}>
				<Typography
					variant="h4"
					align="center"
					gutterBottom
					sx={{ fontWeight: 600 }}
				>
					Features
				</Typography>
				<Grid container spacing={4} justifyContent="center">
					{[
						"Customizable Flashcards",
						"Flashcard Organization",
						"Spaced Repetition System",
						"Quiz and Test Mode",
						"Progress Tracking and Analytics",
						"Collaborative Features",
						"Multi-Platform Syncing",
						"Gamification",
						"Integration with External Resources",
					].map((feature, index) => (
						<Grid item xs={12} sm={6} md={4} key={index}>
							<Card elevation={3} sx={{ height: "100%" }}>
								<CardContent>
									<Typography
										variant="h6"
										gutterBottom
										sx={{ fontWeight: 500 }}
									>
										{feature}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
									>
										{/* Add corresponding feature descriptions here */}
										This is a description for {feature}.
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Box>

			<Box sx={{ my: 6 }}>
				<Typography
					variant="h4"
					align="center"
					gutterBottom
					sx={{ fontWeight: 600 }}
				>
					Pricing
				</Typography>
				<Grid container spacing={4} justifyContent="center">
					{[
						{
							title: "Free Plan",
							price: "Free",
							description:
								"Access to basic features, create up to 50 flashcards, and join one study group.",
							buttonText: "Get Started",
							link: "/sign-in",
						},
						{
							title: "Yearly Plan",
							price: "$9.99/year",
							description:
								"Unlimited flashcards, advanced analytics, and priority support.",
							buttonText: "Upgrade Now",
							link: "/pricing",
						},
					].map((plan, index) => (
						<Grid item xs={12} sm={6} md={4} key={index}>
							<Card
								elevation={3}
								sx={{ height: "100%", textAlign: "center" }}
							>
								<CardHeader
									title={plan.title}
									titleTypographyProps={{
										variant: "h6",
										fontWeight: 500,
									}}
								/>
								<CardContent>
									<Typography
										variant="h4"
										color="primary"
										gutterBottom
									>
										{plan.price}
									</Typography>
									<Typography
										variant="body1"
										color="textSecondary"
										gutterBottom
									>
										{plan.description}
									</Typography>
								</CardContent>
								<CardActions sx={{ justifyContent: "center" }}>
									<Link href={plan.link}>
										<Button
											variant="contained"
											color="primary"
											size="large"
										>
											{plan.buttonText}
										</Button>
									</Link>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
}

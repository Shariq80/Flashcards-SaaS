import { SignUp } from "@clerk/nextjs";
import { Container, Grid, Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import backgroundImg from "@/assets/bg.jpeg"; // Adjust the path based on your file location
import { NavBar } from "@/components/NavBar";

export default function Page() {
	return (
		<>
			<NavBar />
			<Container
				component="main"
				maxWidth="lg"
				sx={{ minHeight: "100vh", padding: 0 }}
			>
				<Grid container spacing={0}>
					{/* Left Side - Signup Form */}
					<Grid
						item
						xs={12}
						md={6}
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#f5f5f5",
							padding: 2,
						}}
					>
						<SignUp
							signInUrl="/sign-in"
							forceRedirectUrl={"/generate"}
							appearance={{
								elements: {
									formButtonPrimary: {
										backgroundColor: "#1976d2",
										"&:hover": {
											backgroundColor: "#115293",
										},
									},
								},
							}}
						/>
					</Grid>

					{/* Right Side - Background Image */}
					<Grid
						item
						xs={12}
						md={6}
						sx={{
							display: { xs: "none", md: "flex" },
							justifyContent: "center",
							alignItems: "center",
							position: "relative",
							height: "100vh",
						}}
					>
						<Image
							src={backgroundImg}
							alt="Background Image"
							layout="fill"
							objectFit="cover"
							priority
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

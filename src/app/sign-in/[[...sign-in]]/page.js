"use client";

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import {
	Container,
	Typography,
	Box,
	Button,
	CircularProgress,
} from "@mui/material";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import { NavBar } from "@/components/NavBar";

export default function Return() {
	const [status, setStatus] = useState(null);
	const [customerEmail, setCustomerEmail] = useState("");

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const sessionId = urlParams.get("session_id");

		fetch(`/api/checkout_session?session_id=${sessionId}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("data", data);
				setStatus(data.status);
				setCustomerEmail(data.customer_email);
			});
	}, []);

	if (status === "open") {
		return redirect("/");
	}

	if (status === "complete") {
		return (
			<>
				<NavBar />
				<Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							mb: 4,
						}}
					>
						<CheckCircleIcon
							color="success"
							sx={{ fontSize: 80 }}
						/>
						<Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
							Payment Successful
						</Typography>
						<Typography variant="body1" color="textSecondary">
							We appreciate your business! A confirmation email
							will be sent to <strong>{customerEmail}</strong>. If
							you have any questions, please email{" "}
							<a href="mailto:orders@example.com">
								orders@example.com
							</a>
							.
						</Typography>
					</Box>
					<Button
						variant="contained"
						color="primary"
						href="/"
						sx={{ mt: 3 }}
					>
						Return to Home
					</Button>
				</Container>
			</>
		);
	}

	return (
		<Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
			<CircularProgress />
			<Typography variant="body1" sx={{ mt: 2 }}>
				Processing your request...
			</Typography>
		</Container>
	);
}

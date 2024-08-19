import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const formatAmountForStripe = (amount) => {
	return Math.round(amount * 100);
};

export async function POST(req) {
	try {
		const params = {
			ui_mode: "embedded",
			payment_method_types: ["card"],
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: "Pro Subscription",
						},
						unit_amount: formatAmountForStripe(9.99),
						recurring: {
							interval: "year",
							interval_count: 1,
						},
					},
					quantity: 1,
				},
			],
			mode: "subscription",
			return_url: `${req.headers.get(
				"origin"
			)}/return?session_id={CHECKOUT_SESSION_ID}`,
		};
		const session = await stripe.checkout.sessions.create(params);
		return NextResponse.json(session.client_secret, {
			status: 200,
		});
	} catch (error) {
		return NextResponse.json(error.message, {
			status: 500,
		});
	}
}

export async function GET(req) {
	try {
		const url = new URL(req.url);
		const sessionId = url.searchParams.get("session_id");
		const session = await stripe.checkout.sessions.retrieve(sessionId);

		return NextResponse.json(
			{
				status: session.status,
				customer_email: session.customer_details.email,
			},
			{
				status: 200,
			}
		);
	} catch (err) {
		return NextResponse.json(err.message, {
			status: 500,
		});
	}
}

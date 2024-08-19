import { NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const systemPrompt = `
You are an AI flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:
1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard, ensuring they do not exceed one or two sentences.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Only generate 10 flashcards.

Return in the following JSON format:
{
    "flashcards": [{
        "front": str,
        "back": str
    }]
}

Remember, the goal is to facilitate effective learning and retention of information through these flashcards.
`;

export async function POST(req) {
	const data = await req.text(); // Get the raw text from the request

	try {
		const response = await fetch(
			"https://openrouter.ai/api/v1/chat/completions",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${OPENROUTER_API_KEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model: "meta-llama/llama-3.1-8b-instruct",
					messages: [
						{ role: "system", content: systemPrompt },
						{ role: "user", content: data },
					],
				}),
			}
		);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch from OpenRouter AI: ${response.statusText}`
			);
		}

		const completion = await response.json();
		// Extracting JSON from the response content
		const rawJson = completion.choices[0].message.content;
		const startIndex = rawJson.indexOf("{");
		const endIndex = rawJson.lastIndexOf("}") + 1;
		const jsonString = rawJson.substring(startIndex, endIndex);
		const flashcardsData = JSON.parse(jsonString);

		// Assuming flashcardsData contains the "flashcards" array directly
		return NextResponse.json({ flashcards: flashcardsData.flashcards });
	} catch (error) {
		console.error("Error processing request:", error);
		return new Response("Error processing request", { status: 500 });
	}
}

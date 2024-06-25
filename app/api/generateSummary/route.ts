import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { todos } = await request.json();

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: 'system',
                content: `When responding,
                greed the user with 'Shalom' or 'welcome to 2doNext app!'.
                limit the response to 200 characters.`
            },
            {
                role: 'user',
                content: `provide a summary of the following todos.
                Count how many todos are in each category
                such as To do, In progress and Done.
                try to be smart and funny.
                advise what to do first.
                then tell the user a compliment.
                say something about the weather for this day.
                you can use some emojis.
                Here's the data : ${JSON.stringify(todos)}`
            },

        ]
    })
    
    const { data } = response;

    return NextResponse.json(data.choices[0].message)
}
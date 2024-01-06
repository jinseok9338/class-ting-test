import { z } from "zod";

export interface QuizApi {
    response_code: number;
    results: Question[];
}

export interface Question {
    type: Type;
    difficulty: Difficulty;
    category: Category;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export enum Category {
    Science3A20Computers = "Science%3A%20Computers",
}

export enum Difficulty {
    Medium = "medium",
}

export enum Type {
    Multiple = "multiple",

}


export interface NormalizedQuestion {
    correctAnswer: string;
    question: string;
    incorrectAnswers: string[];
}

export const questionsArraySchema = z.array(
    z.object({
        type: z.enum([Type.Multiple]),
        difficulty: z.enum([Difficulty.Medium]),
        category: z.enum([
            Category.Science3A20Computers,

        ]),
        question: z.string(),
        correct_answer: z.string(),
        // incorrest_answers should not be empty
        incorrect_answers: z
            .array(z.string())
            .refine(data => data.length > 0, {
                message: "Incorrect answers should not be empty",
            }),
    })
);
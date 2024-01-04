import { Question, questionsArraySchema } from "@src/types/quiz";
import { API_URL } from "@src/utils/consts";
import { useQuery } from "react-query";
export const fetchQuizData = async (): Promise<Question[]> => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const validationResult = questionsArraySchema.safeParse(data.results);

        if (!validationResult.success) {
            throw new Error(validationResult.error.errors[0].message);
        }

        return validationResult.data;
    } catch (error) {
        throw error;
    }
};

export const quizQueryKey = 'getQuiz'; // Key for the query cache

export const useQuizQuery = () => {
    return useQuery(quizQueryKey, fetchQuizData);
};
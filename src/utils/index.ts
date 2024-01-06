import { NormalizedQuestion as NormalizedQuestion, Question, questionsArraySchema } from "@src/types/quiz";

export const shuffleAnswers = (question: NormalizedQuestion) => {
    const unshuffleAnswers = [
        question?.correctAnswer,
        ...question?.incorrectAnswers
    ]

    return unshuffleAnswers.map(unshuffleAnswers => ({
        sort: Math.random(),
        value: unshuffleAnswers
    })).sort((a, b) => a.sort - b.sort).map((a) => a.value)
}

export const normalizeQuestions = (backendQuestions: Question[]): NormalizedQuestion[] => {
    const validationResult = questionsArraySchema.safeParse(backendQuestions);
    if (!validationResult.success) {
        throw new Error(validationResult.error.errors[0].message);
    }
    return backendQuestions.map((backendQuestion) => {
        const incorrectAnswers = backendQuestion.incorrect_answers.map(
            (incorrectAnswer) => decodeURIComponent(incorrectAnswer)
        );
        return {
            correctAnswer: decodeURIComponent(backendQuestion.correct_answer),
            question: decodeURIComponent(backendQuestion.question),
            incorrectAnswers,
        };
    });
};



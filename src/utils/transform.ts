import { AnswerNote, FormDataType } from "@src/types/answerNote";
import { NormalizedQuestion } from "@src/types/quiz";

export const transformAnswerNotesWithQuestion = (answerNotes: AnswerNote[], questions: NormalizedQuestion[]): AnswerNote[] => {
    if (answerNotes.length === questions.length) {
        return answerNotes
    }

    return questions.map((question, index) => {
        return {
            id: index,
            question: question.question,
            answer: question.correctAnswer,
            note: answerNotes[index]?.note || ""
        }
    })
}


export const transformFormDataToAnswerNotes = (formData: FormDataType, answerNotes: AnswerNote[]): AnswerNote[] => {
    return answerNotes.map((answerNote) => {
        return {
            ...answerNote,
            note: formData[answerNote.id.toString()] ?? ""
        }
    })
}
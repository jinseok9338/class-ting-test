import { AnswerNote, answerNotesSchema } from "@src/types/answerNote";
import { ANSWER_SESSION_STORAGE_KEY, RESULT } from "@src/utils/consts";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AnswerNoteStorage, ResultStorage } from ".";
import { Result, ResultInputType, resultSchema } from "@src/types/context";


const stroage = new AnswerNoteStorage<AnswerNote[]>(answerNotesSchema, ANSWER_SESSION_STORAGE_KEY)
export const fetchAnswerNotes = (): AnswerNote[] => {
    let value = stroage.getAnswerNotes();
    if (value._tag === "Some") {
        return value.value
    }
    return []
};

const quizQueryKey = 'getAnswerNotes'; // Key for the query cache

export const useAnswerNotesQuery = () => {
    return useQuery(quizQueryKey, fetchAnswerNotes, { suspense: true });
};


export const useSetAnswerNotesMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(async (newAnswerNotes: AnswerNote[]) => {
        return stroage.setAnswerNotes(newAnswerNotes);
    }, {
        onSuccess() {
            queryClient.invalidateQueries('getAnswerNotes');
        }
    });
};



const resultStorage = new ResultStorage(resultSchema, RESULT);


const resultQueryKey = 'getResult';
export const fetchResult = (): Result => {
    let value = resultStorage.getResults();
    if (value._tag === "Some") {
        return value.value
    }
    return { correctAnswersCount: 0, correctAnswers: [], time: 0 };

}

export const useResultQuery = () => {
    return useQuery(resultQueryKey, fetchResult, { suspense: true });
}

export const useSetResultMutation = () => {
    const queryClient = useQueryClient();
    let value = resultStorage.getResults();

    return useMutation(async (newResult: ResultInputType) => {
        let existingResult = value._tag === "Some" ? value.value : { correctAnswersCount: 0, correctAnswers: [], time: 0 }
        let newValue = {
            ...existingResult,
            ...newResult
        }
        return resultStorage.setResults(newValue);
    }, {
        onSuccess() {
            queryClient.invalidateQueries(resultQueryKey);
        }
    });
}  
import { AnswerNote, answerNotesSchema } from "@src/types/answerNote";
import { ANSWER_SESSION_STORAGE_KEY, RESULT_SESSION_STORAGE_KEY } from "@src/utils/consts";
import { useQueryClient } from "react-query";
import { AnswerNoteStorage, ResultStorage } from ".";
import { Result, ResultInputType, resultSchema } from "@src/types/context";
import { useCustomQuery as useQuery, useCustomMutation as useMutation } from "@src/api/client";

const stroage = new AnswerNoteStorage<AnswerNote[]>(answerNotesSchema, ANSWER_SESSION_STORAGE_KEY)
export const fetchAnswerNotes = (): Promise<AnswerNote[]> => {
    let value = stroage.getAnswerNotes();
    if (value._tag === "Some") {
        return Promise.resolve(value.value)
    }
    return Promise.resolve([])
};

const quizQueryKey = 'getAnswerNotes';

export const useAnswerNotesQuery = () => {
    return useQuery<AnswerNote[]>({ queryKey: quizQueryKey, queryFn: fetchAnswerNotes, suspense: true });
};


const setAnswerNotesQueryKey = 'setAnswerNotes';
export const useSetAnswerNotesMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<void, AnswerNote[]>({
        mutationKey: setAnswerNotesQueryKey,
        mutationFn: (newAnswerNotes: AnswerNote[]) => {
            return Promise.resolve(stroage.setAnswerNotes(newAnswerNotes))
        },
        onSuccess() {
            queryClient.invalidateQueries('getAnswerNotes');
        }
    })
};



const resultStorage = new ResultStorage(resultSchema, RESULT_SESSION_STORAGE_KEY);


const resultQueryKey = 'getResult';
export const fetchResult = (): Promise<Result> => {
    let value = resultStorage.getResults();
    if (value._tag === "Some") {
        return Promise.resolve(value.value)
    }
    return Promise.resolve({ correctAnswersCount: 0, correctAnswers: [], time: 0 });

}

export const useResultQuery = () => {
    return useQuery<Result>({ queryKey: resultQueryKey, queryFn: fetchResult, suspense: true });
}

const setResultQueryKey = 'setResult';
export const useSetResultMutation = () => {
    const queryClient = useQueryClient();
    let value = resultStorage.getResults();

    return useMutation<void, ResultInputType>({
        mutationKey: setResultQueryKey,
        mutationFn: (newResult: ResultInputType) => {
            let existingResult = value._tag === "Some" ? value.value : { correctAnswersCount: 0, correctAnswers: [], time: 0 }
            let newValue = {
                ...existingResult,
                ...newResult
            }
            return Promise.resolve(resultStorage.setResults(newValue))
        },
        onSuccess() {
            queryClient.invalidateQueries(resultQueryKey);
        }
    })
}  
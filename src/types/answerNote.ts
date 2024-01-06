import { z } from "zod"

export type AnswerNote = {
    id: number,
    question: string,
    answer: string,
    note?: string
}


export const answerNotesSchema = z.array(
    z.object({
        id: z.number(),
        question: z.string(),
        answer: z.string(),
        note: z.string().optional()
    })
)


export type FormDataType = Record<string, string>



const keySchema = z.union([
    z.literal('0'),
    z.literal('1'),
    z.literal('2'),
    z.literal('3'),
    z.literal('4'),
    z.literal('5'),
    z.literal('6'),
    z.literal('7'),
    z.literal('8'),
    z.literal('9'),
]);

export const FormDataSchema = z.record(z.string()).refine((value) => {
    return Object.keys(value).every((key) => keySchema.safeParse(key).success);
}, {
    message: "Keys must be numbers from 0 to 9",
    path: ['FormDataSchema']
});
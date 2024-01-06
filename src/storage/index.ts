import { OptionType } from "@src/types/util";
import { z } from "zod";

export class SessionStorage {

    protected get(key: string): string | null {
        return sessionStorage.getItem(key);
    }

    protected set(key: string, value: string): void {
        sessionStorage.setItem(key, value);
    }

    protected remove(key: string): void {
        sessionStorage.removeItem(key);
    }

    protected clear(): void {
        sessionStorage.clear();
    }
}



export class AnswerNoteStorage<T> extends SessionStorage {
    private key: string
    private schema: z.Schema<T>

    private parse(value: string, schema: z.Schema<T>): OptionType<T> {
        try {
            return {
                _tag: "Some",
                value: schema.parse(JSON.parse(value))
            }
        } catch {
            return {
                _tag: "None"
            }
        }

    }

    private parseIntoString(value: T): string {
        return JSON.stringify(value);
    }




    getAnswerNotes(): OptionType<T> {
        let string_value = this.get(this.key);
        if (!string_value) {
            return {
                _tag: "None"
            }
        }
        return this.parse(string_value, this.schema);
    }

    setAnswerNotes(value: T): void {
        this.set(this.key, this.parseIntoString(value));
    }

    clearAnswerNotes(): void {
        this.remove(this.key);
    }

    constructor(schema: z.Schema<T>, key: string) {
        super();
        this.key = key;
        this.schema = schema;
    }
}

export class ResultStorage<T> extends SessionStorage {
    private key: string
    private schema: z.Schema<T>

    private parse(value: string, schema: z.Schema<T>): OptionType<T> {
        try {
            return {
                _tag: "Some",
                value: schema.parse(JSON.parse(value))
            }
        } catch {
            return {
                _tag: "None"
            }
        }

    }

    private parseIntoString(value: T): string {
        return JSON.stringify(value);
    }

    getResults(): OptionType<T> {
        let string_value = this.get(this.key);
        if (!string_value) {
            return {
                _tag: "None"
            }
        }
        return this.parse(string_value, this.schema);
    }

    setResults(value: T): void {
        this.set(this.key, this.parseIntoString(value));
    }

    clearResults(): void {
        this.remove(this.key);
    }

    constructor(schema: z.Schema<T>, key: string) {
        super();
        this.key = key;
        this.schema = schema;
    }
}
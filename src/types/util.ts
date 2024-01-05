type Some<T> = {
    _tag: "Some",
    value: T
}

type None = {
    _tag: "None"
}


type OK<T> = {
    _tag: "OK",
    value: T
}

type Error = {
    _tag: "Error",
    value: string
}
export type OptionType<T> = Some<T> | None
export type ResultType<T> = OK<T> | Error


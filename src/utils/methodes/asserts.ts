export function assertsIsDate(date: any): asserts date is Date {
    if (!(date instanceof Date)) {
        throw new Error(`Error! ${date} is not a Date!`)
    }
}

enum DateFormat {
    YYYY_MM_DD = 'YYYY-MM-DD'
}

export function formatDate(date:Date):string{
    return (
        date.getFullYear().toString() + '-'
        + date.getMonth().toString() + '-'
        + date.getDate().toString());
}
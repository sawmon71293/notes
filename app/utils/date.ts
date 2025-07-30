export const dateFormatter = (date: string): string => {
    const dt = new Date(date);
    return isNaN(dt.getTime())
        ? ''
        : dt.toISOString().split('.')[0].replace('T', ' ');
}

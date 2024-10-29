export function dateCompare(date1, date2) {
    const now = new Date();
    const startDate = date1 ? new Date(date1) : now;
    const endDate = date2 ? new Date(date2) : now;

    if (startDate < endDate) {
        return {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            comparison: 'startDate is before endDate'
        };
    } else if (startDate > endDate) {
        return {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            comparison: 'startDate is after endDate'
        };
    } else {
        return {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            comparison: 'startDate is the same as endDate'
        };
    }
}
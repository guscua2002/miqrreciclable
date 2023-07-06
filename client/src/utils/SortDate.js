export const SortDate = (arrayToOrder) => {
    const result = arrayToOrder.sort((a, b) => {
        const dateA = a.datecreate;
        const dateB = b.datecreate;
        if (dateA > dateB) {
            return -1;
        } else if (dateA < dateB) {
            return 1;
        } else {
            return 0;
        }
    });

    return result;
}   

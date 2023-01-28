export const useCurrentPriceFormatter = (currPriceUnformatted: number | string) => {
    if (String(currPriceUnformatted).includes('e')) {
        currPriceUnformatted = String(currPriceUnformatted).split('e')[0];
        currPriceUnformatted = Number(currPriceUnformatted);
    }

    currPriceUnformatted = Number(currPriceUnformatted).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8,
    });

    return currPriceUnformatted;
}
export const usePriceFormatter = (
    currPrice: number | string,
    optionalDecimals?: boolean,
): string => {
    if (String(currPrice).includes('e')) {
        currPrice = String(currPrice).split('e')[0];
        currPrice = Number(currPrice);
    }

    currPrice = Number(currPrice);

    if (optionalDecimals && currPrice > 999) {
        currPrice = currPrice.toLocaleString(undefined, {
            maximumFractionDigits: 0,
        });
    } else {
        currPrice = currPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 8,
        });
    }

    return currPrice;
};

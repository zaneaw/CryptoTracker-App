export const priceChangeOptions = (
    priceChangePercentage: number,
): [string, boolean] => {
    let priceChangeNegBool: boolean = false;
    let priceChangePercentageFormatted: string;

    if (priceChangePercentage === null) {
        return ['0.00', priceChangeNegBool];
    }

    if (priceChangePercentage < 0) {
        priceChangeNegBool = true;
        priceChangePercentage = Math.abs(priceChangePercentage);
    }

    priceChangePercentageFormatted = priceChangePercentage.toFixed(2);

    return [priceChangePercentageFormatted, priceChangeNegBool];
};

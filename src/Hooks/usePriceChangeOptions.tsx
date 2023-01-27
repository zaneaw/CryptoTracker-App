export const usePriceChangeOptions = (priceChangePercentage: number): [string, boolean] => {
    let priceChangeNegBool: boolean = false;
    let priceChangePercentageFormatted: string;

    if (priceChangePercentage < 0) {
        priceChangeNegBool = true;
        priceChangePercentage = Math.abs(priceChangePercentage);
    }

    priceChangePercentageFormatted = priceChangePercentage.toFixed(2);

    return [priceChangePercentageFormatted, priceChangeNegBool];
}
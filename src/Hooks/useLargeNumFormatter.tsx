export const useLargeNumFormatter = (marketCap: number) => {
    let formattedNum: string | number;

    if (marketCap >= 1000000000000) {
        // trillion
        formattedNum = (marketCap / 1000000000000).toFixed(2) + ' T';
    } else if (marketCap >= 1000000000) {
        // billion
        formattedNum = (marketCap / 1000000000).toFixed(2) + ' B';
    } else if (marketCap >= 1000000) {
        // million
        formattedNum = (marketCap / 1000000).toFixed(2) + ' M';
    } else if (marketCap >= 1000) {
        // thousands
        formattedNum = (marketCap / 1000).toFixed(2) + ' K';
    } else {
        formattedNum = marketCap;
    }

    return formattedNum;
};
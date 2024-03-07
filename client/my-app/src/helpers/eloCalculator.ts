export const CalculateExpectedResult = (playerRating: number, opponentRating: number) => {
    return 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
}
export const CalculateRatingChange = (playerRating: number, opponentRating: number, result: number) => {
    let expectedResult = CalculateExpectedResult(playerRating,opponentRating);
    return Math.floor(50 * (result - expectedResult));
}
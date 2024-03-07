export const CalculateExpectedResult = (playerRating, opponentRating) => {
    return 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
}
export const CalculateRatingChange = (playerRating, opponentRating, result) => {
    let expectedResult = CalculateExpectedResult(playerRating,opponentRating);
    return Math.floor(50 * (result - expectedResult));
}
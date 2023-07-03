
export function createPages(pages: Array<number>, pagesCount: number| undefined, currentPage: number) {
    if (pagesCount && pagesCount > 10) {
        if (currentPage > 5) {
            for (let i = currentPage - 4; i <= currentPage + 5; i++) {
                pages.push(i);
                if (i == pagesCount) break
            }
        } else {
            for (let i = 1; i <= 10; i++) {
                pages.push(i);
                if (i == pagesCount) break
            }
        }
    } else {
        if (pagesCount) {
            for (let i = 1; i <= pagesCount; i++) {
                pages.push(i)
            }
        }
    }
}
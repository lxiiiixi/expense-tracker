export function switchDate(timstamp: number) {
    if (!timstamp || timstamp <= 0) {
        return "";
    }
    const date = new Date(timstamp);
    const Y = `${date.getFullYear()}-`;
    const M = `${date.getMonth() + 1 < 10 ? `${date.getMonth() + 1}` : date.getMonth() + 1}-`;
    const D = `${date.getDate() < 10 ? `${date.getDate()}` : date.getDate()}`;
    return Y + M + D;
}

export function getYearAndMon(timstamp: number) {
    if (!timstamp || timstamp <= 0) {
        return "";
    }
    const date = new Date(timstamp);
    const Y = `${date.getFullYear()}-`;
    const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}`;
    return Y + M;
}

export function switchTime(timstamp: number) {
    if (!timstamp) {
        return "";
    }
    const date = new Date(timstamp);
    const Y = `${date.getFullYear()}-`;
    const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
    const D = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} `;
    const h = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:`;
    const m = `${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:`;
    const s = `${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`;
    return Y + M + D + h + m + s;
}

export const formatDobArray = (arr) => {
    if (!arr || arr.length !== 8) return '';

    const day = arr[0] + arr[1];
    const month = arr[2] + arr[3];
    const year = arr[4] + arr[5] + arr[6] + arr[7];

    return `${day}-${month}-${year}`;
}
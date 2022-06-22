export const round = (number: number, scale: number) => Math.round((number + Number.EPSILON) * 10 ** scale) / 10 ** scale;

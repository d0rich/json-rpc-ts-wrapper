export const mathService = {
    summ(numbers: number[] = []){
        return numbers.reduce((summ, current) => {
            return summ + current
        }, 0)
    },
    subtract(params: {
        left: number,
        right: number
    }){
        return params.left - params.right
    }
}
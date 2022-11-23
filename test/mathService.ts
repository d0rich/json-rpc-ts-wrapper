import axios from "axios";

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
    },
    async fetchProduct(){
        const result = await axios.get('https://dummyjson.com/products/1')
        return result.data as { id: number }
    }
}
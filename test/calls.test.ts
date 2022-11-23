import {service} from "./service";
import {client} from "./client";

test('Sum of 1 and 2 should return 3', async () => {
    const httpServer = service.listen(3000)
    expect(await client.summ([1, 2])).toBe(3)
    httpServer.close()
})

test('5 subtract 3 should return 2', async () => {
    const httpServer = service.listen(3000)
    expect(await client.subtract({ left: 5, right: 3 })).toBe(2)
    httpServer.close()
})

test('fetchProduct should return object with id:1', async () => {
    const httpServer = service.listen(3000)
    const todo = await client.fetchProduct()
    expect(todo.id).toBe(1)
    httpServer.close()
})


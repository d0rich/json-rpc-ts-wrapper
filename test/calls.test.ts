import {service} from "./service";
import {client} from "./client";

jest.setTimeout(100000)

test('Sum of 1 and 2 should return 3', async () => {
    const httpServer = service.listen(3000)
    expect(await client.summ([1, 2])).toBe(3)
    httpServer.close()
})


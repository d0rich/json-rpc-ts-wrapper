# json-rpc-ts-wrapper

TypeScript wrapper from [json-rpc-2.0](https://www.npmjs.com/package/json-rpc-2.0). Create single object with available methods and transform it into typed JSON RPC service and client.

## Installation

```shell
npm i json-rpc-ts-wrapper
```

## Usage

### Create methods

Create your object with methods, which will be available via JSON RPC:

```typescript
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
```

You can check if your services compatible with wrapper by assigning `CompatibleService` type. But it is recommended to finally remove type assignation, as it will override names of methods in types.

```typescript
import {CompatibleService} from "json-rpc-ts-wrapper";

export const mathService: CompatibleService = {}
```

### Server

Wrap created service with `createService()` function.

```typescript
import {createService} from "json-rpc-ts-wrapper";
import {JSONRPCServer} from "json-rpc-2.0";
import {mathService} from "./mathService";

const service: JSONRPCServer = createService(mathService)
```

Optionally, you can provide your own `JSONRPCServer` implementation as 2nd argument.

```typescript
import {createService} from "json-rpc-ts-wrapper";
import {JSONRPCServer} from "json-rpc-2.0";
import {mathService} from "./mathService";

const myJSONRPCServer = new JSONRPCServer()
const jsonRpcServer: JSONRPCServer = createService(mathService, myJSONRPCServer)
```

Create server listening to requests.

```typescript
import * as express from 'express'
import * as bodyParser from "body-parser";

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.post('/json-rpc', (req, res) => {
    jsonRpcServer
        .receive(req.body)
        .then(response => response ? res.send(response) : res.sendStatus(204))
})

app.listen(8080)
```

### Client

Create `JSONRPCClient` for communication with your server.

```typescript
import axios from "axios";
import {JSONRPCClient} from "json-rpc-2.0";

const jsonRpcClient = new JSONRPCClient(async (jsonRPCRequest) => {
    const response = await axios.post('http://localhost:8080/json-rpc', jsonRPCRequest)
    if (response.status === 200){
        jsonRpcClient.receive(response.data)
    } else {
        throw new Error(response.statusText)
    }
})
```

Wrap client into service methods.

```typescript
import {createClient} from "json-rpc-ts-wrapper";

const client = createClient(mathService, jsonRpcClient)
```

Client object contains async methods of the service, which are called with `JSONRPCClient`.

```typescript
import {client} from "./client";

client.summ([1, 2])
    .then(result => console.log(result)) // 3
client.subtract({left: 5, right: 3})
    .then(result => console.log(result)) // 2
client.fetchProduct()
    .then(result => console.log(result)) // Response from https://dummyjson.com/products/1
```
import {createClient} from "../src";
import {mathService} from "./mathService";
import {JSONRPCClient} from "json-rpc-2.0";
import axios from "axios";

const jsonRpcClient = new JSONRPCClient(async (jsonRPCRequest) => {
    const response = await axios.post('http://localhost:3000/json-rpc', jsonRPCRequest)
    console.log('[Response]', response.data)
    if (response.status === 200){
        jsonRpcClient.receive(response.data)
    } else {
        throw new Error(response.statusText)
    }
})

export const client = createClient(mathService, jsonRpcClient)
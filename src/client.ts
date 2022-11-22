import {CompatibleService} from "./service";
import {JSONRPCClient} from "json-rpc-2.0";

export type GetWrappedClientType<Service extends CompatibleService, ClientParams = any> = {
    [key in keyof Service]: (params: Parameters<Service[key]>[0],
                             clientParams?: ClientParams) => PromiseLike<ReturnType<Service[key]>>
}

export function createClient<Service extends CompatibleService = {}, ClientParams = any>
(serviceMethods: Service, jsonRpcClient:  JSONRPCClient<ClientParams>): GetWrappedClientType<Service, ClientParams>{
    const client: any = {}
    for (let key in serviceMethods){
        if (typeof serviceMethods[key] === 'function') {
            const method = serviceMethods[key]
            client[key] = async function (params: Parameters<typeof method>[0],
                                          clientParams: ClientParams | undefined = undefined){
                return await jsonRpcClient.request(key, params, clientParams) as PromiseLike<ReturnType<typeof method>>
            }
        }
    }
    return client
}
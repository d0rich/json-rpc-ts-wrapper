import {JSONRPCServer, JSONRPCServerOptions, SimpleJSONRPCMethod} from "json-rpc-2.0";

export type CompatibleService = {
    [key: string]: SimpleJSONRPCMethod
}

export function createService<T extends CompatibleService = {}>(
    serviceMethods: T,
    service: JSONRPCServer = new JSONRPCServer()) {
    for (let key in serviceMethods) {
        if (typeof serviceMethods[key] === 'function') {
            service.addMethod(key, serviceMethods[key])
        }
    }
    return service
}
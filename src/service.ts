import {JSONRPCServer, JSONRPCServerOptions, SimpleJSONRPCMethod} from "json-rpc-2.0";

export type CompatibleService = {
    [key: string]: SimpleJSONRPCMethod
}

export function createService<T extends CompatibleService>(serviceMethods: T, options: JSONRPCServerOptions = {}) {
    const service = new JSONRPCServer(options)
    for (let key in serviceMethods) {
        if (typeof serviceMethods[key] === 'function') {
            service.addMethod(key, serviceMethods[key])
        }
    }
    return service
}
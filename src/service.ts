import {JSONRPCServer, JSONRPCServerOptions, SimpleJSONRPCMethod} from "json-rpc-2.0";

export type CompatibleService = {
    [key: string]: SimpleJSONRPCMethod
}

/**
 * Register all your service methods in JSON RPC server
 *
 * @param { Service extends CompatibleService }  serviceMethods
 * @param {JSONRPCServer} service
 *
 * @return `JSONRPCServer` object with registered methods from provided `serviceMethods`
 */
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
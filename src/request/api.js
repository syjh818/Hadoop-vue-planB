import service from "./request"

export function getData(path, params) {
    return service.get(path, {
        params
    })
}

export function postData(path, data) {
    return service.post(path, data)
}

export function getExcelFile(path) {
    return service.get(path, {
        //设置响应类型
        responseType: 'blob',
    })
}

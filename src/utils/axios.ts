import axios, { AxiosInstance, RawAxiosRequestConfig, AxiosResponse } from 'axios';

class Axios {
    public http: AxiosInstance;
    constructor() {
        this.http = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com' });
    }

    async get(url: string, config?: RawAxiosRequestConfig): Promise<AxiosResponse> {
        return await this.http.get(url, config);
    }

    async post<T>(url: string, data?: T, config?: RawAxiosRequestConfig): Promise<AxiosResponse> {
        return await this.http.post(url, data, config);
    }

    async patch<T>(url: string, data?: T, config?: RawAxiosRequestConfig): Promise<AxiosResponse> {
        return await this.http.patch(url, data, config);
    }

    async put<T>(url: string, data?: T, config?: RawAxiosRequestConfig): Promise<AxiosResponse> {
        return await this.http.put(url, data, config);
    }

    async delete(url: string, config?: RawAxiosRequestConfig): Promise<AxiosResponse> {
        return await this.http.delete(url, config);
    }
}

export default new Axios();

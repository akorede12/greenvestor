/* A JavaScript object that has two functions, get and set. The get function takes two parameters, name
and alt. It returns the value of the local storage item with the name of the first parameter, or the
second parameter if the first parameter is not found. The set function takes a key and a value, and
then it stores the value in the local storage under the key. */
export const storage: object = {
    /* `key: 'auth_token',` is setting the value of the `key` property of the `storage` object to
    `'auth_token'`. This property is used in the `set` and `get` functions to store and retrieve the
    value of the `auth_token` key in the local storage. */
    key: 'auth_token',
    /* A function that takes two parameters, name and alt. It returns the value of the local storage
    item with the name of the first parameter, or the second parameter if the first parameter is not
    found. */
    get(name: string, alt: any = '') {
        return JSON.parse(localStorage.getItem(name) || alt) || alt;
    },
    /**
     * It takes a key and a value, and then it stores the value in the local storage under the key.
     * @param key - The key to store the value under.
     * @param value - The value to store.
     */
    set<T>(key: string, value: T) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    /** 
    `set token(value: any)` is a setter function that sets the value of the local storage item with
    the key `auth_token`. It calls the `set` function of the `storage` object with the `key`
    property as the first parameter and the `value` parameter as the second parameter. This allows
    the user to set the `auth_token` value in the `storage` object using the `token` property. 
    * @param value - The value to save to the localstorage 
    */
    set token(value: any) {
        this.set(this.key, value);
    },
    /* `get token(): any` is a getter function that returns the value of the local storage item with
    the key `auth_token`. It calls the `get` function of the `storage` object with the `key`
    property as the first parameter and returns the result. This allows the user to access the
    `auth_token` value from the `storage` object using the `token` property. */
    get token(): any {
        return this.get(this.key);
    },
};
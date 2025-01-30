import { STORE_DB_NAME, STORE_NAME_FOR_ALL_LINES, STORE_NAME_FOR_NAILS } from "../utils/constants";

export class Storage {
    private storeName: string = ""

    public constructor(storeName: string) {
        this.storeName = storeName
    }
    public openIndexedDB = (): Promise<IDBDatabase> => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(STORE_DB_NAME, 1);

            request.onupgradeneeded = function (event) {
                const db = (event.target as IDBRequest).result;
                if (!db.objectStoreNames.contains(STORE_NAME_FOR_ALL_LINES)) {
                    db.createObjectStore(STORE_NAME_FOR_ALL_LINES, { keyPath: "id" });
                }
                if (!db.objectStoreNames.contains(STORE_NAME_FOR_NAILS)) {
                    db.createObjectStore(STORE_NAME_FOR_NAILS, { keyPath: "id" });
                }
            };

            request.onsuccess = function (event) {
                const db = (event.target as IDBRequest).result;
                resolve(db);
            };

            request.onerror = function (event) {
                reject("Error opening IndexedDB: " + (event.target as IDBRequest).error);
            };
        });
    };
    public put = async (key: string, value: any): Promise<void> => {
        try {
            const db = await this.openIndexedDB();
            const transaction = db.transaction([this.storeName], "readwrite");
            const store = transaction.objectStore(this.storeName);

            const getRequest = new Promise((resolve, reject) => {
                const request = store.get(key);

                request.onsuccess = () => resolve(request.result);
                request.onerror = (event) => reject((event.target as IDBRequest).error);
            });

            const result = await getRequest;

            const putRequest = new Promise<void>((resolve, reject) => {
                store.put({ id: key, value: value });

                transaction.oncomplete = () => {
                    console.log(`Data saved inside indexed db ${this.storeName} store with ${key} successfully!`);
                    resolve();
                };

                transaction.onerror = (event) => {
                    console.error(`Failed to save data: ${(event.target as IDBRequest).error}`);
                    reject((event.target as IDBRequest).error);
                };
            });

            await putRequest;
        } catch (error) {
            console.error("Error:", error);
        }
    };
    public clearObjectStore = async (): Promise<void> => {
        try {
            const db = await this.openIndexedDB();
            const transaction = db.transaction([this.storeName], "readwrite");
            const store = transaction.objectStore(this.storeName);
            const request = store.clear();

            request.onsuccess = () => {
                console.log(`${this.storeName} object store cleared successfully!`);
            };

            request.onerror = (event) => {
                console.error(`Failed to clear ${this.storeName} object store: ${(event.target as IDBRequest).error}`);
            };
        } catch (error) {
            console.error("Error clearing object store:", error);
        }
    };

    public getByKey = async (key: string): Promise<any> => {
        try {
            const db = await this.openIndexedDB();
            const transaction = db.transaction([this.storeName], "readonly");
            const store = transaction.objectStore(this.storeName);

            const request = store.get(key);

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    const result = request.result;
                    if (result) {
                        resolve(result.value);
                    } else {
                        console.log("No data found in IndexedDB.");
                        resolve({});
                    }
                };

                request.onerror = (event) => {
                    console.error(`Failed to retrieve data: ${(event.target as IDBRequest).error}`);
                    reject(`Error: ${(event.target as IDBRequest).error}`);
                };
            });
        } catch (error) {
            console.error("Error retrieving data from IndexedDB:", error);
            return {};
        }
    };
}
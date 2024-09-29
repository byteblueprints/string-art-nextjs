import { Dispatch, SetStateAction } from "react";

export class Storage {
    private storeName: string = ""
    private dbName: string = "StringArt"

    public constructor(storeName: string) {
        this.storeName = storeName
    }
    public openIndexedDB = (): Promise<IDBDatabase> => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onupgradeneeded = function (event) {
                const db = (event.target as IDBRequest).result;
                if (!db.objectStoreNames.contains("lines")) {
                    db.createObjectStore("lines", { keyPath: "id" });
                }
                if (!db.objectStoreNames.contains("nails")) {
                    db.createObjectStore("nails", { keyPath: "id" });
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

    public store = async (key: string, value: any): Promise<void> => {
        try {
            const db = await this.openIndexedDB();
            const transaction = db.transaction([this.storeName], "readwrite");
            const store = transaction.objectStore(this.storeName);

            const request = store.get(key);

            request.onsuccess = () => {
                store.put({ id: key, value: value });

                transaction.oncomplete = () => {
                    console.log(`Data saved inside indexed db ${this.storeName} store with ${key} successfully!`);
                };

                transaction.onerror = (event) => {
                    console.error(`Failed to save data: ${(event.target as IDBRequest).error}`);
                };
            };
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
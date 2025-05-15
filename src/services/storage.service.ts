import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private _ready = new BehaviorSubject<boolean>(false);
  private platformId = inject(PLATFORM_ID);
  private storage = inject(Storage);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.init();
    }
  }

  private async init() {
    try {
      const storage = await this.storage.create();
      this._storage = storage;
      this._ready.next(true);
    } catch (error) {
      console.error('Storage initialization failed:', error);
      this._ready.next(false);
    }
  }

  /**
   * Get the storage ready state
   */
  get ready(): Observable<boolean> {
    return this._ready.asObservable();
  }

  /**
   * Set a value in storage
   * @param key The key to store the value under
   * @param value The value to store
   */
  async set<T>(key: string, value: T): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this._storage) {
      await this._storage.set(key, value);
    }
  }

  /**
   * Get a value from storage
   * @param key The key to retrieve
   * @param defaultValue Optional default value if key doesn't exist
   */
  async get<T>(key: string, defaultValue?: T): Promise<T | null> {
    if (!isPlatformBrowser(this.platformId)) return defaultValue || null;

    let result = null;
    if (this._storage) {
      result = await this._storage.get(key);
    }
    return result || defaultValue || null;
  }

  /**
   * Remove a value from storage
   * @param key The key to remove
   */
  async remove(key: string): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this._storage) {
      await this._storage.remove(key);
    }
  }

  /**
   * Clear all values from storage
   */
  async clear(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this._storage) {
      await this._storage.clear();
    }
  }

  /**
   * Get all keys in storage
   */
  async keys(): Promise<string[]> {
    if (!isPlatformBrowser(this.platformId)) return [];

    let result: string[] = [];
    if (this._storage) {
      result = await this._storage.keys();
    }
    return result;
  }

  /**
   * Get the number of items in storage
   */
  async length(): Promise<number> {
    if (!isPlatformBrowser(this.platformId)) return 0;

    let result = 0;
    if (this._storage) {
      result = await this._storage.length();
    }
    return result;
  }

  /**
   * Check if a key exists in storage
   * @param key The key to check
   */
  async hasKey(key: string): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId)) return false;

    let result = false;
    if (this._storage) {
      result = (await this._storage.get(key)) !== null;
    }
    return result;
  }

  /**
   * Get a value from storage as an Observable
   * @param key The key to retrieve
   * @param defaultValue Optional default value if key doesn't exist
   */
  get$<T>(key: string, defaultValue?: T): Observable<T | null> {
    return from(this.get<T>(key, defaultValue));
  }

  /**
   * Set a value in storage as an Observable
   * @param key The key to store the value under
   * @param value The value to store
   */
  set$<T>(key: string, value: T): Observable<void> {
    return from(this.set(key, value));
  }

  /**
   * Watch a value in storage for changes
   * @param key The key to watch
   * @param defaultValue Optional default value if key doesn't exist
   */
  watch$<T>(key: string, defaultValue?: T): Observable<T | null> {
    if (!isPlatformBrowser(this.platformId)) {
      return this.get$<T>(key, defaultValue);
    }

    return this.get$<T>(key, defaultValue).pipe(
      tap((value) => {
        this._storage?.get(key).then((newValue: unknown) => {
          if (JSON.stringify(newValue) !== JSON.stringify(value)) {
            this.get$<T>(key, defaultValue);
          }
        });
      }),
    );
  }
}

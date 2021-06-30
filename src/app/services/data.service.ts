import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _storage: Storage | null = null;

  apiKey = 'vntZjXPlQRRBAjrNRZRZTpizTjHk5ud9';

  baseUrl: string = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key='
  
  constructor(private http: HttpClient, private storage: Storage) { 

    this.initializeStorage()
  }
  
  async initializeStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: any) {
    if (this._storage.get(key)) {
      this._storage.remove(key);
    }
    this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    try {
      const result = await this._storage.get(key);
      if (result != null) {
        return JSON.parse(result);
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }

  getMostPopularAricles(){
    return this.http.get(this.baseUrl + this.apiKey);
  }

}

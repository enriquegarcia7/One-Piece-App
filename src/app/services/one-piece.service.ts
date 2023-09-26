import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OnePieceService {
  http = inject(HttpClient);

  //----obtener temporadas---
  getSeasons() {
    return this.http.get(environment.baseUrl + environment.seasons);
  }
}

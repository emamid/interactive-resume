import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResumeApi {
  private readonly http = inject(HttpClient);

  get(url: string) {
    return firstValueFrom(this.http.get<unknown>(url));
  }
}

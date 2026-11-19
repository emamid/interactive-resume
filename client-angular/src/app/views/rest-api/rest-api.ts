import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { IonButton, IonInput, IonSelect, IonSelectOption } from '@ionic/angular';

import { ResumeApi } from '../../api/resume-api';
import { apiURL, readStorage, writeStorage } from '../../api/utils';
import { JsonViewer } from '../../components/json-viewer/json-viewer';

@Component({
  selector: 'app-rest-api',
  imports: [IonButton, IonInput, IonSelect, IonSelectOption, JsonViewer],
  templateUrl: './rest-api.html',
  styleUrl: './rest-api.scss',
})
export class RestApi {
  private readonly api = inject(ResumeApi);

  protected readonly endpointItems = ['employers', 'myself', 'projects', 'project-tags', 'tags'];
  private readonly idEndpoints = ['employers', 'projects', 'tags'];
  private readonly helperText: Record<string, string> = {
    employers: 'employerID',
    projects: 'projectID',
    tags: 'tagID',
  };

  protected readonly endpoint = signal(readStorage('rest-endpoint', 'employers'));
  protected readonly id = signal(readStorage('rest-id', ''));
  protected readonly lastEndpoint = signal<string | undefined>(undefined);
  protected readonly lastURL = signal<string | undefined>(undefined);
  protected readonly data = signal<unknown>(undefined);
  protected readonly statusMessage = signal<string | undefined>(undefined);

  constructor() {
    void this.makeRequest();
  }

  protected allowsId(testEndpoint?: string) {
    return !!testEndpoint && this.idEndpoints.includes(testEndpoint);
  }

  protected hint() {
    return this.helperText[this.endpoint()] ?? '';
  }

  protected setEndpoint(value: unknown) {
    if (typeof value !== 'string' || value === this.endpoint()) {
      return;
    }
    this.endpoint.set(value);
    this.id.set('');
    writeStorage('rest-endpoint', value);
    writeStorage('rest-id', '');
  }

  protected setId(value: string | null | undefined) {
    const id = value ?? '';
    this.id.set(id);
    writeStorage('rest-id', id);
  }

  protected itemClicked(itemId: string) {
    const endpoint = this.lastEndpoint() || '';
    this.endpoint.set(endpoint);
    this.id.set(itemId);
    writeStorage('rest-endpoint', endpoint);
    writeStorage('rest-id', itemId);
    void this.makeRequest();
  }

  protected async makeRequest() {
    const endpoint = this.endpoint();
    const id = this.id().trim();
    const url = apiURL(`${endpoint}/${this.allowsId(endpoint) && id.length ? id : ''}`);
    this.lastEndpoint.set(endpoint);
    this.lastURL.set(url);
    try {
      this.data.set(await this.api.get(url));
      this.statusMessage.set(undefined);
    } catch (error: unknown) {
      this.data.set(null);
      if (error instanceof HttpErrorResponse) {
        this.statusMessage.set(`${error.status}: ${error.statusText}`);
      } else {
        this.statusMessage.set('Request failed');
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { WorkbasketDefinition } from 'app/shared/models/workbasket-definition';
import { TaskanaDate } from 'app/shared/util/taskana.date';
import { BlobGenerator } from 'app/shared/util/blob-generator';

@Injectable()
export class WorkbasketDefinitionService {
  url: string = `${environment.taskanaRestUrl}/v1/workbasket-definitions`;

  constructor(private httpClient: HttpClient) {}

  // GET
  async exportWorkbaskets(domain: string) {
    const domainRequest = domain === '' ? domain : `?domain=${domain}`;
    const workbasketDefinitions = await this.httpClient
      .get<WorkbasketDefinition[]>(this.url + domainRequest)
      .toPromise();
    BlobGenerator.saveFile(workbasketDefinitions, `Workbaskets_${TaskanaDate.getDate()}.json`);
  }
}

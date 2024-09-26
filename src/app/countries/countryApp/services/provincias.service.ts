// provinces.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Community } from '../interfaces/population.interface';


@Injectable({
  providedIn: 'root'
})
export class ProvincesService {
  private apiUrl = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=georef-spain-provincia&rows=100';

  constructor(private http: HttpClient) {}

  getCommunitiesAndProvinces(): Observable<Community[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => this.transformData(data.records))
    );
  }

  private transformData(records: any[]): Community[] {
    const result: Community[] = [];
    records.forEach(record => {
      const communityName = record.fields.acom_name;
      const provinceName = record.fields.prov_name;
      const population = record.fields.population;

      let community = result.find(c => c.name === communityName);
      if (!community) {
        community = { name: communityName, provinces: [], showProvinces: false };
        result.push(community);
      }

      community.provinces.push({ name: provinceName, population });
    });

    return result;
  }
}

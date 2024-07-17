import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HpmsService {

  private baseUrl = 'http://localhost:8080/api'; // Base URL for the backend API

  constructor(private http: HttpClient) { }

  // Method to fetch the 'GROUP_LOV' list of values
  getGroupLOV(): Observable<any> {
    return this.http.get(`${this.baseUrl}/group/lov`);
  }

  // Method to fetch the 'EDIT_GROUP_LOV' list of values
  getEditGroupLOV(): Observable<any> {
    return this.http.get(`${this.baseUrl}/group/edit-lov`);
  }

  // Method to validate Group ID and Group Name
  validateGroupId(groupId: string, groupName: string, globalParameter: number, unitId: string): Observable<any> {
    const payload = { groupId, groupName, globalParameter, unitId };
    return this.http.post(`${this.baseUrl}/group/validate`, payload);
  }

  // Method to fetch the global parameter value
  getGlobalParameter(): Observable<any> {
    return this.http.get(`${this.baseUrl}/global-parameter`);
  }

  // Method to fetch the 'UNIT_LOV' list of values
  getUnitLOV(): Observable<any> {
    return this.http.get(`${this.baseUrl}/unit/lov`);
  }

  // Method to fetch the 'EDIT_UNIT_LOV' list of values
  getEditUnitLOV(): Observable<any> {
    return this.http.get(`${this.baseUrl}/unit/edit-lov`);
  }

  // Method to validate Unit ID and Unit Name against the database
  validateUnitIDInDB(unitId: string, unitName: string): Observable<any> {
    const payload = { unitId, unitName };
    return this.http.post(`${this.baseUrl}/unit/validate`, payload);
  }

  // Method to validate Line ID and Line Description against the database
  validateLineID(lineId: string, lineDescription: string, unitId: string, groupId: string): Observable<any> {
    const payload = { lineId, lineDescription, unitId, groupId };
    return this.http.post(`${this.baseUrl}/line/validate`, payload);
  }

  // Method to save part details
  savePart(part: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/part/save`, part);
  }

  // Method to update part details
  updatePart(part: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/part/update`, part);
  }
}

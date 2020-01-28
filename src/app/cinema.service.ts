import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  host:String="http://localhost:8080";

  constructor(private http:HttpClient ) { }

   getAllVilles(){
    return this.http.get(this.host+"/villes");
  }
  getCinemaByVille(ville){
    return this.http.get(ville._links.cinemas.href);
  }

  getSallesByCinema(cinema){
    return this.http.get(cinema._links.salles.href);
  }
  getProjections(salle){
    let url=salle._links.projections.href.replace("{?projection}","");
    return this.http.get(url+"?projection=projectionProj");
  }
  getPlacesByProjection(proj){
    let url=proj._links.tickets.href.replace("{?projection}","");
    return this.http.get(url+"?projection=ticketProj");
  }
  payerTickets(form){
    return this.http.post(this.host+"/payerTickets",form);
  }
}

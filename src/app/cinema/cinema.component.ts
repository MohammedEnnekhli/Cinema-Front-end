import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../cinema.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
 
   villes;
   cinemas;
   salles;
   currentVille;
   currentCinema;
   currentProjection;
  selectedTickets: any[];
  isAdded =false;
  constructor(public serviceCinema:CinemaService) { }

  ngOnInit() {

    this.getVilles();
  }

  getVilles(){
    this.serviceCinema.getAllVilles().subscribe((data:any)=>{
      this.villes=data._embedded.villes;
    },err=>{
      console.error(err);
    })
  }
  onGetCinema(ville){
    this.currentVille=ville;
    this.salles=undefined;
    this.serviceCinema.getCinemaByVille(ville).subscribe((data:any)=>{
    this.cinemas=data._embedded.cinemas;
    },err=>{
      console.error(err);
    })

  }

  onGetSalles(cinema){
    this.currentCinema=cinema;
    this.serviceCinema.getSallesByCinema(cinema).subscribe((data:any)=>{
    this.salles=data._embedded.salles;
    this.salles.forEach(salle => {
      this.serviceCinema.getProjections(salle).subscribe(data=>{
        salle.projections=data;
      })
    });
    },err=>{
      console.error(err);
    })

  }
  onGetTicketsPlaces(proj){
    this.currentProjection=proj;
    this.serviceCinema.getPlacesByProjection(proj).subscribe(data=>{
      this.currentProjection.tickets=data;
      this.selectedTickets=[];
    })
  }

  onSelectTicket(t){
    if(!t.selected){
      t.selected=true;
      this.selectedTickets.push(t);
    }
    else{
      t.selected=false;
      this.selectedTickets.splice(this.selectedTickets.indexOf(t),1);
    }
     
  }

  getTicketClass(t){
    let str="btn ticket ";
    if(t.reservee==true){
      str+="btn-danger";
    }
    else if(t.selected){
      str+="btn-warning";
    }
    else {
      str+="btn-success";
    }
    return str;
  }

  onPayTickets(form){
    let tickets=[];
    this.selectedTickets.forEach(t=>{
      tickets.push(t.id);
    });
    form.tickets=tickets;
    this.serviceCinema.payerTickets(form).subscribe(data=>{
      alert('Tickets sont réservés !');
      this.onGetTicketsPlaces(this.currentProjection);
    })

  }

}

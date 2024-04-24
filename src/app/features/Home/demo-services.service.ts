import { HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment.development';
import { Employer } from '../Employer/model/Employer.model';
@Injectable({
  providedIn: 'root',
})
export class SignalrHubService implements OnInit {
  private hubConnection: signalR.HubConnection | undefined;
 
  constructor() {
        this.hubConnection = new signalR.HubConnectionBuilder()
          .withUrl(`https://localhost:7003/hubs/updateEmployer`, {
          }) 
          .build();
      }
    
  
  ngOnInit(): void {}
  startConnection(): Observable<void > {
    return new Observable<void >((observer) => {
      if (this.hubConnection?.state == signalR.HubConnectionState.Connected) {
        console.log('already connected');
        observer.next();
        observer.complete();
      } else {
        this.hubConnection
          ?.start()
          .then(() => {
            console.log('Connection established with SignalR hub');
            observer.next();
            observer.complete();
          })
          .catch((error) => {
            console.error('Error connecting to SignalR hub:', error);
            observer.error(error);
          });
      }
    });
  }
 
  //on events like on click
  addMessageAndSendToReceiver(Employer:Employer)  {
      this.hubConnection
        ?.invoke('DemoMethod',Employer)
 
  }

  // on init when connection is started 
  receiveMessageFromSender(): Observable<Employer> {
    return new Observable<Employer>((observer) => {
      this.hubConnection?.on('UpdateEmployerMethod', (employer:Employer) => {
        console.log(employer)
        observer.next(employer);
       
      });
    });
  }
}
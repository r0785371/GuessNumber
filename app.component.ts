import { Component } from '@angular/core';
import { parse } from 'path';

@Component({
  selector: 'app-root',
  template: `<h2>Raad het getal tussen 1 en 1000</h2>
    <label> Uw gok : </label>
    <input type="number" [value]="gok" (input)="gok = $event.target.value" />
    <button (click)="controleGok()">Controleren</button>
    <button (click)="startSpel(); resetTimer()">Herbeginnen</button>
    <br />
    <div *ngIf="hulp < 0">U gok is te hoog.</div>
    <div *ngIf="hulp > 0">U gok is te laag.</div>
    <div *ngIf="hulp === 0">U heeft gewonnen!</div>
    <h2>Aantal keren gegokt: {{ aantalPogingen }}</h2>
    <h2>Timer: {{ timeStart }}</h2>
    <div *ngIf="gok == eersteGetal">U tijd is : {{ tijdOver }}</div>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'GuessNumber';

  hulp: number;
  aantalPogingen: number;
  eersteGetal: number;
  gok: number;

  interval;
  timeStart: number = 0;
  tijdOver: number;

  constructor() {
    this.startSpel();
    this.startTimer();
  }

  startSpel() {
    this.aantalPogingen = 0;
    //met deze regel kreeg ik geen boodschap wanneer getal juist was geraden
    //this.eersteGetal = Math.random() * 1000 + 1;
    //Math.floor = afronden van het getal naar de dichtste integer
    this.eersteGetal = Math.floor(Math.random() * 1000 + 1);
    this.gok = null;
    this.hulp = null;
    this.resetTimer();
  }
  controleGok() {
    this.hulp = this.eersteGetal - this.gok;
    this.aantalPogingen = this.aantalPogingen + 1;
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timeStart++;
    }, 1000);
  }

  pauzeTimer() {
    if ((this.gok = this.eersteGetal)) {
      clearInterval(this.interval);
      this.tijdOver = this.timeStart - this.interval;
    }
  }

  resetTimer() {
    this.timeStart = 0;
  }
}

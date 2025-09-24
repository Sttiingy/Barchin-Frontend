import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cofrade-detail',
  templateUrl: './cofrade-detail.page.html',
  styleUrls: ['./cofrade-detail.page.scss'],
})
export class CofradeDetailPage implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public firebase: FirebaseService
  ) { }

  public cofrade;
  public loading: boolean;
  public age: number;

  async ngOnInit() {
    try {
      this.loading = true;
      let id = await this.route.snapshot.paramMap.get('id')!;
      this.cofrade = await this.firebase.getCofradeById(id);
      if(!this.cofradeIsDead()) {
        this.age = this.calculateAge(this.cofrade.birthdate.toDate());
      }
      this.loading = false;
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }

  cofradeIsDead() {
    return this.cofrade?.bajaReason != null && this.cofrade?.bajaReason?.length > 0 && this.cofrade?.bajaReason === 'EXI';
  }

  calculateAge(birthdate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    
    // Check if the birthday has occurred yet this year
    const monthDiff = today.getMonth() - birthdate.getMonth();
    const dayDiff = today.getDate() - birthdate.getDate();
    
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }

}

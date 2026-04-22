import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-actions-popover',
  templateUrl: './actions-popover.component.html',
  styleUrls: ['./actions-popover.component.scss'],
})
export class ActionsPopoverComponent  implements OnInit {

  constructor(
    public popoverController: PopoverController
  ) { }

  ngOnInit() {}

  async editAdmin(field: string) {
    await this.popoverController.dismiss({
      field: field
    });
    console.log("EDIT ADMIN");
  }

}

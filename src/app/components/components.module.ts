import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { HeaderComponent } from "./header/header.component";
import { MenuComponent } from "./menu/menu.component";

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        HeaderComponent,
        MenuComponent
    ],
    exports: [
        HeaderComponent,
        MenuComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
    ]
})
export class ComponentsModule {
}
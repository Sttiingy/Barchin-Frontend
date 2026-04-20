import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { HeaderComponent } from "./header/header.component";
import { MenuComponent } from "./menu/menu.component";
import { SearchCofradeComponent } from "./search-cofrade/search-cofrade.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        HeaderComponent,
        MenuComponent,
        SearchCofradeComponent
    ],
    exports: [
        HeaderComponent,
        MenuComponent,
        SearchCofradeComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        FormsModule
    ]
})
export class ComponentsModule {
}
import { Injectable } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { FirebaseService } from "./firebase.service";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";


pdfMake.vfs = pdfFonts.vfs;


@Injectable({
    providedIn: 'root'
})

export class PdfService {

    constructor(
        public firebase: FirebaseService
    ) {
    }

    async generateAllCofradesPdf() {
        let res = await this.firebase.getActiveCofradesManSurname();
        const allCofrades = res.docs.map((doc: any) => {
            let cofrade: any = { id: doc.id, ...doc.data() };
            return cofrade;
        });
        const activeCofrades = allCofrades.filter((c: any) => 
            c.bajaReason === null || c.bajaReason === undefined
        );
        const hombres = activeCofrades.filter((c: any) => c.sex === "M");
        const mujeres = activeCofrades.filter((c: any) => c.sex === "W");
        const manNames = hombres.map((c: any) => c.surname + ", " + c.name);
        const womanNames = mujeres.map((c: any) => c.surname + ", " + c.name);
        const allNames = activeCofrades.map((c: any) => c.surname + ", " + c.name);
        const manDocDefinition = {
            content: [
                {
                text: "Listado de nombres de cofrades hombres" + " (" + manNames.length + ")",
                style: "header"
                },
                {
                ul: manNames
                }
            ],
            styles: {
                header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
                }
            }
        };
        const womanDocDefinition = {
            content: [
                {
                text: "Listado de nombres de cofrades mujeres" + " (" + womanNames.length + ")",
                style: "header"
                },
                {
                ul: womanNames
                }
            ],
            styles: {
                header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
                }
            }
        };
        const allDocDefinition = {
            content: [
                {
                text: "Listado de nombres de cofrades" + " (" + allNames.length + ")",
                style: "header"
                },
                {
                ul: allNames
                }
            ],
            styles: {
                header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
                }
            }
        };
        pdfMake.createPdf(manDocDefinition).download("cofrades_hombres.pdf");
        pdfMake.createPdf(womanDocDefinition).download("cofrades_mujeres.pdf");
        pdfMake.createPdf(allDocDefinition).download("cofrades.pdf");
    }
}
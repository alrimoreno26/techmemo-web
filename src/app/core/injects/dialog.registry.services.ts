import {Injectable} from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";

@Injectable({
    providedIn: 'root'
})
export class DialogRegistryService {
    private dialogRefs: DynamicDialogRef[] = [];

    constructor() {
    }

    addDialog(dialogRef: DynamicDialogRef): void {
        this.dialogRefs.push(dialogRef);
    }

    closeAllDialogs(): void {
        this.dialogRefs.forEach(dialogRef => dialogRef.close());
        this.dialogRefs = [];
    }

    removeDialog(dialogRef: DynamicDialogRef): void {
        const index = this.dialogRefs.indexOf(dialogRef);
        if (index !== -1) {
            this.dialogRefs.splice(index, 1);
        }
    }
}

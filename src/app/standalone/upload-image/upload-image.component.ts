import {Component, effect, Input} from "@angular/core";
import {CommonModule, NgForOf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {BadgeModule} from "primeng/badge";
import {FileUploadModule, UploadEvent} from "primeng/fileupload";
import {SharedModule} from "primeng/api";
import {BaseStoreServices} from "../data-table/class/base.store.services";
import {StoreComponentService} from "../data-table/store/store.component.service";
import {ImageModule} from "primeng/image";

@Component({
    standalone: true,
    selector: 'c-upload-image',
    imports: [CommonModule, BadgeModule, ButtonModule, FileUploadModule, SharedModule, ImageModule],
    templateUrl: './upload-image.component.html'
})
export class ProductsCards {

    /**
     * Service inject data from store
     */
    @Input() service: BaseStoreServices<any> | StoreComponentService<any>;


    uploadedfFiles: File[] = [];
    uploadedReceiptFiles: File[] = [];

    constructor() {
    }


    onSelectImageDocumentFiles(event: any): void {
        for (const file of event.currentFiles) {
            this.uploadedReceiptFiles.push(file);
            this.uploadedfFiles.push(file);
        }
        console.log(this.uploadedfFiles)
        console.log(this.uploadedReceiptFiles)
    }

    onRemoveImageDocumentFiles(elem: any): void {
        elem.clear();
        this.uploadedReceiptFiles = [];
        this.uploadedfFiles = [];
    }

    onUpload(event: UploadEvent) {
        console.log(event)
        console.log(this.uploadedfFiles)
        console.log(this.uploadedReceiptFiles)
    }

    async uploadDocumentFiles(): Promise<void> {
        let imageFile: File;
        if (this.uploadedReceiptFiles.length > 0) {
            imageFile = this.uploadedReceiptFiles[0];
        }
        // @ts-ignore
        this.service.uploadImageFiles([imageFile]);
    }
}

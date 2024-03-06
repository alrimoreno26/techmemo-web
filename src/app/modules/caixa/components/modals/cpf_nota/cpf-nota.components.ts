import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: 'm-cpf-nota',
    templateUrl: './cpf-nota.components.html'
})
export class CpfNotaComponents {

    @Input() cpfNota: boolean;
    @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>()

    close() {
        this.closed.emit(true);
    }
}

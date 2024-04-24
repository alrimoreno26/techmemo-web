import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LockComponent } from './lock.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LockComponent }
    ])],
    exports: [RouterModule]
})
export class LockRoutingModule { }

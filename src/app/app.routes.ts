import { Routes } from '@angular/router';
import { AddComponent } from './features/components/add/add.component';
import { MainComponent } from './features/components/main/main.component';
import { NotfoundComponent } from './features/notfound/notfound.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'adicionar', component: AddComponent },
    { path: '**', component: NotfoundComponent },
  ];

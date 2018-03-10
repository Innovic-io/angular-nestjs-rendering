import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about'
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    loadChildren: './contact/contact.module#ContactModule'
  }
];

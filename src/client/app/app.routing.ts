import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PetsComponent } from './pets/pets.component';

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
    component: ContactComponent
  },
  {
    path: 'pets',
    component: PetsComponent
  }
];

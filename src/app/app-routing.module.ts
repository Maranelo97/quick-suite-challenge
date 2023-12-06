import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MyWatchlistComponent } from './pages/my-watchlist/my-watchlist.component';

const routes: Routes = [
  {path:'', component:LandingPageComponent},
  {path:'movie/:title', component: MovieDetailsComponent, pathMatch:"full"},
  {path: 'myWatchlist', component:MyWatchlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

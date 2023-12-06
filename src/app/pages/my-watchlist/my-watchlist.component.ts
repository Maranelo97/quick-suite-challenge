import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/interfaces/Movie';
import { Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-my-watchlist',
  templateUrl: './my-watchlist.component.html',
  styleUrls: ['./my-watchlist.component.css']
})
export class MyWatchlistComponent implements OnInit, OnDestroy {
  private watchlistSubscription: Subscription | undefined;
  watchlist$: Observable<Movie[]> | undefined;
  watchlist: Movie[] = [];

  constructor(private movieService: MoviesService, private route: ActivatedRoute, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.watchlistSubscription = this.movieService.watchlist$.subscribe(watchlist => {
      this.watchlist = watchlist;
    });
  }


  ngOnDestroy(): void {
    if (this.watchlistSubscription) {
      this.watchlistSubscription.unsubscribe();
    }
  }

  isInWatchlist(movie: Movie): boolean {
    return this.watchlist.some(m => m.title === movie.title);
  }


  removeFromWatchlist(movie: Movie): void {
    this.movieService.removeFromWatchlist(movie);
    this.showSnackbar('Movie removed from watchlist successfully');
  }

  isWatchlistRoute(): boolean {
    return this.route.snapshot.url[0]?.path === 'myWatchlist';
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

}

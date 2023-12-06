import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/interfaces/Movie';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie | undefined;
  constructor(private route: ActivatedRoute, private movieService: MoviesService, private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    const title = this.route.snapshot.paramMap.get('title');

    if (title) {
      this.movieService.getMovieByTitle(title).subscribe(movie => {
        this.movie = movie;

        console.log(this.movie)
      });
    }
  }

  getDynamicTrailerLink(title: string): string {
    if (title === 'Tenet') {
      return 'https://www.youtube.com/embed/LdOM0x0XDMo';
    }
    return 'https://www.youtube.com/embed/defaultTrailerCode';
  }


  isInWatchlist(movie: Movie): boolean {
    return this.movieService.isInWatchlist(movie);
  }

  addToWatchlist(movie: Movie): void {
    this.movieService.addToWatchlist(movie);
    this.showSnackbar('Movie added to watchlist successfully');
  }


  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }


}

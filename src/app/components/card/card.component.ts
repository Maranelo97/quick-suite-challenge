import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/interfaces/Movie';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  movies: Movie[] | any;
  watchlist: Movie[] = [];
  searchTerm: string = '';
  sortOrder: string = 'title'; // Por defecto, inicia con orden por título
  reverseOrder: boolean = false;


  constructor(private movieService: MoviesService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.movies = this.movieService.getMovies();
    this.movieService.watchlist$.subscribe(watchlist => {
      this.watchlist = watchlist;
    });
  }



  filterMovies(): Movie[] {
    return this.movies.filter((movie: Movie) =>
      movie.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      movie.genre.some(genre => genre.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }



  addToWatchlist(movie: Movie): void {
    this.movieService.addToWatchlist(movie);
    this.showSnackbar('Movie added to watchlist successfully');
  }

  isInWatchlist(movie: Movie): boolean {
    return this.watchlist.some(m => m.title === movie.title);
  }


  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  sortMovies(orderBy: string): void {
    if (this.sortOrder === orderBy) {
      // Si el usuario presiona el mismo botón de ordenar, invierte el orden actual
      this.reverseOrder = !this.reverseOrder;
    } else {
      // Si el usuario presiona un nuevo botón de ordenar, restablece el orden a ascendente
      this.reverseOrder = false;
    }

    this.sortOrder = orderBy;
    this.movies = this.movies.slice(); // Para disparar el cambio en la vista

    // Luego, llama a la función que realiza la lógica de ordenación
    this.movies.sort((a, b) => {
      const aValue = a[this.sortOrder as keyof Movie]?.toLowerCase() || '';
      const bValue = b[this.sortOrder as keyof Movie]?.toLowerCase() || '';

      if (aValue < bValue) {
        return this.reverseOrder ? 1 : -1;
      } else if (aValue > bValue) {
        return this.reverseOrder ? -1 : 1;
      } else {
        return 0;
      }
    });
  }

}

import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/Movie';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private watchlistKey = 'watchlist';
  private watchlistSubject = new BehaviorSubject<Movie[]>([]);

  watchlist$ = this.watchlistSubject.asObservable();

  constructor() {
    const watchlist: Movie[] = JSON.parse(localStorage.getItem(this.watchlistKey) || '[]');
    this.watchlistSubject.next(watchlist);
  }

  addToWatchlist(movie: Movie): void {
    const watchlist: Movie[] = this.watchlistSubject.value;


    if (!watchlist.find(m => m.title === movie.title)) {
      const updatedWatchlist = [...watchlist, movie];
      localStorage.setItem(this.watchlistKey, JSON.stringify(updatedWatchlist));
      this.watchlistSubject.next(updatedWatchlist);
    }
  }

  isInWatchlist(movie: Movie): boolean {
    const watchlist: Movie[] = this.watchlistSubject.value;
    return watchlist.some(m => m.title === movie.title);
  }

  getWatchlist(): Movie[] {
    return this.watchlistSubject.value;
  }

  removeFromWatchlist(movie: Movie): void {
    const currentWatchlist = this.watchlistSubject.value;
    const updatedWatchlist = currentWatchlist.filter((m) => m !== movie);
    this.watchlistSubject.next(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  }

  getMovieByTitle(title: string): Observable<Movie | undefined> {
    // Supongamos que tu lista de películas está almacenada en la variable `movies`
    const movie = this.movies.find(movie => movie.title === title);
    return of(movie);
  }

  searchMovies(query: string): Observable<Movie[]> {
    // Filtra las películas por título o género
    const filteredMovies = this.movies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.some(genre => genre.toLowerCase().includes(query.toLowerCase()))
    );

    return of(filteredMovies);
  }


  private movies: Movie[] = [
    {
      title: 'Tenet',
      description: 'Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
      rating: 7.8,
      duration: '2h 30min',
      genre: ['Action', 'Sci-Fi'],
      releaseDate: '3 September 2020',
      trailerLink: 'https://www.youtube.com/embed/LdOM0x0XDMo',
      image: '../../assets/img/Tenet.png'
    },
    {
      title: 'Spider-Man: Into the Spider-Verse',
      description: 'Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.',
      rating: 8.4,
      duration: '1h 57min',
      genre: ['Action', 'Animation', 'Adventure'],
      releaseDate: '14 December 2018',
      trailerLink: 'https://www.youtube.com/embed/LdOM0x0XDMo',
      image: '../../assets/img/Spider Man.png'
    },
    {
      title: 'Knives Out',
      description: 'A detective investigates the death of a patriarch of an eccentric, combative family.',
      rating: 7.9,
      duration: '2h 10min',
      genre: ['Comedy', 'Crime', 'Drama'],
      releaseDate: '27 November 2019',
      trailerLink: 'https://www.youtube.com/embed/LdOM0x0XDMo',
      image: '../../assets/img/Knives Out.png'
    },
    {
      title: 'Guardians of the Galaxy',
      description: 'A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.',
      rating: 8.0,
      duration: '2h 1min',
      genre: ['Action', 'Adventure', 'Comedy'],
      releaseDate: '1 August 2014',
      trailerLink: 'https://www.youtube.com/embed/LdOM0x0XDMo',
      image: '../../assets/img/Guardians of The Galaxy.png'
    },
    {
      title: 'Avengers: Age of Ultron',
      description: 'When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it\'s up to Earth\'s mightiest heroes to stop the villainous Ultron from enacting his terrible plan.',
      rating: 7.3,
      duration: '2h 21min',
      genre: ['Action', 'Adventure', 'Sci-Fi'],
      releaseDate: '1 May 2015',
      trailerLink: 'https://www.youtube.com/embed/LdOM0x0XDMo',
      image: '../../assets/img/Avengers.png'
    }
  ]


  getMovies(): Movie[] {
    return this.movies;
  }

}

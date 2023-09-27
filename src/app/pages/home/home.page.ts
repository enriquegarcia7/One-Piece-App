import { Component, OnInit, inject } from '@angular/core';
import { Episode } from 'src/app/models/episode.model';
import { Season } from 'src/app/models/season.model';
import { LanguageService } from 'src/app/services/language.service';
import { OnePieceService } from 'src/app/services/one-piece.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  episode_number = '';
  seasons: Season[] = [];
  episodes: Episode[] = [];
  selectedSeason = '';

  loading: boolean = false;
  limitError: boolean = false;

  languageSvc = inject(LanguageService);
  onePieceSvc = inject(OnePieceService);
  selectedLanguage = '';

  ngOnInit() {
    this.selectedLanguage = localStorage.getItem('language') as string;
    this.getSeasons();
  }

  //-----cambiar el idioma----
  setLanguage() {
    this.languageSvc.setLanguage(this.selectedLanguage);
    this.getSeasons();
  }

  //----obtener temporadas-----
  getSeasons() {
    this.loading = true;

    this.onePieceSvc.getSeasons().subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log(res);
        this.seasons = res.seasons;
        this.selectedSeason = this.seasons[0].id;

        this.getEpisodesBySeason();
      },
      error: (err: any) => {
        this.loading = false;
        if(err.status === 429) this.limitError = true;
      }
    })
  }

  //----obtener episodios por temporada-----
  getEpisodesBySeason() {
    this.loading = true;
    this.onePieceSvc.getEpisodesBySeason(this.selectedSeason).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log(res);
        this.episodes = res.episodes;
      },
    });
  }

  //----obtener episodios por numero-----
  getEpisodesByNumber() {
    if (this.episode_number) {
      this.loading = true;
      this.onePieceSvc.getEpisodesByNumber(this.episode_number).subscribe({
        next: (res: any) => {
          this.loading = false;
          console.log(res);
          this.episodes = [res.episodes];
        },
        error: (err: any) => {
          this.loading = false;
          this.episodes = [];
        },
      });
    } else this.getEpisodesBySeason();
  }
}

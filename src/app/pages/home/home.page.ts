import { Component, OnInit, inject } from '@angular/core';
import { Season } from 'src/app/models/season.model';
import { LanguageService } from 'src/app/services/language.service';
import { OnePieceService } from 'src/app/services/one-piece.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  seasons: Season[] = [];
  selectedSeason = '';

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
    this.onePieceSvc.getSeasons().subscribe({
      next: (res: any) => {
        console.log(res);
        this.seasons = res.seasons;
        this.selectedSeason = this.seasons[0].id;
      }
    })
  }

    //----obtener episodios por temporada-----
    getEpisodesBySeason() {
      this.onePieceSvc.getSeasons().subscribe({
        next: (res: any) => {
          console.log(res);
          this.seasons = res.seasons;
          this.selectedSeason = this.seasons[0].id;
        }
      })
    }

}

import { Component, OnInit } from '@angular/core';
import { Community, PopulationData } from '../../countryApp/interfaces/population.interface';
import { forkJoin } from 'rxjs';
import { PopulationService } from '../../countryApp/services/population.service';
import { ProvincesService } from '../../countryApp/services/provincias.service';

@Component({
  selector: 'app-provinces',
  templateUrl: './population.component.html',
  styleUrls: ['./population.component.css'],
})
export class PopulationPageCopyComponent implements OnInit {
  populationData: PopulationData[] = [];
  communities: Community[] = [];
  combinedData: any[] = [];
  filteredData: any[] = [];
  public isLoading: boolean = false;
  searchTerm: string = '';

  toggledCommunities: { [key: string]: boolean } = {};

  constructor(
    private populationService: PopulationService,
    private provincesService: ProvincesService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      populationData: this.populationService.getPopulationData(),
      communities: this.provincesService.getCommunitiesAndProvinces(),
    }).subscribe(({ populationData, communities }) => {

      this.populationData = populationData.map(region => ({
        region: region.Nombre,
        year: 2022,
        population: region.Data.find(d => d.Anyo === 2021)?.Valor || 0
      }));

      this.communities = communities;

      this.combineData();

      this.isLoading = false;
    });
  }

  normalizeRegionName(region: string): string {
    return region
      .toLowerCase()
      .replace(/rioja, la/g, 'la rioja')
      .replace(/balears, illes/g, 'illes balears')
      .replace(/castilla - la mancha/g, 'castilla-la mancha')
      .replace(/madrid, comunidad de/g, 'comunidad de madrid')
      .replace(/navarra, comunidad foral de/g, 'comunidad foral de navarra')
      .replace(/murcia, región de/g, 'región de murcia')
      .replace(/principado de asturias/g, 'principado de asturias')
      .replace(/canarias/g, 'canarias')
      .replace(/castilla y león/g, 'castilla y león')
      .replace(/valencia/g, 'comunitat valenciana')
      .replace(/país vasco/g, 'país vasco')
      .replace(/,/g, '')
      .trim();
  }

  combineData(): void {

     console.log('Combined Data:', this.combinedData);
  console.log('Search Term in Filter:', this.searchTerm);
    if (this.populationData.length && this.communities.length) {
      this.combinedData = this.communities
        .map(community => {
          const normalizedCommunityName = this.normalizeRegionName(community.name);

          const filteredPopulation = this.populationData
            .filter(p => this.normalizeRegionName(p.region).includes(normalizedCommunityName))
            .map(p => p.population);

          const maxPopulation = filteredPopulation.length
            ? Math.max(...filteredPopulation.filter(p => p > 0))
            : 0;

          const isExcluded = [
            'ciudad autónoma de ceuta',
            'principado de asturias',
            'ciudad autónoma de melilla'
          ].includes(normalizedCommunityName);

          return !isExcluded && maxPopulation > 0
            ? {
                ...community,
                population: maxPopulation,
                provinces: community.provinces.map(province => {
                  const normalizedProvinceName = this.normalizeRegionName(province.name);

                  const provincePopulation = this.populationData
                    .filter(p => this.normalizeRegionName(p.region).includes(normalizedProvinceName))
                    .map(p => p.population);

                  const maxProvincePopulation = provincePopulation.length
                    ? Math.max(...provincePopulation.filter(p => p > 0))
                    : 0;

                  return {
                    ...province,
                    population: maxProvincePopulation
                  };
                })
              }
            : null;
        })
        .filter(community => community !== null);

      this.filteredData = this.combinedData;
    }
  }

  handleSearch(term: string): void {
    this.searchTerm = term;
     console.log('Search Term:', this.searchTerm);
    this.filterData();
  }

  handleDebounce(term: string): void {
    this.searchTerm = term;
    this.filterData();
  }

  filterData(): void {
    if (!this.searchTerm.trim()) {
      this.filteredData = [...this.combinedData];
    } else {
      const lowerSearchTerm = this.searchTerm.toLowerCase();

      this.filteredData = this.combinedData.filter(community =>
        this.normalizeRegionName(community.name).includes(lowerSearchTerm) ||
        community.provinces.some((province: { name: string; }) =>
          this.normalizeRegionName(province.name).includes(lowerSearchTerm)
        )
      );
    }
  }

  toggleProvinces(communityName: string): void {
    this.toggledCommunities[communityName] = !this.toggledCommunities[communityName];
  }
}

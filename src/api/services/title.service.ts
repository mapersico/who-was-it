import { BaseService } from '../base/base.service';
import { MediaItem, MediaType, ResponseMultipleResults, TmdbSearchResult } from '../models/api.model';

export class TitleService extends BaseService {
  constructor() {
    super();
  }

  private deduplicateByOriginalName(
    results: TmdbSearchResult[]
  ): TmdbSearchResult[] {
    const map = new Map<string, any>();

    for (const item of results) {
      const existing = map.get(item.name);
      if (!existing || item.popularity > existing.popularity) {
        map.set(item.name, item);
      }
    }

    return Array.from(map.values());
    // return [
    //   {
    //     backdrop_path: '/9YteO4VWteiPmEbWYJRAeBTQZPD.jpg',
    //     id: 1100,
    //     name: 'How I Met Your Mother',
    //     original_name: 'How I Met Your Mother',
    //     overview:
    //       'A father recounts to his children - through a series of flashbacks - the journey he and his four best friends took leading up to him meeting their mother.',
    //     poster_path: '/b34jPzmB0wZy7EjUZoleXOl2RRI.jpg',
    //     media_type: 'tv',
    //     adult: false,
    //     original_language: 'en',
    //     genre_ids: [35],
    //     popularity: 121.4212,
    //     first_air_date: '2005-09-19',
    //     vote_average: 8.146,
    //     vote_count: 5218,
    //     origin_country: ['US'],
    //   },
    //   {
    //     backdrop_path: '/yCkgkwI20f4P5HJ0tJf4sjfw07q.jpg',
    //     id: 1749,
    //     name: "How It's Made",
    //     original_name: "How It's Made",
    //     overview:
    //       "Have you ever wondered how the products you use every day are made? How It's Made leads you through the process of how everyday products, such as apple juice, skateboards, engines, contact lenses, and many more objects are manufactured.",
    //     poster_path: '/jO3DKZyiEWQsEE6ji7IXwobDnl8.jpg',
    //     media_type: 'tv',
    //     adult: false,
    //     original_language: 'en',
    //     genre_ids: [99],
    //     popularity: 69.0762,
    //     first_air_date: '2001-01-06',
    //     vote_average: 7.628,
    //     vote_count: 152,
    //     origin_country: ['CA', 'GB'],
    //   },
    //   {
    //     backdrop_path: '/ltrNRvaiZ5mMmJMFtwwTBudkcyQ.jpg',
    //     id: 75299,
    //     name: 'How It Really Happened',
    //     original_name: 'How It Really Happened',
    //     overview:
    //       'Jesse L. Martin takes an in-depth look at some of the most notorious crimes, mysteries, trials and celebrity tragedies of our time.',
    //     poster_path: '/luQyJtvFFyEdoKrPu3dmiXTvY3G.jpg',
    //     media_type: 'tv',
    //     adult: false,
    //     original_language: 'en',
    //     genre_ids: [80, 9648, 99],
    //     popularity: 22.9264,
    //     first_air_date: '2017-01-27',
    //     vote_average: 7.2,
    //     vote_count: 5,
    //     origin_country: ['US'],
    //   },
    //   {
    //     backdrop_path: '/gFBHzqK4zRT0lFZkvPtLYSGJOWU.jpg',
    //     id: 1292,
    //     name: 'How Do They Do It?',
    //     original_name: 'How Do They Do It?',
    //     overview:
    //       "An insider's look at the engineering and scientific miracles behind the things that form the modern world.",
    //     poster_path: '/kH4NDOUagtj0J5hau95QGBcy4FQ.jpg',
    //     media_type: 'tv',
    //     adult: false,
    //     original_language: 'en',
    //     genre_ids: [99],
    //     popularity: 24.0967,
    //     first_air_date: '2006-05-06',
    //     vote_average: 7.5,
    //     vote_count: 36,
    //     origin_country: ['CA', 'US', 'GB'],
    //   },
    //   {
    //     backdrop_path: '/6lkiHoQRA2onzqHnHWuA9bTykVG.jpg',
    //     id: 13723,
    //     name: 'How Clean Is Your House?',
    //     original_name: 'How Clean Is Your House?',
    //     overview:
    //       'How Clean Is Your House? is a British entertainment/lifestyle television programme in which expert cleaners Kim Woodburn and Aggie MacKenzie visit filthy homes and then clean them. The thirty-minute show is produced by Talkback Thames, the UK production arm of FremantleMedia, and airs on Channel 4 and many of its subsidiary channels. It was first broadcast in 2003 and was an immediate ratings success.',
    //     poster_path: '/4ei9i88jNqZPWngvgO6bsssa2as.jpg',
    //     media_type: 'tv',
    //     adult: false,
    //     original_language: 'en',
    //     genre_ids: [10764],
    //     popularity: 22.2704,
    //     first_air_date: '2003-05-21',
    //     vote_average: 5.3,
    //     vote_count: 3,
    //     origin_country: ['GB'],
    //   },
    //   {
    //     backdrop_path: '/wAxWHWydpB3c4w5jWc5bXUUqfp9.jpg',
    //     id: 65039,
    //     name: 'How We Invented The World',
    //     original_name: 'How We Invented The World',
    //     overview:
    //       'How We Invented the World is the ultimate action-packed, hi-energy, landmark series that examines the four inventions that define the modern world - mobiles, cars, planes and skyscrapers -celebrating the people and connections that made them possible. Each playing a crucial role in where we are now in the 21st Century - able to travel the globe, to talk to one another at any time at the push of a button, to live in huge cities, to commute, to capture the world we live in, making the fantasies we create come to life. This four part series lifts the lid on how these iconic inventions came to be. Showcasing the people who have shaped our lives in ways that they could have never imagined or anticipated, this series reveals stories of human ingenuity, extraordinary connections, unprecedented experimentation and jaw dropping accidents that created the world as we know it.',
    //     poster_path: '/zK2SEEVxvOV422LEBYDge1WmGyW.jpg',
    //     media_type: 'tv',
    //     adult: false,
    //     original_language: 'en',
    //     genre_ids: [99],
    //     popularity: 2.1699,
    //     first_air_date: '2012-11-05',
    //     vote_average: 0,
    //     vote_count: 0,
    //     origin_country: ['GB'],
    //   },
    //   {
    //     backdrop_path: '/ktm3dAllbVXRAquSgLF13iEulZi.jpg',
    //     id: 275640,
    //     name: 'Immigration: How British Politics Failed',
    //     original_name: 'Immigration: How British Politics Failed',
    //     overview:
    //       'Uncovering who and what made immigration unignorable and brought politics to crisis. Blair, Cameron, Farage, migrant activists and government and media insiders go on record.',
    //     poster_path: '/s87dJ8azfjZVTTAn2zKeQwHARp8.jpg',
    //     media_type: 'tv',
    //     adult: false,
    //     original_language: 'en',
    //     genre_ids: [99],
    //     popularity: 0.0768,
    //     first_air_date: '2024-11-11',
    //     vote_average: 10,
    //     vote_count: 1,
    //     origin_country: ['GB'],
    //   },
    // ];
  }

  private mapToMediaItemAdapter(item: TmdbSearchResult): MediaItem {
    return {
      id: item.id,
      name: item.name,
      releaseDate: item.first_air_date ?? item.release_date ?? 'N/A',
      posterUrl: `${this._omdbPosterBaseUrl}${item.poster_path}`,
      mediaType: MediaType[item.media_type],
    };
  }

  async getTvAndMoviesByQuery(query: string): Promise<MediaItem[]> {
    const result = await fetch(this.omdbEndpoints.MovieByQuery(query), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!result.ok) {
      throw new Error(`Error fetching data: ${result.statusText}`);
    }
    const data: ResponseMultipleResults = await result.json();
    const resultByPopularity: TmdbSearchResult[] =
      this.deduplicateByOriginalName(data.results);

    return resultByPopularity
      .filter((item) => item.original_language === 'en')
      .slice(0, 10)
      .map((item) => this.mapToMediaItemAdapter(item));
  }
}

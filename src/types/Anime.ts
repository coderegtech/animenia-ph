export interface Anime {
    episodeId: string,
    animeTitle: string,
    episodeNum: string,
    subOrDub: string,
    animeImg: string,
    episodeUrl: string
}


export interface TopAiring {
    animeId: string,
		animeTitle: string,
		animeImg: string,
		latestEp: string,
		animeUrl: string,
		genres:  string,
}

export interface Popular {
    animeId: string,
    animeTitle: string,
    animeImg: string,
    releasedDate: string,
    animeUrl: string
}


export interface Movies {
    animeId: string,
    animeTitle: string,
    animeImg: string,
    releasedDate: string,
    animeUrl: string
}


export interface Search {
    animeId: string,
    animeTitle: string,
    animeUrl: string,
    animeImg: string,
   status: string
}


export interface Genres {
    animeId: string,
    animeTitle: string,
    animeImg: string,
    releasedDate: string,
    animeUrl: string
}
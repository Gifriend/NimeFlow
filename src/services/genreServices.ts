import axios from "axios";

export type Genre = {
  title: string;
  genreId: string;
  href: string;
  otakudesuUrl: string;
};

export class GenreService {
  private baseUrl: string;
  private token: string | undefined;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL;
    this.token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  }

  public async fetchGenres(): Promise<Genre[]> {
    try {
      const res = await axios.get(`${this.baseUrl}/otakudesu/genres`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      const genreList = res.data?.data?.genreList;
      if (Array.isArray(genreList)) {
        return genreList;
      } else {
        console.warn("Genres is NOT an array!", typeof genreList);
        return [];
      }
    } catch (err) {
      console.error("Error fetching genres:", err);
      return [];
    }
  }
}

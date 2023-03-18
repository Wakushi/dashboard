export interface OpenWeatherMapResponse {
    weather: Array<{ icon: string }>;
    main: { temp: number };
    name: string;
}
  
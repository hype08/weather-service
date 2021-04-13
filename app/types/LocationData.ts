export interface LocationData {
  distance: number
  title: string
  location_type: LocationType
  woeid: number
  latt_long: string
}

export enum LocationType {
  City = 'City',
}

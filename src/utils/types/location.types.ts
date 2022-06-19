
export interface ILocationStateBackground{
  hash: string;
key: string;
pathname: string | undefined;
search: string;
}

export interface ILocationState{
  background: ILocationStateBackground | undefined;
  from?: string | undefined | any;
  pathname?: string;
}

export interface ILocation{
  pathname: string | undefined;
  search: string;
  hash: string;
  state: ILocationState | undefined;
  key?: string;
}


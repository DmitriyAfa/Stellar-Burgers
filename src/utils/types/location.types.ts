
export interface ILocationStateBackground{
  hash: string;
key: string;
pathname: string;
search: string;
}

export interface ILocationState{
  background: ILocationStateBackground | undefined;
  from?: string | undefined ;
}

export interface ILocation{
  pathname: string;
  search: string;
  hash: string;
  state: undefined | ILocationState;
  key?: string;
}


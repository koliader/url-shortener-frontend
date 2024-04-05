export interface IDecodedToken {
  username: string;
  issuedAt: number;
  expiredAt: number;
}

export interface ITokenDto {
  token: string;
  decodedToken: IDecodedToken;
}

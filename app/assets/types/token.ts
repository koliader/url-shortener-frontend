export interface IDecodedToken {
  email: string;
  issuedAt: number;
  expiredAt: number;
}

export interface ITokenDto {
  token: string;
  decodedToken: IDecodedToken;
}

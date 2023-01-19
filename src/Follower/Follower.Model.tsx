export class GithubFollowerResponse {
  avatar_url: string;
  login: string;

  constructor(data: Partial<GithubFollowerResponse>) {
    Object.assign(this, data);
  }

  public static fromJSON = (jsonObject: object): GithubFollowerResponse => {
    return new GithubFollowerResponse(jsonObject);
  };
}

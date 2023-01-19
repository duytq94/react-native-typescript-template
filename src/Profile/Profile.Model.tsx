export class GithubProfileResponse {
  avatar_url: string;
  login: string;
  name: string;
  location: string;

  constructor(data: Partial<GithubProfileResponse>) {
    Object.assign(this, data);
  }

  public static fromJSON = (jsonObject: object): GithubProfileResponse => {
    return new GithubProfileResponse(jsonObject);
  };
}

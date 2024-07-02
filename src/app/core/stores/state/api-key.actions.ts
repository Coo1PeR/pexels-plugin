const ACTION_SCOPE = '[ApiKey]';

export namespace ApiKeyActions {
  export class Set {
    static readonly type = `${ACTION_SCOPE} Set`;
    constructor(public payload: string) {}
  }

  export class Get {
    static readonly type = `${ACTION_SCOPE} Get`;
  }
}

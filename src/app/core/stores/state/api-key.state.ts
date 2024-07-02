import { Injectable } from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import { ApiKeyActions } from './api-key.actions';

export class ApiKeyStateModel {
  public apiKey!: string;
}

@State<ApiKeyStateModel>({
  name: 'apiKey',
  defaults: {
    apiKey: '',
  }
})

@Injectable()
export class ApiKeyState {
  @Selector()
  static getApiKey(state: ApiKeyStateModel): string {
    return state.apiKey;
  }

  @Action(ApiKeyActions.Set)
  setApiKey(ctx: StateContext<ApiKeyStateModel>, action: ApiKeyActions.Set) {
    ctx.patchState({
      apiKey: action.payload
    });
  }

  @Action(ApiKeyActions.Get)
  getApiKey(ctx: StateContext<ApiKeyStateModel>) {
    const state = ctx.getState();
    return state.apiKey;
  }
}

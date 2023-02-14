import { Action } from 'redux';
import { Observable } from 'rxjs';

export type Epic<TAction extends Action> = (action$: Observable<TAction>) => Observable<Action>;

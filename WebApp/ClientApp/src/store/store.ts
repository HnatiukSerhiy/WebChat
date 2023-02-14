import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import epic from './rootEpic';
import reducer from './rootReducer';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
    reducer,
    middleware: [
        epicMiddleware,
    ],
});

epicMiddleware.run(epic);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

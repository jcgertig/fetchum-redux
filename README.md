# Fetchum Redux
 Redux Actions for [Fetchum](https://www.npmjs.com/package/fetchum)

 [![npm version](https://badge.fury.io/js/fetchum-redux.svg)](https://badge.fury.io/js/fetchum-redux)

## Install

```bash
npm i -S fetchum-redux
```

### Api - `generateRequest`

`generateRequest` returns a fetchum `generateRequest` wrapped in a thunk action.

When then returned function is called it will trigger 2 actions.
First `'NEW_FETCH_REQUEST'` then `'FETCH_REQUEST_SUCCESS'` if successful and `'FETCH_REQUEST_FAILURE'` if not.

__Examples__

This example assumes [redux-thunk](https://www.npmjs.com/package/redux-thunk) is being used
```javascript
import { generateRequest } from 'fetchum-redux';

const getRandomUserReq = generateRequest({
  method: 'GET',
  external: true,
  route: 'http://uifaces.com/api/v1/random',
});

const getRandomUser = () => {
  dispatch(getRandomUserReq())
    .then(res => console.log(res.data))
    .catch(res => console.error(res));
};
```

If you dont want to use redux-thunk then use like so:
```javascript
import { generateRequest } from 'fetchum-redux';

const getRandomUserReq = generateRequest({
  method: 'GET',
  external: true,
  route: 'http://uifaces.com/api/v1/random',
});

const getRandomUser = () => {
  getRandomUserReq()(dispatch)
    .then(res => console.log(res.data))
    .catch(res => console.error(res));
};
```

### Api - `generateCRUDRequests`

Return exactly like `generateCRUDRequests` from Fetchum but uses fetchum-redux `generateRequest` and passes a modify type param.

- `fetchAll` adds `FETCH_ALL` to the type eg: `'NEW_FETCH_ALL_FETCH_REQUEST'` `'FETCH_ALL_FETCH_REQUEST_SUCCESS'`
- `fetchOne` adds `FETCH_ONE`
- `create` adds `CREATE`
- `update` adds `UPDATE`
- `delete` adds `DELETE`

### Api - basic Calls

All of fetchum's basic calls work as well like so:

```javascript
import { apiGet } from 'fetchum-redux';

const getUsersDirect = () => {
  apiGet('/v1/users')(dispatch)
    .then((res) => { console.log('my users', res.data); })
    .catch((res, err) => { console.warn(res); });
};

const getUsersDirectWithThunk = () => {
  dispatch(apiGet('/v1/users'))
    .then((res) => { console.log('my users', res.data); })
    .catch((res, err) => { console.warn(res); });
};
```

## Modifying action types

Each method also takes an extra parameter at the end to use to modify the action type names.
The name parameter replaces the word `'FETCH'` in the action type like so:

`generateRequest` looks like `generateRequest({}, 'TEST')` and the action types will be:
First `'NEW_TEST_REQUEST'` then `'TEST_REQUEST_SUCCESS'` if successful and `'TEST_REQUEST_FAILURE'` if not.

`generateCRUDRequests` keeps its individual additions noted above but still overrides the word `'FETCH'`.
For example `generateCRUDRequests('/users', 'id', true, 'USERS')` for a `fetchOne` would trigger
first `'NEW_FETCH_ONE_USERS_REQUEST'` then `'FETCH_ONE_USERS_REQUEST_SUCCESS'` if successful and `'FETCH_ONE_USERS_REQUEST_FAILURE'` if not.

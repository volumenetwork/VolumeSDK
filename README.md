# VolumeSDK

Collection of Tools to deals with the Volume API 

## How to use

`yarn add volumesdk`

```js
import VolumeSDK from 'volumesdk';

const url = 'https://myapi.volumenetwork.com';
const email = 'bilbo.baggins@theshire.com';
const password = 'myPrecious';

const vsdk = new VolumeSDK({
  url,
});

vsdk.authenticate(email, password)
  .then(() => {
    vsdk.fetchChannels()
      .then((result) => {
        console.log(result);
      });
  });

```

## Methods

### Authenticate

```js
import VolumeSDK from 'volumesdk';

const url = 'https://myapi.volumenetwork.com';
const email = 'bilbo.baggins@theshire.com';
const password = 'myPrecious';

const vsdk = new VolumeSDK({
  url,
});

vsdk.authenticate(email, password)
  .then((userinfo) => {
    console.log(userinfo);
  });

```

### Check is session is active (i.e. not expired)

```js
import VolumeSDK from 'volumesdk';

const url = 'https://myapi.volumenetwork.com';
const email = 'bilbo.baggins@theshire.com';
const password = 'myPrecious';

const vsdk = new VolumeSDK({
  url,
});

vsdk.sessionIsActive()
  .then((result) => {
    console.log(result); // true / false
  });
```

### Get Channels

N.B. Must have authenticated first.

```js
vsdk.fetchChannels()
  .then((channels) => {
    console.log(channels);
  });

```

### Channels

#### Get All

```js

import Channel from 'volumesdk/channel';

const url = 'https://myapi.volumenetwork.com';
const email = 'bilbo.baggins@theshire.com';
const password = 'myPrecious';

const c = new Channel({
  url,
});


c.authenticate(email, password)
  .then(() => c.fetchAll()
    .then((result) => {
      console.log(result);
    });

```

### Storyboards

#### Get All

```js

import Storyboard from 'volumesdk/storyboard';

const url = 'https://myapi.volumenetwork.com';
const email = 'bilbo.baggins@theshire.com';
const password = 'myPrecious';

const s = new Storyboard({
  url,
});


s.authenticate(email, password)
  .then(() => s.fetchAll()
    .then((result) => {
      console.log(result);
    });

```

#### Get By Id

```js

import Storyboard from 'volumesdk/storyboard';

const url = 'https://myapi.volumenetwork.com';
const email = 'bilbo.baggins@theshire.com';
const password = 'myPrecious';
const id = 1;

const s = new Storyboard({
  url,
});


s.authenticate(email, password)
  .then(() => s.fetch(id)
    .then((result) => {
      console.log(result);
    });

```

#### Save

```js
import Storyboard from 'volumesdk/storyboard';

const url = 'https://myapi.volumenetwork.com';
const email = 'bilbo.baggins@theshire.com';
const password = 'myPrecious';
const id = 1;

const s = new Storyboard({
  url,
});


s.authenticate(email, password)
  .then(() => s.save({
      id: 3, // if no id is set, will create new storyboard
      storyboard: {
        foo: 'bar',
        items: [{}, {}],
      },
    })
    .then((result) => {
      console.log(result);
    });

```
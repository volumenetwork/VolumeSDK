# VolumeSDK

Collection of Tools to deals with the Volume API 

## How to use

`yarn add volumesdk`

```$xslt
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

```$xslt
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

### Get Channels

N.B. Must have authenticated first.

```$xslt
vsdk.fetchChannels()
  .then((channels) => {
    console.log(channels);
  });

```

### Channels

#### Get All

```$xslt

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

```$xslt

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

```$xslt

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

```$xslt
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
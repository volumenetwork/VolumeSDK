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
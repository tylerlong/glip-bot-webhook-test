import RingCentral from '@rc-ex/core';

const rc = new RingCentral({
  server: 'https://platform.devtest.ringcentral.com',
});

rc.token = {access_token: process.env.RINGCENTRAL_TOKEN};

(async () => {
  const subInfo = await rc
    .restapi()
    .subscription()
    .post({
      eventFilters: ['/restapi/v1.0/glip/posts'],
      deliveryMode: {
        address: process.env.WEBHOOK_ADDRESS,
        transportType: 'WebHook',
      },
    });
  console.log(JSON.stringify(subInfo, null, 2));

  const subList = await rc.restapi().subscription().list();
  console.log(JSON.stringify(subList, null, 2));
})();

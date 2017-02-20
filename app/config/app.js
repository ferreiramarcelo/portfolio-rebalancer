const host = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || '7500';
const trackingID = process.env.TRACKING_ID;
const isDev = () => __DEVCLIENT__ || __DEVSERVER__;

export { host, port, trackingID, isDev };

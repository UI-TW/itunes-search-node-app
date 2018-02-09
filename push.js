const webpush = require('web-push');
const urlsafeBase64 = require('urlsafe-base64');
let vapidKeys;
let subscriptions = [];

exports.init = () => {
    vapidKeys = webpush.generateVAPIDKeys();    
};

exports.getDecodedPublicVapidKey = () => {
    return urlsafeBase64.decode(vapidKeys.publicKey);
};

exports.sendNotification = (message) => {
    const options = {
        TTL: 24 * 60 * 60,
        vapidDetails: {
            subject: 'mailto:tw@localhost',
            publicKey: vapidKeys.publicKey,
            privateKey: vapidKeys.privateKey
        }
    };
    subscriptions.forEach((subscription) => {
        webpush.sendNotification(
            subscription,
            message,
            options
        );
    });
};

exports.addSubscription = (subscription) => {
    subscriptions.push(subscription);
};
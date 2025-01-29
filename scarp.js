const { InstagramScraper } = require('@aduptive/instagram-scraper');

const scraper = new InstagramScraper();
scraper.getFollowers('botwot.io').then(result => {
    if (result.success) {
        console.log(result.followers);
    } else {
        console.error('Error fetching followers:', result.error);
    }
}).catch(err => {
    console.error('Error:', err);
});

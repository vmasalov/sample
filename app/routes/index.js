var express = require('express'),
    fs = require('fs'),
    router = express.Router();

router.get('/', function (req, res, next) {
    var i18n_lang = "ru",
        i18n_file;

    
    if (req.cookies && "lang" in req.cookies) {
        i18n_lang = req.cookies.lang;
    }

    if (req.query && "lang" in req.query) {
        i18n_lang = req.query.lang;
    }

    // remove undesired symbols and make sure there are only 2 symbols;
    i18n_lang = i18n_lang.replace(/[^a-z]/g, '').substr(0, 2);
    i18n_file = 'i18n/' + i18n_lang + '.json';
    if (!fs.existsSync(i18n_file)) {
        console.log('Missing locale lang = ' + i18n_lang);

        // fallback to default locale;
        i18n_lang = 'ru';
        i18n_file = 'i18n/ru.json';
    }

    fs.readFile(i18n_file, 'utf-8', function (err, data) {
        if (err) {
            throw err;
        }

        res.render('index',
            {
                data: {
                    i18n_lang: i18n_lang,
                    i18n_data: JSON.parse(data),
                    location: 'LOCATION_SEARCH'
                }
            });
        content = data;
    });
});

module.exports = router;
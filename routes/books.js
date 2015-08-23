var express = require('express');
var router = express.Router();

/* GET book. */
router.get('/:title', function(req, res) {
    var options = {
        root: './books/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var fileName = req.params.title + ".yaml";
    res.sendFile(fileName, options, function (err) {
        if (err) {
            if (err.code === "ECONNABORT" && res.statusCode == 304) {
                // No problem, 304 means client cache hit, so no data sent.
                console.log('304 cache hit for ' + fileName);
                return;
            }
            console.error("SendFile error:", err, " (status: " + err.status + ")");
            if (err.status) {
                res.status(err.status).end();
            }
        }
        else {
            console.log('Sent:', fileName);
        }
    });
/*    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log('damn');
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('Sent:', fileName);
        }
    });*/
});

module.exports = router;
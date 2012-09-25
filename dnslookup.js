var dns = require('native-dns');

module.exports = function (req, res, next) {
    var queryReq = req.body,
        querydata = {},
        question = dns.Question({
            name: queryReq.query.toString(),
            type: queryReq.type.toString() || 'A'
        }),
        start = Date.now(),
        dnsReq = dns.Request({
            question: question,
            server: { address: queryReq.server.toString() || '8.8.8.8' },
            cache: false,
            timeout: 1000
        });

  dnsReq.on('timeout', function () {
      querydata.error = 'Timeout';
  });

  dnsReq.on('message', function (err, answer) {
      if (answer.answer === '') {
          querydata.address = 'No records found!';
      } else {
          querydata.address = answer.answer;
      }
  });

  dnsReq.on('end', function () {
      var delta = ((Date.now()) - start),
          answer = {};
      if (querydata.error) {
          answer = querydata.error;
      } else { 
          answer = querydata.address;
      }
      req.data = JSON.stringify({ answer: answer, time: delta });
      next();
  });

  dnsReq.send();

};

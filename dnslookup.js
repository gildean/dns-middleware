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
            timeout: 2000
        });

  dnsReq.on('timeout', function () {
      querydata.error = [{
        error: "Timeout"
      }];
  });

  dnsReq.on('message', function (err, answer) {
      if (!err && answer.answer.length > 0) {
          querydata.address = answer.answer;
      } else if (answer.answer.length === 0) {
          querydata.error = [{
            error: "No records found"
          }];
      } else {
          querydata.error = err;
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
      console.log(answer);
      req.data = JSON.stringify({ answer: answer, time: delta });
      next();
  });

  dnsReq.send();

};

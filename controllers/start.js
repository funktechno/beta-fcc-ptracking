'use strict';

const logger = require('../utils/logger');

const start = {
  index(request, response) {
    logger.info('start rendering');
    const viewData = {
      title: 'Beta FCC Tracker',
    };
    response.render('start', viewData);
  },
};

module.exports = start;

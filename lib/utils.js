exports.sleep = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

exports.uuid = function() {
  let uuid = '';
  const cs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i++) {
    uuid += cs.charAt(Math.floor(Math.random() * cs.length));
  }
  return uuid;
};

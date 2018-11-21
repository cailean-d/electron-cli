module.exports = function (style) {
  const res = style.match(/(^[A-z]+)\s?/);
  return res[1].toLowerCase();
}
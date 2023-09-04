function generateSlug(title) {
  const slug = title.toLowerCase().split(" ").join("-");
  return slug;
}

module.exports = generateSlug;
// console.log(generateSlug("aku Adalah anak gembala selalu riang serta gembira"));

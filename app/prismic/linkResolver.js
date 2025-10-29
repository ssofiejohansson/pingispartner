export default (doc) => {
  // Do not modify this file unless you've added languages.

  
  if (doc.isBroken) {
    return "/not-found";
  }

  if (doc.url) {
    if (doc.lang === "en-gb") {
      return doc.url.replace("/en-gb", "/en");
    } else if (doc.lang === "de-de") {
      return doc.url.replace("/de-de", "/de");
    } else {
      return doc.url.replace("/sv-se", "");
    }
  }

  return null;
};

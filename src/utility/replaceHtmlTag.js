function replaceHtmlTag(str) {
  return str.replace(/<[^>]*>/g, "");
}

export default replaceHtmlTag;

exports.buildObject = (base, text) => {
  const object = { base, text };
  const language = text
    .split('\n')
    .filter(sentence => sentence);
  object.title = language[0];
  object.subtitle = language[1];
  object.date = '2004-2005';
  object.natural_class = base.split('/')[0];
  object.source = 'http://mlg.ucd.ie/datasets/bbc.html';
  const body = language.slice(2);
  object.body = body.join(' ');
  object.body_paragraphs = body.length;
  object.body_char_count = body.join('').split('').length;
  return object;
};

/*
{
  title
  subtitle
  date: 2004-2005
  natural_class: (business, entertainment, politics, sport, tech)
  source: http://mlg.ucd.ie/datasets/bbc.html
  body
  body_paragraphs
  body_char_count
}
*/
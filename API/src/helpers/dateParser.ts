function dateParser(date: string): Date {
  const dateSplitted = date.split(/[\/-]/);
  const year = dateSplitted[0];
  const month = dateSplitted[1];
  const day = dateSplitted[2];
  return new Date(Number(year), Number(month) - 1, Number(day));
}
  

export default dateParser;

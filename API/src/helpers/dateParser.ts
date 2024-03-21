function dateParser(date: string): Date {
    const dateSplitted = date.split(/[\/-]/);
    const day = dateSplitted[0];
    const month = dateSplitted[1];
    const year = dateSplitted[2];
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export default dateParser;
const Utils = {
  range(start, end, mapFn = i => i + start) {
    return Array.from({ length: (end - start) }, (_, i) => mapFn(i));
  }
}

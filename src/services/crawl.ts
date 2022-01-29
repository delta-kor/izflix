function isCrawler(): boolean {
  return navigator.userAgent === 'ReactSnap';
}

export default isCrawler;

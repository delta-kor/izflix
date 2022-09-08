function userIdToTag(userId: string): string {
  return `#${userId.slice(0, 2)}-${userId.slice(2, 5)}-${userId.slice(5)}`;
}

export { userIdToTag };



export const maskEmail = (email: string) => {
  const [localPath, domain] = email.split("@");

  if (localPath.length <= 2)
    return `${localPath[0]}*@${domain}`;

  return `${localPath[0]}${"*".repeat(localPath.length - 2)}${localPath.at(-1)}@${domain}`;
}
export const Logger = function (prefix: string) {
  const log = (...data: any[]) => [`${prefix}:`, ...data];

  return {
    log: (data: any[] | any) => console.log(...log(data)),
    warn: (data: any[] | any) => console.warn(...log(data)),
    error: (data: any[] | any) => console.error(...log(data)),
    info: (data: any[] | any) => console.info(...log(data)),
  };
};

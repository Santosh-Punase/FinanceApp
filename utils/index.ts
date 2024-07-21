import Colors from "../constants/Colors";

export const stringifyObject = (value: any): string => {
  return JSON.stringify(value);
};

export const parseObject = (value: string): Object => {
  return value ? JSON.parse(value) : null;
}

export const getProgressColor = (value: number) => {
  if(value < 0.5) {
    return Colors.dark.buttonWarningBG;
  }
  if(value < 0.75) {
    return Colors.dark.buttonSuccessBG;
  }
  return Colors.dark.buttonErrorBG;
}

export function replaceUrlParams(url: string, params: Record<string, string>) {
  return url.replace(/:([a-zA-Z0-9_]+)/g, (match, paramName) => {
    if (params.hasOwnProperty(paramName)) {
      return params[paramName];
    }
    return match;
  });
}
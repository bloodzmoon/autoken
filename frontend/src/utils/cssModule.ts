type Styles = { [key: string]: string }
/**
 * Function for join multiple CSS Modules classes
 *
 * @param styles Styles object from *.module.css files
 * @param classesName Array of class name
 */
export const cssModule = (styles: Styles) => (...classesName: string[]) =>
  classesName
    .reduce((all, name) => [...all, ...name.split(' ')], [] as string[])
    .map((name) => styles[name])
    .filter((name) => name !== '')
    .join(' ')

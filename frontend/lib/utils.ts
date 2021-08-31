export async function runAsync(promise: Promise<any>) {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    return [null, err];
  }
}

/// To capsulate nav item data
export class NavItemData {
  text: string;
  icon: any;
  route: string;
  isBtn: boolean;

  constructor(text: string, route: string, icon?: any, isBtn = false) {
    this.text = text;
    this.route = route;
    this.icon = icon;
    this.isBtn = isBtn;
  }
}

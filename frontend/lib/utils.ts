import SimpleBtn from "../components/btn/simple_btn";

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

  /// is authenticated
  authCheck: boolean;
  displayOnAuth: boolean;

  constructor(
    text: string,
    route: string,
    icon?: any,
    isBtn = false,
    authCheck = false,
    displayOnAuth = true
  ) {
    this.text = text;
    this.route = route;
    this.icon = icon;
    this.isBtn = isBtn;
    this.authCheck = authCheck;
    this.displayOnAuth = displayOnAuth;
  }

  getSimpleBtn = (onClick, width?: string, disabled?: boolean) => {
    return SimpleBtn({ text: this.text, onClick, width, disabled });
  };
}

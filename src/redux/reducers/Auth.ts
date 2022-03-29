class Auth {
  vars = {
    magic: {},
  };

  constructor(options) {
    this.vars = { ...this.vars, ...options };
  }
  init = async () => {
    const magic: any = this.vars.magic;
    const magicIsLoggedIn = await magic.user.isLoggedIn();
    if (magicIsLoggedIn) {
      const userMetadata = await magic.user.getMetadata();
      return { ...this.vars, userMetadata: userMetadata };
    }
    return this.vars;
  };
  login = async (state) => {
    //await vars.magic.auth.loginWithMagicLink({ email });
  };

  logout = async () => {
    const magic: any = this.vars.magic;
    await magic.user.logout();
  };
}
export default Auth;

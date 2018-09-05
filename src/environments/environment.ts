// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    api_url: 'http://myerp.brij.in',
    get_Otp_path: '/api/Account/GetCredentials',
    off_report_path: '/reports/off-report.json',
    login_path: '/Auth/token',
    login_auth_path: '/users/user.json'
};

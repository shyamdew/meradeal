import { Component, ɵCompiler_compileModuleAndAllComponentsSync__POST_R3__ } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './sso-config';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sso-client';
  constructor(private oauthService: OAuthService) {
    this.configureSingleSignOn();
  }
  configureSingleSignOn() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
  login() {
    this.oauthService.initImplicitFlow();
  }
  logout() {
    this.oauthService.logOut();
  }
  get token() {
    const claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }
}

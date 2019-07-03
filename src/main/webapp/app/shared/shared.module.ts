import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestJhipsterSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [TestJhipsterSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [TestJhipsterSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestJhipsterSharedModule {
  static forRoot() {
    return {
      ngModule: TestJhipsterSharedModule
    };
  }
}

import { NgModule } from '@angular/core';

import { TestJhipsterSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [TestJhipsterSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [TestJhipsterSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class TestJhipsterSharedCommonModule {}

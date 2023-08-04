import { module, test } from 'qunit';

import { setupTest } from 'frontend/tests/helpers';

module('Unit | Adapter | companies', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:companies');
    assert.ok(adapter);
  });
});

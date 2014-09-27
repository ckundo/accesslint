var expect = chai.expect;

describe('Labels', function() {
  var container, results;

  container = document.createElement('div');
  document.body.appendChild(container);

  var input = document.createElement('input');

  var textarea = document.createElement('textarea');
  textarea.setAttribute('id', 'test-input');

  var label = document.createElement('label');
  label.setAttribute('for', 'test-input');

  describe('an input without a label', function() {
    beforeEach(function() {
      container.appendChild(input);
      results = accesslint.run();
    });

    it('fails the audit', function() {
      expect(results[1].rule.code).to.equal('ALT02');
      expect(results[1].passing).to.equal(false);
      expect(results[1].elements).to.include(input);
    });
  });

  describe('an input with a label', function() {
    beforeEach(function() {
      container.appendChild(textarea);
      container.appendChild(label);
      results = accesslint.run();
    });

    it('passes the audit', function() {
      expect(results[1].rule.code).to.equal('ALT02');
      expect(results[1].passing).to.equal(true);
    });
  });

  afterEach(function() {
    container.innerHTML = '';
  });
});

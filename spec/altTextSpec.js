var expect = chai.expect;

describe('Alt text', function() {
  var fixture, container, results;

  container = document.createElement('div');
  document.body.appendChild(container);

  var fixtureWithoutAlt = document.createElement('img');

  var fixtureWithAlt = document.createElement('img');
  fixtureWithAlt.setAttribute('alt', 'Rolling hills with mountains in the distance.');

  var fixturePresentational = document.createElement('img');
  fixturePresentational.setAttribute('role', 'presentation');

  describe('when there is at least one image without alt text', function() {
    beforeEach(function() {
      container.appendChild(fixtureWithAlt);
      container.appendChild(fixtureWithoutAlt);
      results = accesslint.run();
    });

    it('fails the audit for the image that is missing alt text', function() {
      expect(results[0].rule.code).to.equal('ALT01');
      expect(results[0].passing).to.equal(false);
      expect(results[0].elements).to.include(fixtureWithoutAlt);
      expect(results[0].elements).to.not.include(fixtureWithAlt);
    });
  });

  describe('when all images have alt text', function() {
    beforeEach(function() {
      container.appendChild(fixtureWithAlt);
      results = accesslint.run();
    });

    it('fails the audit for the image that is missing alt text', function() {
      expect(results[0].rule.code).to.equal('ALT01');
      expect(results[0].passing).to.equal(true);
    });
  });

  describe('when images are presentational', function() {
    beforeEach(function() {
      container.appendChild(fixturePresentational);
      results = accesslint.run();
    });

    it('passes the audit with the correct ARIA role', function() {
      expect(results[0].rule.code).to.equal('ALT01');
      expect(results[0].passing).to.equal(true);
    });
  });

  afterEach(function() {
    container.innerHTML = '';
  });
});

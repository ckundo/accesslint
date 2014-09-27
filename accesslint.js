var accesslint = (function() {
  var self = {};
  var results;
  var rules = [
    {
      code: 'ALT01',
      tagNames: ['img'],
      assertion: function(node) {
        return !node.hasAttribute('alt') && node.getAttribute('role') !== 'presentation'
      }
    },
    {
      code: 'ALT02',
      tagNames: ['input', 'textarea', 'select'],
      assertion: function(node) {
        return document.querySelector('label[for="' + node.getAttribute('id') + '"]') === null
      }
    }
  ];

  var objectToArray = function(obj) {
    return [].map.call(obj, function(element) {
      return element;
    })
  };

  self.run = function() {
    results = [];
    rules.forEach(function(rule) {
      var result = { rule: rule };
      var failing = [];
      var nodes = document.querySelectorAll(rule.tagNames.join(', '));
      var nodeArray = objectToArray(nodes);

      nodeArray.forEach(function(node) {
        if(rule.assertion(node)) {
          failing.push(node);
        }
      });

      result.passing = failing.length === 0;
      result.elements = failing;
      results.push(result);
    });

    return results;
  };

  return self;
})();

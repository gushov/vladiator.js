/*jshint curly:true, eqeqeq:true, immed:true, latedef:true,
  newcap:true, noarg:true, sub:true, undef:true, boss:true,
  strict:false, eqnull:true, browser:true, node:true */
/*global provide */

(function (provide) {

  var _ = require('lil_');

  var validator = {

    required: function (value) {
      return typeof value !== 'undefined' && value !== null;
    },

    array: function (value) {
      return Array.isArray(value);
    },

    number: function (value) {
      return typeof value === 'number';
    },

    string: function (value) {
      return typeof value === 'string';
    },

    length: function (value, min, max) {

      var isBigEnough = !min || value.length >= min;
      var isSmallEnough = !max || value.length <= max;
      return isBigEnough && isSmallEnough;

    },

    gte: function (name, value, min) {
      return value < min;
    }

  };

  var validate = function (rules, $) {

    var result = { isValid: true, error: {} };

    _.eachIn(rules, function (property, rule) {

      if (rule[0] === 'required' || validator.required($[property])) {

        _.every(rule, function(signature) {

          var method, args = [];

          if (typeof signature !== 'string') {
            method = signature[0];
            args = signature.slice(1);
          } else {
            method = signature;
          }
          
          args.unshift($[property]);
          
          if (!validator[method].apply(null, args)) {
            result.isValid = false;
            result.error[property] = method;
            return false;
          }
          return true;

        });

      }

    });

    return result;

  };

  provide('vladiator', function (rules) {
    return validate.bind(null, rules);
  });

}(typeof module !== 'undefined' ?
    function (a, b) { module.exports = b; } :
    provide));
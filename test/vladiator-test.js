/*jshint curly:true, eqeqeq:true, immed:true, latedef:true,
  newcap:true, noarg:true, sub:true, undef:true, boss:true,
  strict:false, eqnull:true, browser:true, node:true */
/*global assert,refute */

var buster = typeof buster !== 'undefined' ? buster : require("buster");
var vlad = typeof module !== 'undefined' ? require('../lib/vladiator') : require('vladiator');

buster.testCase("vladiator", {

  "should validate something": function () {

    var chefRules = {
      name: ['required', 'string', ['length', 2, 5]],
      age: ['number', ['gte', 18]]
    };

    var recipeRules = {
      ingredients: ['array', ['length', 1]]
    };

    var resultChef1 = vlad(chefRules, {});
    var resultChef2 = vlad(chefRules, {
      name: 'iver'
    });
    var resultChef3 = vlad(chefRules, {
      name: 'i',
      age: 0
    });

    var resultRecipe1 = vlad(recipeRules, {});
    var resultRecipe2 = vlad(recipeRules, {
      ingredients: ['butter'],
      author: 'gus'
    });
    var resultRecipe3 = vlad(recipeRules, {
      ingredients: []
    });

    refute(resultChef1.isValid);
    assert.equals(Object.keys(resultChef1.error).length, 1);
    assert.equals(resultChef1.error.name, 'required');
    assert.equals(Object.keys(resultChef1.$).length, 2);

    assert(resultChef2.isValid);
    assert.equals(Object.keys(resultChef2.error).length, 0);
    assert.equals(Object.keys(resultChef2.$).length, 2);

    refute(resultChef3.isValid);
    assert.equals(Object.keys(resultChef3.error).length, 2);
    assert.equals(resultChef3.error.name, 'length');
    assert.equals(resultChef3.error.age, 'gte');

    assert(resultRecipe1.isValid);
    assert.equals(Object.keys(resultRecipe1.error).length, 0);

    assert(resultRecipe2.isValid);
    assert.equals(Object.keys(resultRecipe2.error).length, 0);
    assert.equals(Object.keys(resultRecipe2.$).length, 1);
    refute.defined(resultRecipe2.$.author);

    refute(resultRecipe3.isValid);
    assert.equals(Object.keys(resultRecipe3.error).length, 1);
    assert.equals(resultRecipe3.error.ingredients, 'length');

  }

});
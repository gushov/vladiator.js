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

    var resultChefName1 = vlad(chefRules.name, undefined);
    var resultChefAge1 = vlad(chefRules.age, undefined);

    refute(resultChefName1.isValid);
    assert(resultChefAge1.isValid);
    assert.equals(resultChefName1.error, 'required');
    assert.equals(resultChefName1.$, undefined);
    assert.equals(resultChefAge1.$, undefined);

    var resultChef2 = vlad(chefRules.name, 'iver');

    assert(resultChef2.isValid);
    assert.equals(resultChef2.error, undefined);
    assert.equals(resultChef2.$, 'iver');

    var resultChefName3 = vlad(chefRules.name, 'i');
    var resultChefAge3 = vlad(chefRules.age, 0);

    refute(resultChefName3.isValid);
    refute(resultChefAge3.isValid);

    assert.equals(resultChefName3.error, 'length');
    assert.equals(resultChefAge3.error, 'gte');

    var recipeRules = {
      ingredients: ['array', ['length', 1]]
    };

    var resultRecipe1 = vlad(recipeRules.ingredients, undefined);
    var resultRecipe2 = vlad(recipeRules.ingredients, ['butter']);
    var resultRecipe3 = vlad(recipeRules.ingredients, []);

    assert(resultRecipe1.isValid);
    assert.equals(resultRecipe1.error, undefined);

    assert(resultRecipe2.isValid);
    assert.equals(resultRecipe2.error, undefined);
    assert.equals(resultRecipe2.$.length, 1);

    refute(resultRecipe3.isValid);
    assert.equals(resultRecipe3.error, 'length');

  }

});

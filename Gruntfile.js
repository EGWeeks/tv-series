module.exports = function(grunt) {

  var title = grunt.option('title');
  if (title)
    title = title.replace(/ /gi, '+') || '';

  var id = grunt.option('id');

  grunt.initConfig({
    exec: {
      all: {
        command : 'node ./tools/build.js all true'
      },
      "fullseries": {
        command : 'node ./tools/build.js series true'
      },
      "fullproposals": {
        command : 'node ./tools/build.js proposals true'
      },
      series: {
        command : 'node ./tools/build.js series false'
      },
      "proposals": {
        command : 'node ./tools/build.js proposals false'
      },
      "justdata": {
        command : 'node ./tools/build.js all false'
      },
      "update" : {
        command : 'node ./tools/update.js ' + title
      },
      "season" : {
        command : 'node ./tools/season-inc.js ' + title
      },
      "add" : {
        command : 'node ./tools/add.js ' + id
      },
      "prop" : {
        command : 'node ./tools/prop.js ' + id
      }
    }
  });

  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['exec:series']);
  grunt.registerTask('all', ['exec:all']);
  grunt.registerTask('full-series', ['exec:fullseries']);
  grunt.registerTask('full-proposals', ['exec:fullproposals']);
  grunt.registerTask('proposals', ['exec:proposals']);
  grunt.registerTask('data', ['exec:justdata']);
  grunt.registerTask('update', ['exec:update']);
  grunt.registerTask('season', ['exec:season']);
  grunt.registerTask('add', ['exec:add']);
  grunt.registerTask('proposal', ['exec:prop']);

}

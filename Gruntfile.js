module.exports = function(grunt){
  grunt.initConfig({
    concat: {
      options:{
        separator : '\n\n',
      },
      basic_and_extras: {
        files : {
          'dist/light_bundle.css' : ['bower_components/materialize/dist/css/materialize.min.css', 'css/style.css', 'css/light.css'],
          'dist/dark_bundle.css' : ['bower_components/materialize/dist/css/materialize.min.css', 'css/style.css', 'css/dark.css'],
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default',['concat']);
}

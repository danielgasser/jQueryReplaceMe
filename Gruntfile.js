module.exports = function(grunt) {

    var pjson = require('./package.json');
    grunt.initConfig({
        uglify: {
            options: {
                flatten: true,
                compress: true
            },
            build: {
                src: pjson.name + '.js'
                ,
                dest: pjson.name + '.min.js'
            }
        }
       // watch: {
       //     files: ['<%= jshint.files %>'],
       //     tasks: ['jshint']
       // }
    });
console.log('?', pjson.name);
    grunt.loadNpmTasks('grunt-contrib-uglify');
   // grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify']);

};
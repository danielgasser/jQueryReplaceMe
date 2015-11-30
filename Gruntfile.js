module.exports = function(grunt) {

    grunt.initConfig({
        uglify: {
            options: {
                flatten: true,
                compress: true
            },
            build: {
                src: 'jQueryReplaceMe.js'
                ,
                dest: 'jQueryReplaceMe.min.js'
            }
        },
        watch: {
            js: {
                files: ['jQueryReplaceMe.js'],
                tasks: ['uglify']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify']);

};
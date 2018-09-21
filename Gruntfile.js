module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
    // Configuration
    grunt.initConfig({
        browserify: {
            dev: {
                files: [{
                    src: 'src/main.js',
                    dest: 'dist/main.js'
                }, {
                    src: 'src/iframe-drag-n-drop.js',
                    dest: 'dist/iframe-drag-n-drop.js'
                }],
                options: {
                    browserifyOptions: { debug: true },
                    transform: [["babelify", { "presets": ["es2015"] }]],
                    plugin: [],
                    watch: true,
                    keepAlive: true,
                }
            },
            prod: {
                files: [{
                    src: 'src/main.js',
                    dest: 'dist/main.js'
                }, {
                    src: 'src/iframe-drag-n-drop.js',
                    dest: 'dist/iframe-drag-n-drop.js'
                }],
                options: {
                    browserifyOptions: { debug: false },
                    transform: [["babelify", { "presets": ["es2015"] }]],
                    plugin: [
                        ["minifyify", { map: false }]
                    ],
                    keepAlive: true,
                }
            },
        },
        clean: {
            built: ['dist']
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserify');

    // Register tasks
    grunt.registerTask("build:dev", ['clean:all', 'browserify:dev']);
    grunt.registerTask("build:prod", ['clean:all', 'browserify:prod']);
    grunt.registerTask('clean:all', ['clean:built']);
};
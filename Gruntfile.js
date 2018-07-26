module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

    // Configuration
    grunt.initConfig({
        browserify: {
            development: {
                src: [
                    "src/init.js",
                    'src/components.js',
                    'src/undo.js',
                    'src/plugin-codemirror.js',
                    'src/drag-n-drop.js',
                    'src/iframe-drag-n-drop.js'
                ],
                dest: 'dist/common.js',
                options: {
                    browserifyOptions: { debug: true },
                    transform: [["babelify", { "presets": ["es2015"] }]],
                    plugin: [
                        ["factor-bundle", {
                            outputs: [
                                'dist/init.js',
                                'dist/components.js',
                                'dist/undo.js',
                                'dist/plugin-codemirror.js',
                                'dist/drag-n-drop.js',
                                'dist/iframe-drag-n-drop.js'
                            ]
                        }]
                    ],
                    watch: true,
                    keepAlive: true,
                }
            },
            production: {
                src: [
                    "src/init.js",
                    'src/components.js',
                    'src/undo.js',
                    'src/plugin-codemirror.js',
                    'src/drag-n-drop.js',
                    'src/iframe-drag-n-drop.js'
                ],
                dest: 'dist/common.js',
                options: {
                    browserifyOptions: { debug: false },
                    transform: [["babelify", { "presets": ["es2015"] }]],
                    plugin: [
                        ["factor-bundle", {
                            outputs: [
                                'dist/init.js',
                                'dist/components.js',
                                'dist/undo.js',
                                'dist/plugin-codemirror.js',
                                'dist/drag-n-drop.js',
                                'dist/iframe-drag-n-drop.js'
                            ]
                        }],
                        ["minifyify", { map: false }]
                    ],
                    keepAlive: true,
                }
            },
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['env']
            },
            transpile: {
                files: [
                    {
                        expand: true,
                        cwd: 'lib/',
                        src: ['*.js'],
                        dest: 'transpiled/',
                        ext: '.babel.js'
                    }
                ]
            },
            build: {
                files: {
                    'dist/built.js': 'concated/concated.js',
                    'dist/iframe-drag-n-drop.js': 'src/iframe-drag-n-drop.js'
                }
            }
        },
        concat: {
            es6: {
                src: [
                    'transpiled/builder*.js',
                    'transpiled/undo*.js',
                    'transpiled/inputs*.js',
                    'transpiled/components-bootstrap4*.js',
                    'transpiled/drag-n-drop*.js'
                ],
                dest: 'dist/built.js'
            },
            es5: {
                src: [
                    // 'lib/builder*.js',
                    'lib/undo*.js',
                    'lib/drag-n-drop*.js'
                ],
                dest: 'concated/concated.js'
            }
        },
        clean: {
            concated: ['concated'],
            built: ['dist'],
            transpiled: ['transpiled']
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserify');

    // Register tasks
    grunt.registerTask("build:dev", ['clean:all', 'browserify:development']);
    grunt.registerTask("build:prod", ['clean:all', 'browserify:production']);
    grunt.registerTask('build', ['clean:all', 'concat:es5', 'babel:build']);
    grunt.registerTask('transpile', ['babel:transpile']);
    grunt.registerTask('clean:all', ['clean:concated', 'clean:built', 'clean:transpiled']);
};
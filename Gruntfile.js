module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

    // Configuration
    grunt.initConfig({
        browserify: {
            development: {
                src: [
                    "src/*.js"
                ],
                dest: 'dist/common.js',
                options: {
                    browserifyOptions: { debug: true },
                    transform: [["babelify", { "presets": ["es2015"] }]],
                    plugin: [
                        ["factor-bundle", {
                            outputs: [
                                'dist/builder.js',
                                'dist/components-bootstrap4.js',
                                'dist/inputs.js',
                                'dist/undo.js'
                            ]
                        }]
                    ],
                    watch: true,
                    keepAlive: true,
                }
            },
            production: {
                src: [
                    "src/*.js"
                ],
                dest: 'dist/common.min.js',
                options: {
                    browserifyOptions: { debug: false },
                    transform: [["babelify", { "presets": ["es2015"] }]],
                    plugin: [
                        ["factor-bundle", {
                            outputs: [
                                'transpiled/builder.min.js',
                                'transpiled/components-bootstrap4.min.js',
                                'transpiled/inputs.min.js',
                                'transpiled/undo.min.js'
                            ]
                        }],
                        ["minifyify", { map: false }]
                    ]
                }
            }
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
                        cwd: 'src/',
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
                    'src/builder*.js',
                    'src/undo*.js',
                    'src/inputs*.js',
                    'src/components-bootstrap4*.js',
                    'src/drag-n-drop*.js'
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
    grunt.registerTask("build:dev", ['browserify:development']);
    grunt.registerTask("build:prod", ['browserify:production']);
    grunt.registerTask('build', ['clean:all', 'concat:es5', 'babel:build']);
    grunt.registerTask('transpile', ['babel:transpile']);
    grunt.registerTask('clean:all', ['clean:concated', 'clean:built', 'clean:transpiled']);
};
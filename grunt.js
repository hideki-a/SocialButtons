module.exports = function (grunt) {
    grunt.initConfig({
        pkg: "<json:package.json>",
        meta: {
            banner: "/*! <%= pkg.name %> -v<%= pkg.version %> <%= pkg.author %> | " + 
                    "<%= pkg.license %> */"
        },
        min: {
            dist: {
                src: ["<banner>", "src/socialbuttons.js"],
                dest: "dist/socialbuttons.min.js"
            }
        },
        lint: {
            files: ["grunt.js", "src/*.js"]
        }
    });

    grunt.registerTask("default", "lint min");
};

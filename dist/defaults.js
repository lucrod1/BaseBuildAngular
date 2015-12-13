var gutil  = require('gulp-util');

module.exports = function(){

  /*
    ==========================
    Basic Options
    ==========================
  */
  var defaultOptions = {
    mainAngularModule : 'MainAngularModule',
    src               : 'src',
    dist              : 'builds/release',
    tmp               : 'builds/dev',
    e2e               : 'e2e',
    bowerComponents   : 'bower_components',

    srcEnv            : 'builds/dev/serve/',
    tmpEnv            : 'builds/dev/serve/',
    distEnv           : 'builds/release/',

    componentSrc      : '',
    componentDest     : '',
    componentDist     : '',
    componentName     : '',

    errorHandler      : function(title) {
      return function(err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        gutil.beep();
        this.emit('end');
      };
    },

    wiredep: {
      directory: 'bower_components',
      exclude: [
        /bootstrap-sass-official\/.*\.js/,
        /bootstrap\.css/,
        'bower_components/angular-input-masks'
      ]
    },

    devTasks: ['dev', 'watch', 'watchTests', 'serve', 'serve:e2e']

  };


   /*
    ==========================
    wiredep
    ==========================
  */
  defaultOptions.wiredep.src = defaultOptions.tmp + '/serve/index.html'

  /*
    ==========================
    Specs
    ==========================
  */
  defaultOptions.specFiles = [
    defaultOptions.src + '/**/*.spec.js',
    defaultOptions.tmp + '/**/*.spec.js',
    defaultOptions.src + '/**/*.mock.js',
    defaultOptions.tmp + '/**/*.mock.js'
  ]

  /*
    ==========================
    Custom Excludes
    ==========================
  */
  defaultOptions.excludes = {
    stylesFromIndexImport: [
      defaultOptions.src + '/app/index.scss',
      defaultOptions.src + '/app/vendor.scss',
      //defaultOptions.src + '/app/' + defaultOptions.componentName,
      defaultOptions.src + '/app/project/styles/**/*.scss'
    ]
  };


  /*
    ==========================
    modules
    ==========================
  */
 
  /*
  Basebuild works with modules. There is one module for each feature,   
  Built-in modules: {
    utils     : {}
    build     : {}     
    e2eTest   : {}   
    inject    : {}    
    proxy     : {}
    scripts   : {}
    styles    : {}
    unitTests : {}
    watch     : {}
    server    : {}
    docs      : {}
    sonar     : {}
  }
  */
  defaultOptions.modulesData = {
    /*
    
    moduleExample: {
      *** Basic built-in property ***  
      defaultValue : 'path/script.js'
    
      *** Common options between modules ***
      uses          : 'path/script.js'
      notStart      : true || false,
      notLogOnStart : true || false,
      isDefault     : true || false,
      isExternal    : true || false
    }
    
    */
  


    /*
      utils Module
      Access to general utilities of basebuild
    */
    utils : { 
      defaultValue : './utils.js'   ,
      notLogOnStart: true 
    },


    /*
      build module
      Responsible for production version of the project. 
    */
    build: { 
      defaultValue : './build.js'     
    },


    /*
      e2eTest module
      Works in e2e tests. 
    */
    e2eTest: { 
      defaultValue : './e2e-tests.js' 
    },


    /*
      inject module
      Injects scripts and stylesheets automatically in index.html.
    */
    inject: { 
      defaultValue : './inject.js'    
    },


    /*
      proxy module
      Proxy settings for server module (browser-sync + http-proxy)
    */
    proxy: {
      defaultValue : './proxy.js',

      // Specifies the proxy target (server address)
      target    : 'http://localhost:8080',

      // All Requests are tested with a regex to prevent the proxy when it's considered true
      regexNext : /\.(html|css|js|png|jpg|jpeg|gif|ico|xml|rss|txt|eot|svg|ttf|woff|woff2|cur|json)(\?((r|v|rel|rev)=[\-\.\w]*)?)?$/
    },


    /*
      scripts module
      Works with CoffeeScript and Javascript files
    */
    scripts: {
      defaultValue : './scripts.js',

      // Pattern for scripts only present on development phase
      devScripts: [
        defaultOptions.tmp + '/serve/app/**/*.dev*.js',
      ],

      // Pattern for scripts only present on production phase
      prodScripts: [
        defaultOptions.tmp + '/serve/app/**/*.prod*.js'
      ]
    },


    /*
      styles module
      Works with SASS (*.scss) files
    */
    styles: { 
      defaultValue : './styles.js'    
    },


    /*
      unitTests module
      Works in unit tests for scripts (CoffeeScripts and Javascript)
    */
    unitTests: {
      defaultValue : './unit-tests.js',

      // Pattern for additional dependencies that must be injected in tests
      addDeps      : [],
      
      // Karma settings for "test" task
      testConfig   : {
        
        // Run the tests only one single time
        singleRun : true,
        
        browsers  : ['Chrome']
      },

      // Karma settings for "test:auto" task
      testAutoConfig : {

        // Run the tests and wait for changes to run it again
        singleRun : false,

        browsers  : ['Chrome']
      }
    },


    /*
      watch module
      Wait for changes in files to react with some callback
    */
    watch: { 
      defaultValue : './watch.js'     
    },


    /*
      watch module
      Serves the project files
    */
    server    : {
      defaultValue : './server.js',

      // Creates routes to access files 
      routes       : {
        '/bower_components': 'bower_components'
      },
    },


    /*
      External module which will be the reference for gulp
    */
    gulp: { 
      defaultValue : 'gulp'  , 
      notStart: true, 
      isExternal: true
    },


    /*
      External module which will be the reference for karma
    */
    karma     : {
      defaultValue : 'karma' ,
      notStart     : true,
      configFile   : 'karma.conf.js',
      isExternal   : true
    },


    /*
      docs module
      Generate documentation for source code
    */
    docs: {
      defaultValue : './docs.js',

      // Pattern for source code files
      files        : [
        defaultOptions.src + '/**/*.coffee',
        defaultOptions.src + '/**/*.scss',
      ],

      // Output folder
      out: 'docs'
    },

    /*
      sonar module
      Sends coverage report to sonarqube
    */
    sonar: {
      defaultValue : './sonar.js',
      login        : null,
      password     : null,
      host         : {
        url : ''
      },
      jdbc : {
        url      : ''
      },
      projectKey     : '',
      projectName    : '',
      projectVersion : '1.0.0',
      sources        : defaultOptions.tmp,
      language       : 'js',
      sourceEncoding : 'UTF-8',
      exclusions     : defaultOptions.specFiles,
      javascript : {
        lcov : {
          reportPath: 'coverage/report-lcov.lcov'
        }
      }
    }
  };

  // deprecated for a while
  defaultOptions.modules = {};


  // Common initial properties
  for(key in defaultOptions.modulesData){
    defaultOptions.modulesData[key].isDefault = true;
    defaultOptions.modulesData[key].isEnabled = true;
    defaultOptions.modulesData[key].uses = defaultOptions.modulesData[key].defaultValue;

  }


  return defaultOptions;

}
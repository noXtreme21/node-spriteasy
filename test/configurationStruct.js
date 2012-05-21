require('../lib/index');
var should = require('should');

var configurationStruct = new SPRITEASY.ConfigurationStruct(
    new SPRITEASY.ConfigurationReader(__dirname + '/fixtures/configuration.json')
);

describe('ConfigurationStruct', function(){
    describe('getPackages', function(){
        it('should return a list of packages', function(){
            var packages = configurationStruct.getPackages();
            packages.should.be.a('object');
            packages.should.have.property('next');
            packages.should.have.property('count');
            
            var count = packages.count();
            count.should.be.a('number');
            count.should.be.equal(1);
            
            var package = packages.next();
            package.should.be.a('object');
            package.should.have.property('class', 'configuration_image');
            package.should.have.property('imageDestination', 'sprites/configuration_image.png');
            package.should.have.property('scale', '100px x 100px');
            package.should.have.property('mirror', 'false');
        });
    });
});


describe('ConfigurationStruct', function(){
    describe('getLessFiles', function(){
        it('should return a list less files which should be compiled', function(){
            var lessFiles = configurationStruct.getLessFiles();
            lessFiles.should.be.a('object');
            lessFiles.should.have.property('next');
        
            var lessFile = lessFiles.next();
            lessFile.should.be.a('string');
            lessFile.should.be.equal('configuration_less_file.less');
        });
    });
});


describe('ConfigurationStruct', function(){
    describe('getStylesheetDestination', function(){
        it('should return a stylesheet destination path', function(){
            var stylesheetDestination = configurationStruct.getStylesheetDestination();
            stylesheetDestination.should.be.a('string');
            stylesheetDestination.should.be.equal('configuration_stylesheet.css');
        });
    });
});


describe('ConfigurationStruct', function(){
    describe('getImageDestination', function(){
        it('should return a stylesheet destination path', function(){
            var imageDestination = configurationStruct.getImageDestination();
            imageDestination.should.be.a('string');
            imageDestination.should.be.equal('configuration_sprites');
        });
    });
});


describe('ConfigurationStruct', function(){
    describe('addPackage', function(){
        it('should add a package to the packages list', function(){
            configurationStruct.addPackage(
                new SPRITEASY.PackageReader(__dirname + '/fixtures/package.json')
            );
        
            var packages = configurationStruct.getPackages();
            packages.should.be.a('object');
            packages.should.have.property('next');
            packages.should.have.property('count');
        
            var count = packages.count();
            count.should.be.a('number');
            count.should.be.equal(2);
        
            var package = packages.next();
            package.should.be.a('object');
            package.should.have.property('class', 'package_image');
            package.should.have.property('imageDestination', 'sprites/package_image.png');
            package.should.have.property('scale', '200px x 200px');
            package.should.have.property('mirror', 'vertical');
        });
    });
});


describe('ConfigurationStruct', function(){
    describe('addLessFiles', function(){
        it('should add a less file to less file list', function(){
            configurationStruct.addLessFile('less_file_added.less');
            var lessFiles = configurationStruct.getLessFiles();
            lessFiles.should.have.property('next');
        
            var lessFile = lessFiles.next();
            lessFile.should.be.a('string');
            lessFile.should.be.equal('less_file_added.less');
        });
    });
});


describe('ConfigurationStruct', function(){
    describe('setStylesheetDestination', function(){
        it('should change a stylesheet destination path', function(){
            configurationStruct.setStylesheetDestination('stylesheet_changed.css');
            var stylesheetDestination = configurationStruct.getStylesheetDestination();
            stylesheetDestination.should.be.a('string');
            stylesheetDestination.should.be.equal('stylesheet_changed.css');
        });
    });
});


describe('ConfigurationStruct', function(){
    describe('setImageDestination', function(){
        it('should change a stylesheet destination path', function(){
            configurationStruct.setImageDestination('sprites_changed');
            var imageDestination = configurationStruct.getImageDestination();
            imageDestination.should.be.a('string');
            imageDestination.should.be.equal('sprites_changed');
        });
    });
});

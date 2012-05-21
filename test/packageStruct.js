require('../lib/index');
var should = require('should');

var configurationStruct = new SPRITEASY.ConfigurationStruct(
    new SPRITEASY.ConfigurationReader(__dirname + '/fixtures/configuration.json')
);

var packageStruct = new SPRITEASY.PackageStruct(
    new SPRITEASY.PackageReader(__dirname + '/fixtures/package.json')
  , configurationStruct
);


describe('PackageStruct', function(){
    describe('getClass', function(){
        it('should return the css class name of image', function(){
            var className = packageStruct.getClass();
            className.should.be.a('string');
            className.should.equal('package_image');
        });
    });
});


describe('PackageStruct', function(){
    describe('getImageDestination', function(){
        it('should return the image destination path of image', function(){
            var imageDestination = packageStruct.getImageDestination();
            imageDestination.should.be.a('string');
            imageDestination.should.equal('sprites/package_image.png');
        });
    });
});

describe('PackageStruct', function(){
    describe('getStylesheetDestination', function(){
        it('should return the stylesheet destination path of image', function(){
            var stylesheetDestination = packageStruct.getStylesheetDestination();
            stylesheetDestination.should.be.a('string');
            stylesheetDestination.should.equal('configuration_stylesheet.css');
        });
    });
});

describe('PackageStruct', function(){
    describe('getWidth', function(){
        it('should return the width of image', function(){
            var width = packageStruct.getWidth();
            width.should.be.a('number');
            width.should.equal(200);
        });
    });
});


describe('PackageStruct', function(){
    describe('getHeight', function(){
        it('should return the height of image', function(){
            var height = packageStruct.getHeight();
            height.should.be.a('number');
            height.should.equal(200);
        });
    });
});


describe('PackageStruct', function(){
    describe('getTotalWidth', function(){
        it('should return the current total width of image', function(){
            var totalWidth = packageStruct.getTotalWidth();
            totalWidth.should.be.a('number');
            totalWidth.should.equal(200);
        });
    });
});


describe('PackageStruct', function(){
    describe('getTotalHeight', function(){
        it('should return the current total height of image', function(){
            var totalHeight = packageStruct.getTotalHeight();
            totalHeight.should.be.a('number');
            totalHeight.should.equal(400);
        });
    });
});


describe('PackageStruct', function(){
    describe('getMirror', function(){
        it('should return the mirror style of image', function(){
            var mirror = packageStruct.getMirror();
            mirror.should.be.a('string');
            mirror.should.equal('vertical');
        });
    });
});


describe('PackageStruct', function(){
    describe('getImages', function(){
        it('should return a list of images', function(){
            var images = packageStruct.getImages();
            images.should.be.a('object');
            images.should.have.property('next');
            
            var imageCount = images.count();
            imageCount.should.be.a('number');
            imageCount.should.be.equal(2);
            
            var image = images.next();
            image.should.be.a('object');
            image.should.have.property('getImage');
            image.should.have.property('getWidth');
            image.should.have.property('getHeight');
            image.should.have.property('getTotalWidth');
            image.should.have.property('getTotalHeight');
            image.should.have.property('getLeft');
            image.should.have.property('getTop');
            
            var imageSrc = image.getImage().src;
            imageSrc.should.be.a('string');
            imageSrc.should.be.equal('test/images/image2.png');
        });
    });
});


describe('PackageStruct', function(){
    describe('setClass', function(){
        it('should change the css class name of image', function(){
            packageStruct.setClass('package_image_changed')
            var className = packageStruct.getClass();
            className.should.be.a('string');
            className.should.equal('package_image_changed');
        });
    });
});


describe('PackageStruct', function(){
    describe('setImageDestination', function(){
        it('should change the image destination path of image', function(){
            packageStruct.setImageDestination('sprites/package_image_changed.png');
            var imageDestination = packageStruct.getImageDestination();
            imageDestination.should.be.a('string');
            imageDestination.should.equal('sprites/package_image_changed.png');
        });
    });
});


describe('PackageStruct', function(){
    describe('setStylesheetDestination', function(){
        it('should change the stylesheet destination path of image', function(){
            packageStruct.setStylesheetDestination('configuration_stylesheet_changed.css');
            var stylesheetDestination = packageStruct.getStylesheetDestination();
            stylesheetDestination.should.be.a('string');
            stylesheetDestination.should.equal('configuration_stylesheet_changed.css');
        });
    });
});


describe('PackageStruct', function(){
    describe('setScale', function(){
        it('should change the scale properties of image', function(){
            packageStruct.setScale('123px x 234px');
            
            var width = packageStruct.getWidth();
            width.should.be.a('number');
            width.should.equal(123);
            
            var height = packageStruct.getHeight();
            height.should.be.a('number');
            height.should.equal(234);
            
            packageStruct.setScale('345 x 456');
            
            var width = packageStruct.getWidth();
            width.should.be.a('number');
            width.should.equal(345);
            
            var height = packageStruct.getHeight();
            height.should.be.a('number');
            height.should.equal(456);
            
            packageStruct.setScale('678 789');
            
            var width = packageStruct.getWidth();
            width.should.be.a('number');
            width.should.equal(678);
            
            var height = packageStruct.getHeight();
            height.should.be.a('number');
            height.should.equal(789);
        });
    });
});


describe('PackageStruct', function(){
    describe('setMirror', function(){
        it('should change the mirror style of image', function(){
            packageStruct.setMirror('horizontal')
            var mirror = packageStruct.getMirror();
            mirror.should.be.a('string');
            mirror.should.equal('horizontal');
        });
    });
});


describe('PackageStruct', function(){
    describe('addImages', function(){
        it('should add an image', function(){
            packageStruct.addImage('test/images/image1.png');
            
            var images = packageStruct.getImages();
            images.should.be.a('object');
            images.should.have.property('next');
            
            var imageCount = images.count();
            imageCount.should.be.a('number');
            imageCount.should.be.equal(3);
            
            var image = images.next();
            var image = images.next();
            image.should.be.a('object');
            image.should.have.property('getImage');
            image.should.have.property('getWidth');
            image.should.have.property('getHeight');
            image.should.have.property('getTotalWidth');
            image.should.have.property('getTotalHeight');
            image.should.have.property('getLeft');
            image.should.have.property('getTop');
            
            var imageSrc = image.getImage().src;
            imageSrc.should.be.a('string');
            imageSrc.should.be.equal('test/images/image1.png');
        });
    });
});

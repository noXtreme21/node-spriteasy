require('../lib/index');
var Canvas = require('canvas')
  , Image  = Canvas.Image
  , should = require('should');

var imageStruct = new SPRITEASY.ImageStruct(
    new SPRITEASY.ImageReader(__dirname + '/fixtures/image.json')
);

describe('ImageStruct', function(){
    describe('getImage', function(){
        it('should return an image object', function(){
            var image = imageStruct.getImage();
            image.should.be.a('object');
            image.src.should.be.equal('test/images/image1.png');
        });
    });
});


describe('ImageStruct', function(){
    describe('getWidth', function(){
        it('should return the width of the image', function(){
            var width = imageStruct.getWidth();
            width.should.be.a('number');
            width.should.be.equal(100);
        });
    });
});


describe('ImageStruct', function(){
    describe('getHeight', function(){
        it('should return the height of the image', function(){
            var height = imageStruct.getHeight();
            height.should.be.a('number');
            height.should.be.equal(100);
        });
    });
});


describe('ImageStruct', function(){
    describe('getTotalWidth', function(){
        it('should return the total width of the image', function(){
            var width = imageStruct.getTotalWidth();
            width.should.be.a('number');
            width.should.be.equal(200);
        });
    });
});


describe('ImageStruct', function(){
    describe('getTotalHeight', function(){
        it('should return the total height of the image', function(){
            var height = imageStruct.getTotalHeight();
            height.should.be.a('number');
            height.should.be.equal(200);
        });
    });
});


describe('ImageStruct', function(){
    describe('getLeft', function(){
        it('should return the left position of the image', function(){
            var left = imageStruct.getLeft();
            left.should.be.a('number');
            left.should.be.equal(100);
        });
    });
});


describe('ImageStruct', function(){
    describe('getTop', function(){
        it('should return the top position of the image', function(){
            var top = imageStruct.getTop();
            top.should.be.a('number');
            top.should.be.equal(100);
        });
    });
});


describe('ImageStruct', function(){
    describe('setImage', function(){
        it('should change the image object', function(){
            imageStruct.setImage(
                new SPRITEASY.ImageReader(__dirname + '/fixtures/image.json')
            );
            var image = imageStruct.getImage();
            image.should.be.a('object');
            image.src.should.be.equal('test/images/image1.png');
        });
    });
});


describe('ImageStruct', function(){
    describe('setWidth', function(){
        it('should change the width of the image', function(){
            imageStruct.setWidth(200);
            var width = imageStruct.getWidth();
            width.should.be.a('number');
            width.should.be.equal(200);
        });
    });
});


describe('ImageStruct', function(){
    describe('setHeight', function(){
        it('should change the height of the image', function(){
            imageStruct.setHeight(200);
            var height = imageStruct.getHeight();
            height.should.be.a('number');
            height.should.be.equal(200);
        });
    });
});


describe('ImageStruct', function(){
    describe('setTotalWidth', function(){
        it('should change the total width of the image', function(){
            imageStruct.setTotalWidth(400);
            var width = imageStruct.getTotalWidth();
            width.should.be.a('number');
            width.should.be.equal(400);
        });
    });
});


describe('ImageStruct', function(){
    describe('getTotalHeight', function(){
        it('should change the total height of the image', function(){
            imageStruct.setTotalHeight(400);
            var height = imageStruct.getTotalHeight();
            height.should.be.a('number');
            height.should.be.equal(400);
        });
    });
});

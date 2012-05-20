SPRITEASY_PATH            = __dirname;
SPRITEASY_PATH_ABSTRACT   = SPRITEASY_PATH + '/abstract';
SPRITEASY_PATH_CLASS      = SPRITEASY_PATH + '/class';
SPRITEASY_PATH_COLLECTION = SPRITEASY_PATH + '/collection';
SPRITEASY_PATH_MODULE     = SPRITEASY_PATH + '/module';
SPRITEASY_PATH_READER     = SPRITEASY_PATH + '/reader';
SPRITEASY_PATH_STRUCT     = SPRITEASY_PATH + '/struct';
SPRITEASY_PATH_WRITER     = SPRITEASY_PATH + '/writer';

SPRITEASY_CLI_MODE      = true;

SPRITEASY = new Object({
    'ConfigurationStruct': require(SPRITEASY_PATH_STRUCT + '/configurationStruct')
  , 'PackageStruct': require(SPRITEASY_PATH_STRUCT + '/packageStruct')
  , 'ImageStruct': require(SPRITEASY_PATH_STRUCT + '/imageStruct')
  , 'ConfigurationReader': require(SPRITEASY_PATH_READER + '/configurationReader')
  , 'PackageReader': require(SPRITEASY_PATH_READER + '/packageReader')
  , 'ImageReader': require(SPRITEASY_PATH_READER + '/imageReader')
  , 'Collection': require(SPRITEASY_PATH_CLASS + '/collection')
  , 'Writer': require(SPRITEASY_PATH_WRITER + '/writer')
  , 'ImageWriter': require(SPRITEASY_PATH_WRITER + '/imageWriter')
  , 'StylesheetWriter': require(SPRITEASY_PATH_WRITER + '/stylesheetWriter')
});

var spriteasy = require(SPRITEASY_PATH_MODULE + '/spriteasy');

console.log(spriteasy);

SPRITEASY                 = new Object();
SPRITEASY_PATH            = __dirname;
SPRITEASY_PATH_ABSTRACT   = SPRITEASY_PATH + '/abstract';
SPRITEASY_PATH_CLASS      = SPRITEASY_PATH + '/class';
SPRITEASY_PATH_COLLECTION = SPRITEASY_PATH + '/collection';
SPRITEASY_PATH_MODULE     = SPRITEASY_PATH + '/module';
SPRITEASY_PATH_READER     = SPRITEASY_PATH + '/reader';
SPRITEASY_PATH_STRUCT     = SPRITEASY_PATH + '/struct';
SPRITEASY_PATH_WRITER     = SPRITEASY_PATH + '/writer';
SPRITEASY_CLI_MODE        = true;

var requiredFiles = new Object({
    'AbstractFileHandler': SPRITEASY_PATH_ABSTRACT + '/abstractFileHandler'
  , 'AbstractWriter':      SPRITEASY_PATH_ABSTRACT + '/abstractWriter'
  , 'ConfigurationStruct': SPRITEASY_PATH_STRUCT   + '/configurationStruct'
  , 'PackageStruct':       SPRITEASY_PATH_STRUCT   + '/packageStruct'
  , 'ImageStruct':         SPRITEASY_PATH_STRUCT   + '/imageStruct'
  , 'ConfigurationReader': SPRITEASY_PATH_READER   + '/configurationReader'
  , 'PackageReader':       SPRITEASY_PATH_READER   + '/packageReader'
  , 'ImageReader':         SPRITEASY_PATH_READER   + '/imageReader'
  , 'Collection':          SPRITEASY_PATH_CLASS    + '/collection'
  , 'Writer':              SPRITEASY_PATH_WRITER   + '/writer'
  , 'ImageWriter':         SPRITEASY_PATH_WRITER   + '/imageWriter'
  , 'StylesheetWriter':    SPRITEASY_PATH_WRITER   + '/stylesheetWriter'
});

for (file in requiredFiles) {
    SPRITEASY[file] = require(requiredFiles[file]);
}

var spriteasy = require(SPRITEASY_PATH_MODULE + '/spriteasy');


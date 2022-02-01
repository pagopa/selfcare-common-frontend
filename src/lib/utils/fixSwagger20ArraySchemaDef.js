const fs = require('fs');
const regexReplace = require('regex-replace');

console.log(`Fixing Swagger 2.0 schema array definition in ${process.argv[2]}`);

const filePath = process.argv[2];

const patternRef =
  /"schema"\s*:\s*\{[^{]+\{\s*"\$ref"\s*:\s*"#\/definitions\/([^"]+)"[^,]+,\s+"type"\s*:\s*"array"[^}]+}((?:\n|.)*"definitions"\s*:\s*\{)/gm;
const patternRef2 =
  /"schema"\s*:\s*\{\s*"type"\s*:\s*"array"[^{]+\{\s*"\$ref"\s*:\s*"#\/definitions\/([^"]+)"[^}]*}[^}]*}((?:\n|.)*"definitions"\s*:\s*\{)/gm;
const replaceRef =
  '"schema":{"$ref":"#/definitions/$1Array"}$2"$1Array":{"type": "array", "items": {"$ref": "#/definitions/$1"}},';

async function fixArrayDef(patternRef, replaceRef) {
  regexReplace(patternRef, replaceRef, filePath).then((r) => {
    fs.readFile(filePath, 'utf8', function (err, doc) {
      if (doc.match(patternRef)) {
        fixArrayDef(patternRef, replaceRef);
      }
    });
  });
}

const patternNativeArrayType = (nativeType) =>
  new RegExp(
    `"schema"\\s*:\\s*\\{[^{]+\\{\\s*"type"\\s*:\\s*"${nativeType}"[^,]+,\\s+"type"\\s*:\\s*"array"[^}]+}`,
    'gm'
  );
const replaceNativeArrayType = (nativeType) =>
  `"schema":{"$ref":"#/definitions/${nativeType.toUpperCase()}Array"}`;

const patternNativeTypeRef = /"definitions"\s*:\s*\{/gm;
const replaceNativeArrayTypeRef = (nativeType) =>
  `"definitions" : {"${nativeType.toUpperCase()}Array":{"type": "array", "items": {"type": "${nativeType}"}},`;

async function fixArrayNativeDef(nativeType) {
  await regexReplace(
    patternNativeArrayType(nativeType),
    replaceNativeArrayType(nativeType),
    filePath
  );

  await regexReplace(patternNativeTypeRef, replaceNativeArrayTypeRef(nativeType), filePath);
}

const patternNativeType = (nativeType) =>
  new RegExp(`"schema"\\s*:\\s*\\{\\s*"type"\\s*:\\s*"${nativeType}"\\s*}`, 'gm');
const replaceNativeType = (nativeType) =>
  `"schema":{"$ref":"#/definitions/${nativeType.toUpperCase()}Wrapper"}`;
const replaceNativeTypeRef = (nativeType) =>
  `"definitions" : {"${nativeType.toUpperCase()}Wrapper":{"type": "${nativeType}"},`;

async function fixNativeDef(nativeType) {
  await regexReplace(patternNativeType(nativeType), replaceNativeType(nativeType), filePath);

  await regexReplace(patternNativeTypeRef, replaceNativeTypeRef(nativeType), filePath);
}

async function exec() {
  await fixArrayDef(patternRef, replaceRef);
  await fixArrayDef(patternRef2, replaceRef);
  await fixArrayNativeDef('string');
  await fixNativeDef('string');
}

exec();

import fs from 'node:fs/promises';

const filePath = process.argv[2];

if (!filePath) {
  throw new Error('Missing file path argument');
}

const doc = JSON.parse(await fs.readFile(filePath, 'utf8'));

const definitions = doc.definitions || {};
doc.definitions = definitions;

// Utility
const ensureDefinition = (name, value) => {
  if (!definitions[name]) {
    definitions[name] = value;
  }
};

// Recursive traversal
function traverse(obj) {
  if (!obj || typeof obj !== 'object') return;

  if (obj.schema) {
    const schema = obj.schema;

    // CASE 1: array + $ref (invalid swagger)
    if (schema.type === 'array' && schema.$ref) {
      const refName = schema.$ref.split('/').pop();
      const arrayName = `${refName}Array`;

      ensureDefinition(arrayName, {
        type: 'array',
        items: { $ref: `#/definitions/${refName}` },
      });

      obj.schema = { $ref: `#/definitions/${arrayName}` };
    }

    // CASE 2: native array
    if (schema.type === 'array' && schema.items?.type) {
      const native = schema.items.type.toUpperCase();
      const arrayName = `${native}Array`;

      ensureDefinition(arrayName, {
        type: 'array',
        items: { type: schema.items.type },
      });

      obj.schema = { $ref: `#/definitions/${arrayName}` };
    }

    // CASE 3: native type
    if (schema.type && typeof schema.type === 'string' && !schema.$ref) {
      const native = schema.type.toUpperCase();
      const wrapperName = `${native}Wrapper`;

      ensureDefinition(wrapperName, {
        type: schema.type,
      });

      obj.schema = { $ref: `#/definitions/${wrapperName}` };
    }
  }

  // recurse
  Object.values(obj).forEach(traverse);
}

traverse(doc);

// Write back
await fs.writeFile(filePath, JSON.stringify(doc, null, 2));
/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1wqg78usfwogrb8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fipmmjbp",
    "name": "slug",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1wqg78usfwogrb8")

  // remove
  collection.schema.removeField("fipmmjbp")

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1wqg78usfwogrb8")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_5jASYuW` ON `companies` (`ticker`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1wqg78usfwogrb8")

  collection.indexes = []

  return dao.saveCollection(collection)
})

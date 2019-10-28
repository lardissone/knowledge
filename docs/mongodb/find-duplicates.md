# Find duplicates

```js
// Find duplicates
db.specialist.aggregate([
    {$group: {
        _id: {email: "$email"},
        uniqueIds: {$addToSet: "$_id"},
        count: {$sum: 1}
        }
    },
    {$match: {
        count: {"$gt": 1}
        }
    },
    {$sort: {
        count: -1
        }
    }
]).forEach(result => {
    result.uniqueIds.forEach(id => {
        printjson(id)
        var spec = db.specialist.findOne({_id: id});
        printjson(spec.email)
    })
})
```

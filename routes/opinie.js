var express = require('express');
var router = express.Router();
const { ObjectID } = require('mongodb');
const app = require('../app');
const ObjectId = require('mongodb').ObjectId;
const path = require('path');
const bodyParser = require('body-parser');


/* GET team */

router.get('/', async function(req, res, next) {
  var id = req.query.id;
  var op;
  if (id) {
    op = await req.db.db('opin')
        .collection('message')
        .findOne(ObjectId(id));
  } else {
    op = {
      text: "",
      message: ""
     }
  }
  console.log(id)
  res.render('opinie', { title: 'Opinie', op: op });
});



router.post('/', async function (req, res, next) {
  try {
    var op = {
      _id: req.body._id ? ObjectId(req.body._id) : undefined,
      text: req.body.text,
      message: req.body.message,
      
    };
   
    if (op._id) {
      await req.db.db('opin').collection("message").replaceOne({_id: op._id}, op);
  } else {
      await req.db.db('opin').collection("message").insertOne(op);
  }
    res.redirect('opinie');
  } catch (err) {
    console.error(err);
  }
console.log(op)
 // next();
});

router.get('/', async function(res,req,next){
    const opy = await req.db.db('opin')
    .collection(message)
    .find({})
    .collation({
        locale: 'pl'
    })
    .sort(['text', 1]).toArray();
    res.render('opinie', {
        title: "Lista",
        opy:opy
    });
    console.log
});


// /* GET teams. */
// router.get('/opinie', async function(req, res, next) {
//   const pageSize = 10;
//   let sort = parseInt(req.query.sort);
//   sort = sort ? sort : 1;
//   const search = req.query.search ?
//       // usuwamy z frazy wyszukiwania wszystkie znaki specjalne dla wyrażeń regularnych
//       req.query.search.replace(/[\\.?+*{}()\[\]^$]+/g, '')
//       : undefined;
//   // Najprostszy możliwy sposób na filtrowanie dokumentów w kolekcji
//   /*let query = search ? {
//       $where: `function () {
//           return this.teamName.toLowerCase().indexOf('${search.toLowerCase()}') >= 0;
//       }`
//   } : {};*/
//   // Wyszukiwanie pełnotekstowe (full-text query), wykorzystuje indeks tekstowy (patrz ./db.js)
//   // oraz wyszukianie regex dla niepełnych słów
//   let query = search ? {
//       $or: [{
//           text: {
//               $regex: search,
//               $options: 'i',
//           }
//       }, {
//           $text: {
//               $search: search,
//               $language: "english",
//               $caseSensitive: false,
//               $diacriticSensitive: false,
//           }
//       }]
//   } : {};
//   const count = await req.db.db('opin')
//       .collection('message')
//       .countDocuments(query);
//   const maxPage = Math.floor(count / pageSize);
//   let page = parseInt(req.query.page);
//   page = page >= 0 ? page : 0;
//   page = page <= maxPage ? page : maxPage;
//   const prevPage = page > 0 ? page - 1 : 0;
//   const nextPage = page < maxPage ? page + 1 : maxPage;

//   const teams = await req.db.db('opin')
//       .collection('message')
//       .find(query)
//       .collation({
//           locale: 'pl'
//       })
//       .sort(['text', sort])
//       .skip(page * pageSize)
//       .limit(pageSize)
//       .toArray();

//   const reportCollection = await req.db.db('opin')
//       .collection('message')
//       .mapReduce(/* map */ function () {
//           emit('teamNameLength', this.text.length);
//       }, /* reduce */ function (key, lengths) {
//           return Array.sum(lengths);
//       }, {
//           out: 'inline',
//           query: query,
//       });

//   const report = await reportCollection
//       .find()
//       .toArray();

//   res.render('opinie', {
//       title: 'optionssss',
//       opy: opy,
//       search: search,
//       sort: sort,
//       page: page,
//       prevPage: prevPage,
//       nextPage: nextPage,
//       count: count,
//       report: report,
      
//   });

  
// });

// module.exports = router;





// /* GET teams. */

// // router.get('/', async function(req, res, next) {
// //   const op = await req.db.db('opin')
// //       .collection('message')
// //       .find({})
// //       .collation({locale: 'pl'})
// //       .toArray();
// //       console.log(op)
// //   res.render('opinie', { title1: 'hmm', op: op });
  
// // });


// // router.get('/', (req, res, next) => {
// //   Todos.find({}).toArray((err, todos) => {
// //     if(err){
// //       return console.log(err);
// //     }
// //     console.log(todos)
// //     res.render('opinie',{
// //       todos: todos
// //     });
// //   });
// // });

// // router.post('/opinie/add', (req, res, next) => {
// //   // Create todo
// //   const todo = {
// //     text: req.body.text,
// //     body: req.body.message
// //   }

// //   // Insert todo
// //   Todos.insert(todo, (err, result) => {
// //     if(err){
// //       return console.log(err);
// //     }
// //     console.log('Todo Added...');
// //     res.redirect('/');
// //   });
// // });



module.exports = router;